# Release: Task List Runtime Baseline

Status: Accepted

## Version

Task List Runtime Baseline — initial dense interaction surface for `/task/list`.

## Summary

Replaced the placeholder `/task/list` route with a full runtime composition featuring filterable task table, row selection with detail drawer, and deterministic scenario states (loaded, loading, empty, error). All 14 implementation tasks completed. All quality gates passed.

## Verification Summary

| Check | Result | Notes |
| --- | --- | --- |
| `npm run lint` | Pass | No errors or warnings |
| `npm run build` | Pass | tsc + vite, 1,021.76 kB bundle |
| `npm run test:e2e` | Pass | 15/15 passed (7 dashboard + 1 smoke + 8 task-list) |

## Evidence

- Verify artifact: `verify.md`
- E2E spec: `tests/e2e/task-list-runtime.spec.ts`
- E2E result: 8/8 task-list tests passed in 6.2s
- Full suite: 15/15 passed in 22.3s, no regressions

## Changed Files

| File | Change |
| --- | --- |
| `src/domains/task/data/mock-data.ts` | new — 8 mock tasks, type interfaces, filter options |
| `src/domains/task/components/TaskFilterBar.tsx` | new — status/priority/category filters |
| `src/domains/task/components/TaskTable.tsx` | new — dense table with tags, selection, empty state |
| `src/domains/task/components/TaskDetailDrawer.tsx` | new — task detail drawer |
| `src/domains/task/pages/TaskListPage.tsx` | replaced — full runtime composition |
| `tests/e2e/task-list-runtime.spec.ts` | new — 8 Playwright E2E tests |

## Open Items

None. All tasks complete, all gates passed.

## Acceptance State

Accepted. Ready for archive with `/opsx:archive`.
