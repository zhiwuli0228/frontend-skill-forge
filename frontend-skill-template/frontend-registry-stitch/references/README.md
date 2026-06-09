# Frontend Registry Stitch — References

Supplementary material for `frontend-registry-stitch`. Load only when needed.

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

**BrowserElement contract:**
- `route` — URL path
- `a11yRole` — ARIA role
- `visibleText` — accessible name or text content
- `testid` — `data-testid` value (nullable)
- `ariaLabel` — `aria-label` value (nullable)
- `elementType` — HTML tag or component name
- `ancestorRoles` — parent ARIA roles up to landmark
- `isInteractive` — boolean

Explorer owns the MCP session and scenario-state toggling. Stitch owns the matching algorithm and registry output. When explorer has already visited a route, stitch reuses its snapshot.

## Validation Examples

### Example 1: Full Onboard

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

1. **Config-driven UI is invisible.** Elements rendered from JS config objects (SidebarNavigation menus, module config) lack testids in the config itself. The regex indexer cannot see them.
2. **Regex indexer precision.** The code indexer uses regex, not AST. Text extraction produces noise (~65% noise rate). Upgrade path: ts-morph or babel AST when precision becomes critical.
3. **Single-page capture only.** Modals, drawers, and dropdowns not visible on page load may be missed.
4. **No visual diff.** The registry tracks DOM structure, not visual layout. A CSS-only change that breaks a visual test will not be detected.
5. **Props flow tracing incomplete.** Handlers passed via props are attributed to the receiving component, not the defining page.

## Cross-References

- **Uses:** `src/testability/element-registry/stitch.ts` (stitching algorithm)
- **Uses:** `src/testability/element-registry/discovery/code-indexer.ts` (code indexing)
- **Uses:** `src/testability/element-registry/anchor-strategies/` (matching strategies)
- **Produces:** `docs/02-harness/knowledge/frontend/element-registry.json`
- **Produces:** `docs/08-frontend-agent/evidence/stitch-reports/`
- **Related Skill:** `frontend-e2e-explorer` — produces browser snapshots consumed by this Skill
- **Related Skill:** `skill-evolution-maintainer` — evolves anchor strategies from stitch quality feedback
