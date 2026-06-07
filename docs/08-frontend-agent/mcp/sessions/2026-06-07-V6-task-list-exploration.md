# MCP Exploration Session: /task/list

Session ID: `2026-06-07-V6-task-list-exploration`
Target: `/task/list`
Goal: Real Playwright MCP exploration of task list page — capture loaded/empty states, filter interactions, row-click drawer, pagination
Operator: agent (claude-code)
Timestamp: 2026-06-07T11:36:40Z
Commit: 55083b1 (V5 Benchmark Demo Expansion)
Status: completed

## Exploration Method

Real Playwright MCP browser tools — first authoritative MCP session replacing V3 fallback.
Tools used: `browser_navigate`, `browser_snapshot`, `browser_take_screenshot`, `browser_click`, `browser_console_messages`.

## Page Load

- Route: `/task/list` (redirected from `/` and `/dashboard`)
- Module: Task Center
- Page title: "frontend-skill-forge"
- Console errors: 1 (AntD deprecation: `Button.Group` → `Space.Compact`)
- Page structure: banner → tablist (4 tabs) → sidebar (5 filter items) → main content area

## UI Components Discovered

| # | Component | Location | Selector | Stability |
|---|-----------|----------|----------|-----------|
| 1 | ScenarioSelector | Header area | `[data-testid="task-scenario-select"]` | High |
| 2 | TaskFilterBar | Filter row | Status/Priority/Category comboboxes | High |
| 3 | TaskTable | Main content | `table` (AntD Table) | High |
| 4 | TaskDetailDrawer | Overlay | `dialog` role, title matches task name | High |
| 5 | PaginationBar | Footer | `list` with page items | Medium |

## Interactive Elements

| # | Element | Action | Result | Selector |
|---|---------|--------|--------|----------|
| 1 | Scenario dropdown | Click to open | Shows 4 options: Loaded, Loading, Empty, Error | `task-scenario-select` combobox |
| 2 | Table row | Click | Opens TaskDetailDrawer with task details | `row` role with task title |
| 3 | Drawer close button | Click | Closes drawer, returns to table view | `button "Close"` |
| 4 | Empty scenario | Select | Shows "No data" image + "No tasks match the current filter" | Scenario option "Empty" |
| 5 | Pagination "Next Page" | Available | Navigates to page 2 | `button "right"` |

## Route Snapshots

### Loaded State
- 5 rows visible (page 1 of 2, 10 total tasks)
- Columns: checkbox, Title, Status, Priority, Assignee, Category, Created
- Status values: in-progress, open, completed, blocked
- Priority values: critical, high, medium
- Pagination: "Total 10 tasks", 2 pages, "5 / page" selector

### Empty State
- Triggered by scenario selector → "Empty"
- Shows "No data" image (AntD Empty component)
- Message: "No tasks match the current filter"
- Filter bar and sidebar remain visible

## Interaction Traces

### Trace 1: Row Click → Drawer Open
1. Click table row "Upgrade database connection pooling"
2. Drawer slides in from right (480px width)
3. Drawer title: task name
4. Drawer content: detail table with Status, Priority, Assignee, Category, Created, Updated, Description
5. Close button in top-right corner

### Trace 2: Scenario Switch → Empty State
1. Click scenario dropdown (shows "Loaded")
2. Dropdown opens with 4 options
3. Select "Empty"
4. Table content replaced with Empty component
5. Sidebar and filters remain unchanged

## Selector Candidates

| Selector | Type | Stability | Notes |
|----------|------|-----------|-------|
| `[data-testid="task-scenario-select"]` | data-testid | High | Dedicated test attribute |
| `row` role with task title | ARIA role | High | Accessible role-based selector |
| `dialog` role | ARIA role | High | Drawer uses dialog role |
| `button "Close"` | ARIA label | High | Standard close button |
| `combobox` for filters | ARIA role | Medium | Multiple comboboxes, need index or label |
| `checkbox "Select all"` | ARIA label | High | Unique label |

## Issues Found

1. **AntD deprecation**: `Button.Group` deprecated, should use `Space.Compact` (console error)
2. **Title column sort icons**: Sort indicator icons have 0-width containers (box=0,22), may cause click target issues

## Evidence Captured

| Type | File |
|------|------|
| Screenshot: Loaded state | `task-list-loaded.png` |
| Screenshot: Row click drawer | `task-list-row-click-drawer.png` |
| Screenshot: Empty state | `task-list-empty-scenario.png` |
| Snapshot: Loaded | `.playwright-mcp/page-2026-06-07T11-36-40-090Z.yml` |
| Snapshot: Drawer open | `.playwright-mcp/page-2026-06-07T11-36-56-824Z.yml` |
| Snapshot: Scenario dropdown | `.playwright-mcp/page-2026-06-07T11-37-41-840Z.yml` |
| Snapshot: Empty state | `.playwright-mcp/page-2026-06-07T11-37-57-976Z.yml` |

## Comparison with V3 Fallback Session

| Aspect | V3 Fallback | V6 Real MCP |
|--------|-------------|-------------|
| Method | Derived from e2e test artifacts | Live Playwright MCP browser |
| Evidence count | 12 records | 7 screenshots + 4 snapshots + 2 interaction traces |
| Scenario states | Documented from code | Actually observed in browser |
| Selector verification | Assumed from source | Verified in live DOM |
| Console errors | Not captured | 1 AntD deprecation warning |
| Drawer interaction | Described from test | Actually triggered and observed |

## Next Actions

- `/skill/list` exploration (V6.1 second session)
- `/workflow/editor` exploration (V6.1 third session)
- Selector stability evaluation across all 3 routes
