# Route Snapshot: /task/list/all (Loading)

Status: Complete
Evidence ID: RS-TL-002

## Metadata

- **Type:** route-snapshot (ui-state-snapshot)
- **Route:** /task/list/all
- **Scenario:** loading
- **Timestamp:** 2026-06-07T14:33:00Z
- **Source:** agent (derived from e2e test artifacts + page source)
- **Confidence:** 0.95
- **Tags:** task, list, scenario-loading, smoke

## Context

- **Exploration Session:** 2026-06-07-V3-task-list-exploration
- **Goal:** Capture the loading skeleton state
- **Trigger:** Scenario selector changed from "Loaded" to "Loading"

## Page State

- **URL:** `/task/list/all`
- **Title (browser tab):** "Task List"
- **Page heading (H2):** "Task List"
- **Load state:** loading
- **Mock data source:** (skipped — `scenario === 'loading'` short-circuits the data path)

## Visible Components

| Component | Selector | Visible | Content |
| --- | --- | --- | --- |
| Scenario selector | `[data-testid="task-scenario-select"]` | yes | Currently "Loading" |
| Filter bar | `[data-testid="task-filter-bar"]` | no | Hidden in loading state |
| Table | `[data-testid="task-table"]` | no | Replaced by skeleton |
| Loading skeleton | `[data-testid="task-list-loading"]` | yes | 1 row of Skeleton.Input + 1 row of Skeleton active |
| Sidebar | `[data-testid="sidebar-menu"]` | yes | Same 5 items |

## Form State

(n/a — filter bar not rendered in loading state)

## Modal/Drawer State

(none)

## Toast/Notification State

(none)

## Network State

(none — synchronous render)

## Console State

(none — no errors, no deprecation warnings in this state)

## Artifacts

| Type | Path | Description |
| --- | --- | --- |
| e2e test | `tests/e2e/task-list-runtime.spec.ts` | "loading state shows skeleton UI" |
| page source | `src/domains/task/pages/TaskListPage.tsx:74-81` | `if (scenario === 'loading')` branch |

## Reproduction Steps

1. Navigate to `http://localhost:5173/task/list/all`
2. Wait for table to render
3. Click the scenario select (`[data-testid="task-scenario-select"]`)
4. Click "Loading" option in the dropdown
5. Verify: skeleton appears (`[data-testid="task-list-loading"]`)
6. Verify: table is hidden
7. Verify: filter bar is hidden

## Validation

- [x] Metadata complete
- [x] Artifact exists (e2e test passes)
- [x] Reproduction steps documented
- [x] Confidence assessed (0.95)

## Notes

- The loading state is purely visual; no actual network is happening. In a real app this would be triggered by a fetch in flight.
- The skeleton is intentionally not styled to match the final layout — it is a generic placeholder.
- The scenario selector stays visible in all states, so the user can switch back to "Loaded" without reloading.
