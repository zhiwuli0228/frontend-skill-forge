# Interaction Trace: Task List Row Click → Detail Drawer

Status: Complete
Evidence ID: IT-TL-001

## Trace Info

- **Trace ID:** IT-TL-001
- **Route:** /task/list/all
- **Timestamp:** 2026-06-07T14:38:00Z
- **Goal:** Verify that clicking a table row opens the detail drawer with the correct task data

## Interaction Sequence

| Step | Action | Target | Selector | Result | Duration (ms) |
| --- | --- | --- | --- | --- | --- |
| 1 | navigate | `/task/list/all` | — | page loads, table renders 10 rows | ~300 |
| 2 | locate | first row | `[data-testid="task-table"] .ant-table-row:first-child` | found | 5 |
| 3 | click | first row | `[data-testid="task-table"] .ant-table-row:first-child` | row click handler fires | 20 |
| 4 | wait for | drawer to appear | `[data-testid="task-detail-drawer"]` | visible | 200 |
| 5 | assert | drawer title | `getByText('Task Details')` | visible | 10 |
| 6 | assert | drawer body has task title | `getByText('Upgrade database connection pooling')` | visible | 10 |
| 7 | click | drawer close button (×) | `.ant-drawer-close` | close handler fires | 15 |
| 8 | wait for | drawer to disappear | `[data-testid="task-detail-drawer"]` | not visible | 150 |
| 9 | assert | table still has 10 rows | `[data-testid="task-table"] .ant-table-row` | 10 | 10 |

## State Changes

### Before Step 3

- `selectedTask: null` in parent state
- `task-detail-drawer`: not rendered (closed)

### After Step 3

- `selectedTask: { id: 't1', title: 'Upgrade database connection pooling', ... }` in parent state
- `task-detail-drawer`: rendered with the task's data

### After Step 7

- `selectedTask: null` again
- `task-detail-drawer`: not rendered

## Network Activity

(none — all data is in-memory)

## Console Output

(none — no errors or warnings during this interaction)

## Errors

(none)

## Observations

- The row click handler is wired via Ant Design's `onRow` prop on the Table component.
- The drawer has a smooth slide-in animation (~200ms).
- The table's selection state is NOT persisted after drawer close. This is by design — the parent resets `selectedTask` to null, so the next click will re-open a fresh drawer.
- The drawer can also be closed by clicking the mask (dimmed background) or pressing Escape. These are not exercised in this trace but are documented in the `TaskDetailDrawer` component discovery.

## Selector Stability

| Selector | Worked? | Notes |
| --- | --- | --- |
| `[data-testid="task-table"]` | yes | stable across all runs |
| `.ant-table-row:first-child` | yes | but fragile if rows reorder — prefer by text content |
| `[data-testid="task-detail-drawer"]` | yes | stable |
| `.ant-drawer-close` | yes | stable AntD class |

**Confidence:** 0.9 (the only fragility is the `:first-child` selector, which depends on row order. In a future V4+ benchmark, row click should target by row id.)

## Evidence References

| Evidence ID | Type | Description |
| --- | --- | --- |
| RS-TL-001 | route-snapshot | Loaded state |
| CD-TL-001 | component-discovery | TaskTable |
| CD-TL-003 | component-discovery | TaskDetailDrawer |

## Notes

- The interaction is fully covered by `tests/e2e/task-list-runtime.spec.ts:8:3` ("task list page row click behavior") and `tests/e2e/full-functional-verification.spec.ts:289:3` ("navigation between task sub-pages" — exercises the drawer briefly).
- A real production app would have a "Edit" button inside the drawer; here it is read-only.
