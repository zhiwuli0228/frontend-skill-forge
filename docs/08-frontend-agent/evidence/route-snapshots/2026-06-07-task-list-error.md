# Route Snapshot: /task/list/all (Error)

Status: Complete
Evidence ID: RS-TL-004

## Metadata

- **Type:** route-snapshot (ui-state-snapshot)
- **Route:** /task/list/all
- **Scenario:** error
- **Timestamp:** 2026-06-07T14:35:00Z
- **Source:** agent (derived from e2e test artifacts + page source)
- **Confidence:** 0.95
- **Tags:** task, list, scenario-error, smoke

## Context

- **Exploration Session:** 2026-06-07-V3-task-list-exploration
- **Goal:** Capture the error state with retry affordance
- **Trigger:** Scenario selector changed from "Loaded" to "Error"

## Page State

- **URL:** `/task/list/all`
- **Title (browser tab):** "Task List"
- **Page heading (H2):** "Task List"
- **Load state:** error
- **Mock data source:** (skipped — error state short-circuits the data path)

## Visible Components

| Component | Selector | Visible | Content |
| --- | --- | --- | --- |
| Scenario selector | `[data-testid="task-scenario-select"]` | yes | Currently "Error" |
| Filter bar | `[data-testid="task-filter-bar"]` | no | Hidden in error state |
| Table | `[data-testid="task-table"]` | no | Replaced by error alert |
| Error alert | `[data-testid="task-list-error"]` | yes | Ant Design Alert type="error" with retry link |
| Retry link | `[data-testid="task-error-retry-link"]` | yes | anchor with text "Retry" |
| Sidebar | `[data-testid="sidebar-menu"]` | yes | Same 5 items |

## Form State

(n/a — filter bar not rendered in error state)

## Modal/Drawer State

(none)

## Toast/Notification State

| Level | Message | Notes |
| --- | --- | --- |
| info (within Alert) | "Task list failed to load" | AntD `Alert message` (deprecated; `title` preferred) |

## Network State

(none)

## Console State

| Level | Message | Count |
| --- | --- | --- |
| warning | `[antd: Alert] 'message' is deprecated. Please use 'title' instead.` | 1 (from this very state) |

## Artifacts

| Type | Path | Description |
| --- | --- | --- |
| e2e test | `tests/e2e/task-list-runtime.spec.ts` | "error state shows error with retry affordance" |
| page source | `src/domains/task/pages/TaskListPage.tsx:22-37` | `TaskListError` component |

## Reproduction Steps

1. Navigate to `http://localhost:5173/task/list/all`
2. Wait for table to render
3. Click the scenario select
4. Click "Error" option
5. Verify: error alert appears
6. Verify: retry link is visible
7. Click retry link
8. Verify: returns to loaded state with table visible

## Validation

- [x] Metadata complete
- [x] Artifact exists (e2e test passes; the full error→retry flow is asserted)
- [x] Reproduction steps documented
- [x] Confidence assessed (0.95)

## Notes

- The error state is the only scenario that triggers an AntD deprecation warning. This is a known issue from V2.6-V2.10 and is tracked in `process/RETRO-V2.6-V2.10.md` as an open item for V5.
- The retry link does NOT actually re-fetch — it just sets `scenario` back to `'loaded'`. In a real app this would re-trigger the fetch.
- The error message is intentionally user-friendly ("An unexpected error occurred while loading the task list. Please try again.") rather than exposing a stack trace.
