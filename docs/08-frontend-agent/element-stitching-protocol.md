# Element Stitching Protocol

Last Updated: 2026-06-09
Status: Draft
Priority: High

## Purpose

Define the mechanism that stitches browser-side MCP exploration evidence with AST-derived source code evidence into a unified Element Registry — a stable, component-level mapping from every visible page element to its source code location and data flow.

This protocol exists because the project's current knowledge maps answer "what routes exist" and "what components exist" but do NOT answer "this button on the page — where is its source code and what does it call?". That question is the critical path for agent-assisted frontend migration.

## Scope

This protocol covers:

1. Anchor discovery: per-project selection of optimal mapping strategies
2. Browser-side evidence extraction: structured element capture from MCP Playwright sessions
3. Code-side evidence extraction: AST-based component and identifier indexing
4. Stitching algorithm: matching browser elements to code-side entities with confidence scoring
5. Element Registry: the output data structure consumed by agents and automation
6. Registry lifecycle: freshness detection, stale marking, and self-evolution-driven refresh

Out of scope:

- Building the AST parser itself (consume existing tooling: tsc, babel, tree-sitter)
- Defining how MCP sessions are conducted (see `mcp-exploration-protocol.md`)
- Defining how evolution candidates are reviewed (see `self-evolution-mechanism.md`)
- Line-level source mapping (intentional non-goal — see Granularity Principle below)

## Granularity Principle

Mapping stops at the component level. The protocol does NOT produce line numbers.

A stitched element points to:
- the source component (named export, e.g. `TaskTable`)
- the source file (e.g. `src/domains/task/components/TaskTable.tsx`)
- within-file semantic anchors (testid string, handler function name, state variable name, prop name)
- the parent component that owns the data flow

Rationale: line numbers break on code formatting, import reordering, and comment changes. Named identifiers in code are only invalidated by renaming — a semantically meaningful change that should trigger registry updates. This makes the registry robust against trivial edits while responsive to real structural changes.

## Input Sources

### Source A: Browser-Side Evidence

Produced by MCP Playwright exploration sessions per `mcp-exploration-protocol.md`.

For each route explored, extract from the accessibility snapshot:

| Field | Source | Example |
|-------|--------|---------|
| `route` | page URL | `/task/list/all` |
| `a11yRole` | ARIA role | `button`, `textbox`, `combobox` |
| `visibleText` | accessible name or text content | `批量删除` |
| `testid` | `data-testid` attribute if present | `task-batch-delete-btn` |
| `ariaLabel` | `aria-label` if present | `Close` |
| `elementType` | tag name or component role | `button`, `input`, `select` |
| `ancestorStructure` | parent roles up to the landmark | `[main, table, row]` |
| `isInteractive` | supports click/type/select | `true` |

A single MCP session covering one route SHOULD produce one `RouteElementSnapshot` containing all interactive elements on that page.

### Source B: Code-Side Evidence

Produced by AST analysis of the source tree. One-time full scan, then incremental on file change.

For each source file, extract:

| Field | Source | Example |
|-------|--------|---------|
| `componentName` | named export (function/const) | `TaskTable` |
| `file` | file path relative to project root | `src/domains/task/components/TaskTable.tsx` |
| `jsxTestIds` | all `data-testid` string literals in JSX | `["task-table", "task-batch-delete-btn"]` |
| `jsxVisibleTexts` | static text content in JSX elements | `["批量删除", "任务列表"]` |
| `jsxAriaLabels` | `aria-label` string literals | `["Close"]` |
| `eventBindings` | handler name per JSX event attribute | `[{ onClick: "handleBatchDelete" }, { onChange: "handleFilter" }]` |
| `stateDeclarations` | useState/useReducer variable names | `["taskList", "selectedRowKeys"]` |
| `propsReceived` | destructured prop names | `["tasks", "onSelect", "onBatchDelete"]` |
| `imports` | named imports with source module | `[{ name: "Button", from: "antd" }, { name: "taskService", from: "../data/taskService" }]` |

The code-side index MUST be maintained as a queryable structure — not a static markdown file. The recommended format is a JSON file per module, indexed by component name.

## Anchor Strategy System

### Strategy Selection (Per-Project Discovery Phase)

Before stitching begins, scan the code-side index to determine the project's anchor profile:

```
1. Compute data-testid coverage:
     elements with testid / total JSX elements → coverageRate
2. Compute text uniqueness:
     unique text strings / total text strings in interactable elements
3. Compute ARIA coverage:
     elements with aria-label or role / total JSX elements

Output a ProjectAnchorProfile:
  {
    testidCoverage: 0.72,
    textUniqueness: 0.83, 
    ariaLabelCoverage: 0.45,
    recommendedPrimary: "testid",     // highest confidence strategy
    recommendedFallback: "text",      // second-best when primary fails
    minimumConfidence: 0.6            // threshold below which a mapping is marked "low"
  }
```

A project with >60% testid coverage uses testid-primary. A project with high text uniqueness but no testids uses text-primary. The profile is generated once per project and re-evaluated when the code-side index is regenerated.

### Strategy Plugins

Each strategy implements this interface:

```typescript
interface AnchorStrategy {
  name: string;                              // 'testid' | 'text' | 'aria' | 'component-role'
  
  // Extract feature from browser element
  extractBrowserFeature(el: BrowserElement): string | null;
  
  // Find code-side matches in the index
  findCodeMatches(feature: string, index: CodeIndex): CodeMatch[];
  
  // Return confidence for this match
  scoreMatch(browser: BrowserElement, code: CodeMatch): number;
  
  // Whether this strategy is viable for the given project
  isViable(profile: ProjectAnchorProfile): boolean;
}
```

Built-in strategies:

| Strategy | Browser Feature | Code Index Lookup | Viability Condition |
|----------|----------------|-------------------|---------------------|
| **testid** | `data-testid` value | `jsxTestIds` exact match | `testidCoverage >= 0.3` |
| **text** | `visibleText` | `jsxVisibleTexts` fuzzy match | `textUniqueness >= 0.6` |
| **aria-label** | `ariaLabel` | `jsxAriaLabels` exact match | `ariaLabelCoverage >= 0.2` |
| **component-role** | `a11yRole` + ancestor context | component name inference | always available as last resort |

New strategies (e.g., i18n-key-based, css-module-based) can be added by implementing the `AnchorStrategy` interface — no core algorithm change required.

## Stitching Algorithm

### Phase 1: Route-Level Scoping

For each route being stitched:

1. Extract all interactive elements from the MCP accessibility snapshot → `BrowserElement[]`
2. Narrow the code-side index to components reachable from this route (via router analysis) → scoped `CodeIndex`
3. This scoping prevents spurious cross-route matches (e.g., two pages having a "删除" button)

### Phase 2: Primary Matching

For each `BrowserElement`, attempt the recommended primary strategy:

```
1. feature = primaryStrategy.extractBrowserFeature(element)
2. if feature is null → fall back to next strategy
3. candidates = primaryStrategy.findCodeMatches(feature, scopedIndex)
4. if candidates.length == 0 → fall back
5. if candidates.length == 1 → matched, confidence = primaryStrategy.scoreMatch(element, candidate)
6. if candidates.length > 1 → disambiguation (Phase 3)
```

### Phase 3: Disambiguation

When multiple code-side candidates match the same browser feature:

```
1. Compare ancestorStructure (browser) vs component parent chain (code)
   - Does the code candidate's parent component appear in the browser's ancestor structure?
2. Additional fallback discriminators (in order):
   - event binding match: does the browser element's role match a JSX event binding?
   - sibling context: do the browser element's siblings match the code component's sibling elements?
3. If still ambiguous after all discriminators:
   - Select the candidate with highest score
   - Set confidence: 'medium' (single discriminant resolved) or 'low' (still ambiguous)
```

### Phase 4: Unmatched Handling

Elements that cannot be matched by any strategy are recorded as:

```typescript
{
  route: string;
  selector: string;
  status: 'unmapped';
  reason: 'no-testid-no-unique-text' | 'dynamic-content' | 'out-of-scope';
}
```

Unmatched elements are diagnostics, not errors. They signal where the project's anchor quality needs improvement — either by adding testids or by adding a new strategy.

## Element Registry Output

### Data Structure

```typescript
// The registry is a flat list of stitched elements, grouped by route.
// It lives at: docs/02-harness/knowledge/frontend/element-registry.json

interface ElementRegistry {
  version: string;                      // registry schema version
  generatedAt: string;                  // ISO timestamp
  projectAnchorProfile: ProjectAnchorProfile;
  routes: Record<string, StitchedElement[]>;  // keyed by route path
}

interface StitchedElement {
  // ── Browser-Side ──
  selector: {
    primary: string;                    // preferred selector for this element
    strategy: 'testid' | 'role+name' | 'text' | 'aria';
  };
  a11yRole: string;
  visibleText: string;

  // ── Code-Side (component-level, no line numbers) ──
  sourceComponent: string;              // 'TaskTable'
  sourceFile: string;                   // 'src/domains/task/components/TaskTable.tsx'
  parentComponent: string;              // 'TaskListPage' (the page that renders it)

  // ── Semantic Anchors within Component ──
  elementTestId?: string;
  boundProp?: string;                   // prop name passed from parent
  boundState?: string;                  // state name this element reads/writes
  boundHandler?: string;                // onClick/onChange handler function name

  // ── Data Flow (component-to-component) ──
  dataFlow: {
    handlerDefinedIn: string;           // component that defines the handler
    stateOwnedBy: string;               // component that owns the state
    serviceCalls: Array<{
      serviceModule: string;            // import path of the service
      methodName: string;               // method called by the handler
    }>;
  };

  // ── Meta ──
  anchorMethod: string;                 // which strategy produced this match
  confidence: 'high' | 'medium' | 'low';
  lastVerifiedCommit: string;           // commit hash when last verified
  staleSince?: string;                  // ISO timestamp when marked stale
}
```

### Minimal Example Entry

```json
{
  "selector": {
    "primary": "getByTestId('task-batch-delete-btn')",
    "strategy": "testid"
  },
  "a11yRole": "button",
  "visibleText": "批量删除",
  "sourceComponent": "TaskTable",
  "sourceFile": "src/domains/task/components/TaskTable.tsx",
  "parentComponent": "TaskListPage",
  "elementTestId": "task-batch-delete-btn",
  "boundProp": "onBatchDelete",
  "boundHandler": "handleBatchDelete",
  "dataFlow": {
    "handlerDefinedIn": "TaskListPage",
    "stateOwnedBy": "TaskListPage",
    "serviceCalls": [
      { "serviceModule": "taskService", "methodName": "deleteTasks" }
    ]
  },
  "anchorMethod": "testid",
  "confidence": "high",
  "lastVerifiedCommit": "abc123def"
}
```

### Query Patterns

The registry is designed for agent consumption. Expected queries:

```
1. "What does clicking this button do?"
   → lookup by selector → dataFlow.handlerDefinedIn + boundHandler + serviceCalls

2. "If I change this component, what pages are affected?"
   → reverse lookup by sourceComponent → all routes containing it

3. "Where is the state for this table?"
   → lookup by selector → dataFlow.stateOwnedBy

4. "This page element has no testid — what's its code location?"
   → lookup by visibleText or ariaLabel → sourceFile + sourceComponent

5. "What are all the elements in this route?"
   → lookup by route → all StitchedElements
```

## Registry Lifecycle

### Generation

The registry is generated by a stitch run, which is triggered:

1. **Onboard**: when the harness first encounters a project (full scan + full MCP exploration of all routes)
2. **Route change**: when a route is added, removed, or its component tree changes
3. **Selector drift detected**: when an E2E test fails due to selector resolution

The stitch run is executed by an agent following the `frontend-registry-stitch` Skill, consuming this protocol as its reference. The agent is responsible for running the MCP session, parsing the code-side index, executing the matching algorithm, and writing the registry. Browser element snapshots may be provided by `frontend-e2e-explorer` (as a side effect of its Step 3 route exploration) or captured directly by this Skill.

### Freshness Detection

A registered element is considered stale when:

| Trigger | Detection | Action |
|---------|-----------|--------|
| Source file commit changes `sourceFile` | post-commit hook diff | mark element as stale, queue re-stitch |
| New component added to route | route snapshot diff in MCP scan | add as unmapped, queue stitch |
| E2E test selector fails to resolve | test failure diagnosis | mark element confidence as low, queue re-stitch |
| Scheduled MCP re-scan (periodic) | accessibility snapshot diff vs previous | reconcile all elements for changed routes |

Staleness is tracked as `staleSince` in the registry entry. Agent reads the registry and filters to non-stale entries unless explicitly diagnosing drift.

### Self-Evolution Integration

The registry participates in the self-evolution loop:

```
Code Change
  → Freshness detection marks affected elements stale
  → Agent executes re-stitch for stale routes
  → Registry updated (not full regeneration)
  → E2E tests validate new selectors
  → Evidence archived under docs/07-evidence/

New Anchor Strategy added
  → Strategy registered in src/testability/anchor-strategies/
  → Full re-stitch with new strategy in the pipeline
  → Confidence scores updated across registry
  → Evidence archived
```

The registry is NOT manually edited. All updates flow through the self-evolution mechanism. A human may review evolution candidates (per `self-evolution-mechanism.md`) but does not directly write registry entries.

### Relationship to Selector Registry (selectors.ts)

The V9 `src/testability/selectors.ts` is a manual, hand-maintained selector registry with ~25 entries. Under this protocol:

- `selectors.ts` becomes the **verified subset** of the element registry — entries that have been promoted from auto-generated to manually curated for use in critical test paths.
- The element registry is the **auto-generated superset** — all discovered elements, including those not yet manually reviewed.
- Promotion path: `Element Registry (auto) → verified by agent in self-evolution loop → SELECTOR_REGISTRY (curated)`.

This preserves the investment in `selectors.ts` while giving agents the broader registry they need for migration work.

## Verification

### Stitch Quality Metrics

After each stitch run, record:

| Metric | Description | Target |
|--------|-------------|--------|
| Match rate | elements matched / total elements | >80% |
| High-confidence rate | high-confidence matches / matched elements | >70% |
| Unmatched rate | unmatched / total elements | <20% |
| Stale rate | stale entries / total entries | <10% |

### Correctness Verification

A stitch run's correctness is verified by the controlled-change method:

```
1. Select N random high-confidence entries (N ≥ 3)
2. For each: make a trivial, visible change to the source component
   (e.g., change button text)
3. Re-run MCP snapshot for the route
4. Verify: the changed element is the ONLY element that differs
5. If other elements also differ → false match, reduce confidence, re-stitch
```

This verification is executed by the agent as part of the self-evolution loop, following the pattern established by V7's controlled drift validation.

## Non-Goals

- This protocol does NOT produce a visual design system catalog (component variants, spacing, colors)
- It does NOT replace the route-map or component-map; it complements them with per-element precision
- It does NOT attempt runtime state flow tracing (e.g., "which setState call caused this re-render")
- It does NOT require changes to the target project's source code (no mandatory testid injection)
- It does NOT define the E2E test authoring workflow (see `e2e-fixture-contract.md`)

## Relationship to Other Docs

| Document | Relationship |
|----------|-------------|
| `mcp-exploration-protocol.md` | Defines how MCP sessions are conducted — produces Source A for this protocol |
| `self-evolution-mechanism.md` | Defines how registry updates are reviewed, promoted, and archived |
| `e2e-fixture-contract.md` | Fixture data for E2E tests — registry selectors feed into fixture assertions |
| `ui-drift-diagnosis.md` | Drift detection triggers re-stitching when selectors break |
| `playwright-mcp-policy.md` | Defines selector priority for E2E tests — mirrors anchor strategy priority |
| `src/testability/selectors.ts` | Curated subset of verified selectors promoted from the registry |
| `docs/02-harness/knowledge/frontend/route-map.md` | Route definitions — consumed by Phase 1 scope narrowing |
| `docs/02-harness/knowledge/frontend/component-map.md` | Component hierarchy — consumed by Phase 3 disambiguation |
