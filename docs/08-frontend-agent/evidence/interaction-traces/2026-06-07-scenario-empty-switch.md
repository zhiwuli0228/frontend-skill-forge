# Interaction Trace: Scenario Switch to Empty

Status: Complete
Evidence ID: IT-TL-002

## Trace Info

- **Trace ID:** IT-TL-002
- **Route:** /task/list/all
- **Timestamp:** 2026-06-07T14:40:00Z
- **Goal:** Verify that switching the scenario selector to "Empty" hides the table and filter bar and shows the empty placeholder

## Interaction Sequence

| Step | Action | Target | Selector | Result | Duration (ms) |
| --- | --- | --- | --- | --- | --- |
| 1 | navigate | `/task/list/all` | — | loaded state, table visible | ~300 |
| 2 | assert | loaded state | table visible, filter bar visible, no empty placeholder | confirmed | 10 |
| 3 | click | scenario select | `[data-testid="task-scenario-select"]` | dropdown opens with 4 options | 50 |
| 4 | click | "Empty" option | `getByTitle('Empty', { exact: true })` (in the AntD dropdown portal) | option selected | 30 |
| 5 | wait for | re-render | — | page updates to empty view | 100 |
| 6 | assert | empty placeholder visible | `getByText('No tasks')` | visible | 10 |
| 7 | assert | table hidden | `[data-testid="task-table"]` | not in DOM (or hidden) | 10 |
| 8 | assert | filter bar hidden | `[data-testid="task-filter-bar"]` | not in DOM | 10 |
| 9 | assert | scenario select still visible | `[data-testid="task-scenario-select"]` | visible, shows "Empty" | 10 |
| 10 | click | scenario select again | `[data-testid="task-scenario-select"]` | dropdown opens | 30 |
| 11 | click | "Loaded" option | `getByTitle('Loaded', { exact: true })` | option selected | 30 |
| 12 | assert | back to loaded state | table visible, filter bar visible | confirmed | 10 |

## State Changes

### Before Step 4

- `scenario: 'loaded'`
- `baseTasks: tasks` (10 items)
- rendered: full table + filter bar

### After Step 4

- `scenario: 'empty'`
- `baseTasks: emptyTasks` (0 items)
- rendered: empty placeholder only

### After Step 11

- `scenario: 'loaded'`
- back to full table

## Network Activity

(none)

## Console Output

(none)

## Errors

(none)

## Observations

- The transition is instant (no animation) because the parent re-renders synchronously based on `scenario` state.
- The scenario selector stays visible in ALL states (including loading/empty/error), which is the desired behavior — the user can switch back to "Loaded" without reloading the page.
- Step 4 uses `getByTitle('Empty', { exact: true })` instead of `getByText` because AntD Select renders the option text inside a `<span title="Empty">` in the dropdown portal. This is a known Playwright-AntD interop pattern.
- The `{ exact: true }` modifier is required because `getByTitle('Empty')` would also match other elements with `title="..."` (e.g., table cells with `title="Error Alert Escalation"`).

## Selector Stability

| Selector | Worked? | Notes |
| --- | --- | --- |
| `[data-testid="task-scenario-select"]` | yes | stable |
| `getByTitle('Empty', { exact: true })` | yes | stable AntD pattern |
| `getByText('No tasks')` | yes | stable text |

**Confidence:** 0.95

## Evidence References

| Evidence ID | Type | Description |
| --- | --- | --- |
| RS-TL-001 | route-snapshot | Loaded state (for comparison) |
| RS-TL-003 | route-snapshot | Empty state |
| CD-TL-004 | component-discovery | Scenario selector pattern |

## Notes

- The "scenario" feature is intentionally NOT a real product feature — it is a demo/dev tool to make all 4 states deterministically reachable. This is documented in `state-flow-map.md`.
- A future V4+ improvement: extract the scenario selector into a reusable hook (`useScenarioState()`) to remove the per-page boilerplate.
