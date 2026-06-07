# Interaction Trace: Error State + Retry

Status: Complete
Evidence ID: IT-TL-003

## Trace Info

- **Trace ID:** IT-TL-003
- **Route:** /task/list/all
- **Timestamp:** 2026-06-07T14:42:00Z
- **Goal:** Verify that the error state shows an alert with a retry link, and that clicking retry returns to the loaded state

## Interaction Sequence

| Step | Action | Target | Selector | Result | Duration (ms) |
| --- | --- | --- | --- | --- | --- |
| 1 | navigate | `/task/list/all` | — | loaded state, table visible | ~300 |
| 2 | click | scenario select | `[data-testid="task-scenario-select"]` | dropdown opens | 50 |
| 3 | click | "Error" option | `getByTitle('Error', { exact: true })` | option selected | 30 |
| 4 | wait for | re-render | — | page updates to error view | 100 |
| 5 | assert | error alert visible | `[data-testid="task-list-error"]` | visible | 10 |
| 6 | assert | retry link visible | `[data-testid="task-error-retry-link"]` | visible | 10 |
| 7 | assert | error message visible | `getByText('Task list failed to load')` | visible | 10 |
| 8 | assert | description visible | `getByText(/unexpected error/i)` | visible | 10 |
| 9 | click | retry link | `[data-testid="task-error-retry-link"]` | onClick fires | 20 |
| 10 | wait for | re-render | — | page returns to loaded state | 100 |
| 11 | assert | table visible | `[data-testid="task-table"]` | visible, 10 rows | 10 |
| 12 | assert | filter bar visible | `[data-testid="task-filter-bar"]` | visible | 10 |
| 13 | assert | error alert gone | `[data-testid="task-list-error"]` | not in DOM | 10 |

## State Changes

### Before Step 3

- `scenario: 'loaded'`
- rendered: full table + filter bar

### After Step 3

- `scenario: 'error'`
- rendered: error alert only (table + filter bar hidden)

### After Step 9 (retry click)

- `scenario: 'loaded'` (reset by `onRetry={() => setScenario('loaded')}`)
- rendered: full table + filter bar

## Network Activity

(none — the retry link is a no-op; in a real app it would re-trigger the fetch)

## Console Output

| Level | Message | Count | Notes |
| --- | --- | --- | --- |
| warning | `[antd: Alert] 'message' is deprecated. Please use 'title' instead.` | 1 (during error state) | AntD 6 deprecation |

## Errors

(none)

## Observations

- The retry link is implemented as an `<a>` element with an `onClick` handler (not a real `<a href>`), which is why it does not navigate or reload.
- After retry, the scenario state goes back to `'loaded'` but the underlying data is not re-fetched (because there is no fetch). The retry is purely a state reset.
- The error state triggers 1 AntD deprecation warning, which is a known open item from V2.6-V2.10 (will be fixed in V5 AntD 6→7 migration).

## Selector Stability

| Selector | Worked? | Notes |
| --- | --- | --- |
| `[data-testid="task-list-error"]` | yes | stable |
| `[data-testid="task-error-retry-link"]` | yes | stable |
| `getByText('Task list failed to load')` | yes | stable text |

**Confidence:** 0.95

## Evidence References

| Evidence ID | Type | Description |
| --- | --- | --- |
| RS-TL-004 | route-snapshot | Error state |
| CD-TL-004 | component-discovery | Scenario selector pattern |

## Notes

- This trace mirrors `tests/e2e/task-list-runtime.spec.ts:31:3` ("task list error state with retry") — the e2e test asserts the same 13 steps.
- A future V4+ improvement: the error scenario should distinguish between "transient" (retry-able) and "permanent" (show a "go home" button instead of retry).
- The error message is intentionally user-friendly. A future V5+ version could include the error code or correlation id for support.
