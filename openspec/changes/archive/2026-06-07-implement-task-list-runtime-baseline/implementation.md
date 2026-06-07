# Implementation: Task List Runtime Baseline

Status: Complete

## Changed Files

| File | Change Type | Description |
| --- | --- | --- |
| `src/domains/task/data/mock-data.ts` | new | Task data model and 8 deterministic mock tasks with varied statuses, priorities, and categories |
| `src/domains/task/components/TaskFilterBar.tsx` | new | Filter controls for status, priority, and category using Ant Design Select |
| `src/domains/task/components/TaskTable.tsx` | new | Dense table with status/priority tags, row selection, and empty state |
| `src/domains/task/components/TaskDetailDrawer.tsx` | new | Drawer showing full task details without leaving the list route |
| `src/domains/task/pages/TaskListPage.tsx` | replaced | Replaced placeholder with full runtime composition: scenario selector, filters, table, detail drawer |
| `tests/e2e/task-list-runtime.spec.ts` | new | 8 Playwright E2E tests covering loaded, filtered, selected, empty, loading, and error states |

## Behavior Delta

### Before
- `/task/list` showed a static placeholder with title and description text.
- No interaction, no data, no states.

### After
- `/task/list` shows a dense task exploration surface with:
  - **Filter bar**: status, priority, and category filters that narrow the visible task list
  - **Task table**: 8 mock tasks with colored status/priority tags, clickable rows
  - **Detail drawer**: opens on row click showing full task details, closes cleanly
  - **Scenario selector**: toggle between loaded, loading, empty, and error states
  - **Cross-region interaction**: applying a filter changes the table content; selecting a row opens the detail drawer
  - **Non-happy-path states**: skeleton UI for loading, empty state with message, error alert with retry

## Design Alignment

- Follows the same pattern as `DashboardPage`: scenario selector, local mock data, deterministic state model
- Components are scoped under `src/domains/task/components/` (no shared/testability helpers needed)
- No route changes; all interactions stay on `/task/list`
- No backend integration; all data is local mock
