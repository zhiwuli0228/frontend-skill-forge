# Route Snapshot: /task/list/all (Empty)

Status: Complete
Evidence ID: RS-TL-003

## Metadata

- **Type:** route-snapshot (ui-state-snapshot)
- **Route:** /task/list/all
- **Scenario:** empty
- **Timestamp:** 2026-06-07T14:34:00Z
- **Source:** agent (derived from e2e test artifacts + page source)
- **Confidence:** 0.95
- **Tags:** task, list, scenario-empty, smoke

## Context

- **Exploration Session:** 2026-06-07-V3-task-list-exploration
- **Goal:** Capture the empty state (no data)
- **Trigger:** Scenario selector changed from "Loaded" to "Empty"

## Page State

- **URL:** `/task/list/all`
- **Title (browser tab):** "Task List"
- **Page heading (H2):** "Task List"
- **Load state:** empty
- **Mock data source:** `emptyTasks` (0 items) from `src/domains/task/data/mock-data.ts`

## Visible Components

| Component | Selector | Visible | Content |
| --- | --- | --- | --- |
| Scenario selector | `[data-testid="task-scenario-select"]` | yes | Currently "Empty" |
| Filter bar | `[data-testid="task-filter-bar"]` | no | Hidden in empty state |
| Table | `[data-testid="task-table"]` | no | Replaced by empty placeholder |
| Empty placeholder | `getByText('No tasks')` | yes | Ant Design Empty component |
| Sidebar | `[data-testid="sidebar-menu"]` | yes | Same 5 items |

## Form State

(n/a — filter bar not rendered in empty state)

## Modal/Drawer State

(none)

## Toast/Notification State

(none)

## Network State

(none)

## Console State

(none)

## Artifacts

| Type | Path | Description |
| --- | --- | --- |
| e2e test | `tests/e2e/task-list-runtime.spec.ts` | "empty state shows no tasks message" |
| page source | `src/domains/task/pages/TaskListPage.tsx:49` | `const baseTasks = scenario === 'empty' ? emptyTasks : tasks;` |

## Reproduction Steps

1. Navigate to `http://localhost:5173/task/list/all`
2. Wait for table to render
3. Click the scenario select
4. Click "Empty" option
5. Verify: empty placeholder appears (text "No tasks" visible)
6. Verify: table is hidden
7. Verify: filter bar is hidden

## Validation

- [x] Metadata complete
- [x] Artifact exists (e2e test passes)
- [x] Reproduction steps documented
- [x] Confidence assessed (0.95)

## Notes

- The "No tasks" text comes from `<Empty description="No tasks">` in the page source.
- This is a forced empty state via the scenario selector. A real empty state would be triggered by `tasks.length === 0` from the API.
- The page should also be tested with the URL filter applied, e.g., `/task/list/archived` after the V2.6-V2.10 hotfix to confirm 2 rows show. That test exists as `sidebar-filter-navigation.spec.ts` "clicking Archived filters to archived tasks".
