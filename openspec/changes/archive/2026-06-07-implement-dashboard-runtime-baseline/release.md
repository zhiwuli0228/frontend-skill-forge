# Release: Dashboard Runtime Baseline

Status: Accepted

## Version

Dashboard Runtime Baseline — initial runtime surface for `/dashboard`.

## Summary

Replaced the dashboard placeholder with an operations-style runtime page. The dashboard now has a metric band, alert queue, activity feed, detail drawer, cross-region filtering interaction, and deterministic state controls (loaded, loading, empty, error). All verification gates passed.

## Verification Summary

| Check | Result | Notes |
| --- | --- | --- |
| `npm run lint` | Pass | No errors or warnings |
| `npm run build` | Pass | tsc + vite clean (548ms) |
| `npm run test:e2e` | Pass | 6/6 dashboard tests + 1/1 smoke test passed |

## Evidence

- Verify artifact: `openspec/changes/implement-dashboard-runtime-baseline/verify.md`
- E2E spec: `tests/e2e/dashboard-runtime.spec.ts` (6 tests)
- Smoke regression: `tests/e2e/smoke.spec.ts` (1 test, still passing)

## Open Items

- Ant Design v6 deprecation warnings (`List`, `Drawer width`, `Alert message`) — cosmetic, deferred to future cleanup

## Acceptance State

**Accepted.** All requirements implemented, all scenarios verified via E2E, build and lint clean. Ready for archive.
