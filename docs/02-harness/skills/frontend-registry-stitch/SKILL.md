# Frontend Registry Stitch

Status: v1 (V10)
Version: 1.0.0

## Purpose

Orchestrate the full element-stitching pipeline: code-index regeneration → browser element capture → stitching algorithm → element registry output. Produces and maintains the structured JSON registry (`element-registry.json`) that maps every interactive page element to its source component, data flow, and semantic anchors.

This Skill is the **machine-output counterpart** to `frontend-e2e-explorer`. Where explorer produces human-readable evidence records, this Skill produces machine-consumable registry entries.

## When to Use

Invoke this Skill when:

- **Onboard**: first-time project scan — index all code, explore all routes, produce full registry
- **Route change**: a route is added, removed, or its component tree changes — re-stitch affected routes
- **Selector drift**: E2E test failure indicates a selector no longer resolves — re-stitch the route and update stale entries
- **Periodic refresh**: scheduled re-scan to detect drift before tests catch it
- **New anchor strategy added**: strategy registered in `anchor-strategies/` — full re-stitch to update confidence scores

Do NOT use when:

- Exploring a page for the first time to understand its behavior (use `frontend-e2e-explorer`)
- Creating new e2e tests (use `frontend-incremental-coder`)
- The codebase has no `data-testid` attributes and no structured selectors (registry quality will be too low)
- MCP browser tools are unavailable and no browser snapshots exist (cannot capture elements)

## Inputs

| Input | Source | Format | Required |
| --- | --- | --- | --- |
| Route target(s) | user or trigger | URL path or `"all"` | yes |
| Browser element snapshots | `artifacts/browser-snapshots/` | `RouteElementSnapshot` JSON | for stitch |
| Code index | `docs/02-harness/knowledge/frontend/code-index.json` | `CodeIndex` JSON | for stitch |
| Stitching algorithm | `src/testability/element-registry/stitch.ts` | TypeScript module | yes |
| Anchor strategies | `src/testability/element-registry/anchor-strategies/` | TypeScript modules | yes |
| Existing registry | `docs/02-harness/knowledge/frontend/element-registry.json` | `ElementRegistry` JSON | for incremental updates |

## Shared Contract with `frontend-e2e-explorer`

Both Skills consume and produce browser element data. To avoid redundant MCP sessions:

```
Explorer Step 3 (route snapshots)
  └→ side effect: browser_evaluate → artifacts/browser-snapshots/<route>.json
       format: Record<string, BrowserElement[]>  (keyed by scenario state)

Registry Stitch Step 2 (element capture)
  └→ reads: artifacts/browser-snapshots/<route>.json
       if missing → runs its own MCP capture
```

**Contract format** (`BrowserElement`):
- `route`: URL path (e.g., `/task/list/all`)
- `a11yRole`: ARIA role (`button`, `textbox`, `combobox`, `tab`, `menuitem`, etc.)
- `visibleText`: accessible name or text content
- `testid`: `data-testid` attribute value (nullable)
- `ariaLabel`: `aria-label` attribute value (nullable)
- `elementType`: HTML tag or component name
- `ancestorRoles`: parent ARIA roles up to landmark (array, ordered root→leaf)
- `isInteractive`: boolean

Explorer owns the MCP session and scenario-state toggling. Stitch owns the matching algorithm and registry output. When explorer has already visited a route, stitch reuses its snapshot — no double capture.

## Minimum Context Path

For a single-route stitch, load:

1. Target route
2. Route's browser snapshot (from `artifacts/browser-snapshots/`)
3. Code index (`code-index.json`)
4. Anchor strategy modules (primary + fallback)
5. `stitch.ts` entry points: `stitchRoute()`, `buildRegistry()`, `writeRegistry()`
6. Existing registry (for incremental update)

Do not load all browser snapshots or all anchor strategies unless doing a full onboard.

## Procedure

### Step 1: Ensure Code Index is Fresh

**Goal:** Code-side data must reflect current source state.

**Action:**
1. Check `code-index.json` — if `generatedAt` is older than the latest commit touching `src/**/*.tsx`, regenerate
2. Regenerate: `npx tsx src/testability/element-registry/discovery/code-indexer.ts . docs/02-harness/knowledge/frontend/code-index.json`
3. Record: files scanned, components found

**Output:** Fresh code index.

**Validation:** `componentsFound` should match the expected count (current baseline: 54). A drop >10% indicates a regex extraction regression.

### Step 2: Capture Browser Elements for Target Routes

**Goal:** Obtain structured `BrowserElement[]` for each route.

**Action:**
1. Check `artifacts/browser-snapshots/` for existing snapshots of target routes
2. For routes with existing snapshots: verify capture timestamp is newer than route's last code change
3. For routes without snapshots (or stale ones): run MCP browser capture:
   - Navigate to route
   - Run `browser_evaluate` to extract interactive elements with `ancestorRoles`
   - Save as `artifacts/browser-snapshots/<route-slug>.json`
4. Merge multi-route snapshots into a single `Record<string, BrowserElement[]>` for stitching

Structured capture script reference (run via `browser_evaluate`):
```js
() => {
  const els = document.querySelectorAll('[data-testid], button, input, select, [role="tab"], [role="menuitem"], [role="checkbox"], h2');
  return Array.from(els).map(el => {
    const getAncestorRoles = (e) => {
      const roles = [];
      let cur = e.parentElement;
      while (cur && cur !== document.body) {
        const role = cur.getAttribute('role');
        const tag = cur.tagName.toLowerCase();
        if (role) roles.unshift(role);
        else if (['header', 'main', 'nav', 'aside', 'table', 'form'].includes(tag)) roles.unshift(tag);
        cur = cur.parentElement;
      }
      return roles;
    };
    return {
      a11yRole: el.getAttribute('role') || el.tagName.toLowerCase(),
      visibleText: (el.textContent || '').trim().slice(0, 60),
      testid: el.getAttribute('data-testid') || null,
      elementType: el.tagName.toLowerCase(),
      ancestorRoles: getAncestorRoles(el),
      isInteractive: ['BUTTON', 'INPUT', 'SELECT', 'A'].includes(el.tagName) || el.getAttribute('role') === 'tab' || el.getAttribute('role') === 'menuitem'
    };
  });
}
```

**Output:** Browser element snapshots for all target routes.

**Validation:** Each route snapshot should have ≥10 interactive elements. Fewer suggests the page failed to load or the extraction script missed elements.

### Step 3: Run Stitching

**Goal:** Match browser elements to code components and produce registry entries.

**Action:**
1. Determine scope:
   - **Single route**: call `stitchRoute(route, snapshot, codeIndex)` — returns elements + unmatched + report
   - **Full onboard**: call `buildRegistry(codeIndex, allSnapshots, commitHash)` — returns full ElementRegistry
2. Review the stitch report:
   - `matchRate = matched / totalElements` — target >70%
   - `highConfidenceRate = highConfidence / matched` — target >60%
   - If match rate <50%, flag for human review — likely a testid coverage issue
3. Write output via `writeRegistry()`:
   ```
   npx tsx scripts/run-stitch.ts
   ```
   Or programmatically for incremental: merge new route entries into existing registry JSON.

**Output:** Updated `element-registry.json` + stitch report.

**Validation:** The report's `highConfidence + mediumConfidence + lowConfidence` must equal `matched`. `matched + unmatched` must equal `totalElements`.

### Step 4: Review Unmatched Elements

**Goal:** Identify patterns in unmatched elements to guide improvements.

**Action:**
1. Categorize unmatched elements by `reason`:
   - `no-testid-no-unique-text`: element lacks both testid and unique visible text
   - `below-confidence-threshold`: candidate found but rejected by context scoring
   - `dynamic-content`: element text is runtime-generated with no static anchor
2. For `no-testid-no-unique-text` with `ancestorRoles: [complementary, menu]`: these are typically sidebar/config-driven UI — flag for testid addition in source
3. For pagination/table elements without testids: flag for component-level testid addition
4. Write findings to `stitch-report.md` in the evidence directory

**Output:** Categorized unmatched report.

**Validation:** Every unmatched element should have a clear category. "Mystery" unmatched items indicate an extraction bug.

### Step 5: Update Cross-References

**Goal:** Keep related artifacts in sync.

**Action:**
1. Update `element-registry.json` timestamp and version
2. If new routes were added: update the registry's `routes` map
3. If anchor profile changed significantly (>10% shift in testidCoverage or textUniqueness): flag for human review
4. Archive the stitch report under `docs/08-frontend-agent/evidence/stitch-reports/`

**Output:** Updated registry and archived report.

**Validation:** Registry `generatedAt` should match the stitch run timestamp. `projectAnchorProfile` should match current code index state.

## Outputs

| Output | Format | Destination |
| --- | --- | --- |
| Element registry | JSON | `docs/02-harness/knowledge/frontend/element-registry.json` |
| Stitch report | JSON (embedded in registry) | `element-registry.json#stitchReport` |
| Unmatched analysis | markdown | `docs/08-frontend-agent/evidence/stitch-reports/` |
| Updated code index | JSON | `docs/02-harness/knowledge/frontend/code-index.json` |
| Browser snapshots (new captures) | JSON | `artifacts/browser-snapshots/` |

## Modes

### Mode A: Full Onboard

```
All routes → full MCP exploration → full code index → buildRegistry() → element-registry.json
```

Trigger: first time setup, major refactor, new anchor strategy.

### Mode B: Route-Level Update

```
Single route → browser snapshot for that route → stitchRoute() → merge into existing registry
```

Trigger: route added/changed, E2E selector failure on that route.

### Mode C: Drift Repair

```
Single element → re-capture parent route → re-stitch route → update stale entries
```

Trigger: `staleSince` timestamp older than N days, E2E test failure pinpointing a specific selector.

## Validation Examples

### Example 1: Full Onboard (current project)

**Input:** All routes, fresh code index, fresh MCP capture

**Expected:**
- Code index: 56 files, 54 components
- Registry: 5 routes × ~15 elements each ≈ 75 total elements
- Match rate: >70%
- High confidence: >60% of matched

### Example 2: Route Update (/task/list/all)

**Input:** `/task/list/all` snapshot updated after TaskFilterBar refactor

**Expected:**
- Only `/task/list/all` entries updated in registry
- Other routes unchanged
- `filter-status`, `filter-priority`, `filter-category` still resolve to TaskFilterBar

### Example 3: Drift Repair (module-switcher-btn)

**Input:** E2E failure: `getByTestId('module-switcher-btn')` not found

**Expected:**
- Re-capture `/task/list/all` snapshot
- If element missing: mark as stale in registry
- If element present but selector changed: update selector in registry
- Archive diagnosis

## Known Limitations

1. **Config-driven UI is invisible.** Elements rendered from JS config objects (SidebarNavigation menus, module config) lack testids in the config itself. The regex indexer cannot see them. These elements will remain unmatched until config objects include anchor metadata.

2. **Regex indexer precision.** The code indexer uses regex, not AST. Text extraction produces noise (~65% noise rate). Dynamic testid templates are captured truncated. Upgrade path: ts-morph or babel AST when precision becomes critical.

3. **Single-page capture only.** Modals, drawers, and dropdowns that are not visible on page load may be missed. Explorer's scenario-state toggling helps but is not exhaustive.

4. **No visual diff.** The registry tracks DOM structure, not visual layout. A CSS-only change that breaks a visual test will not be detected by stitching.

5. **Props flow tracing incomplete.** When a handler is passed via props (e.g., `onCategoryChange` from SkillListPage → SkillFilterBar), the source-first strategy attributes it to the receiving component, not the defining page. Full props flow requires AST-level analysis.

## Cross-References

- **Uses:** `src/testability/element-registry/stitch.ts` (stitching algorithm)
- **Uses:** `src/testability/element-registry/discovery/code-indexer.ts` (code indexing)
- **Uses:** `src/testability/element-registry/anchor-strategies/` (matching strategies)
- **Uses:** `artifacts/browser-snapshots/` (browser element data)
- **Produces:** `docs/02-harness/knowledge/frontend/element-registry.json`
- **Produces:** `docs/08-frontend-agent/evidence/stitch-reports/`
- **Related Skill:** `frontend-e2e-explorer` — produces browser snapshots consumed by this Skill
- **Related Skill:** `skill-evolution-maintainer` — evolves anchor strategies from stitch quality feedback
- **Related Protocol:** `element-stitching-protocol.md` — authoritative specification this Skill implements
