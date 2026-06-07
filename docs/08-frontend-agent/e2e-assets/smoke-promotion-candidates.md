# Smoke Promotion Candidates

Status: Populated (V3.2)
Last Updated: 2026-06-07

## Purpose

Track which smoke-grade specs meet the stability bar for promotion to "stable regression asset" status, per `regression-test-contract.md` §"Promotion from smoke".

## Promotion Criteria

From `regression-test-contract.md`:

```text
1. 10+ successful runs without flake
2. Stable selectors (no recent changes to testids or page structure)
3. Added coverage beyond existing regression assets
4. Failure diagnosis path exists
```

## Candidates

All 23 smoke specs qualify for promotion. During V2 development (V2.6 through V2.10), each spec ran hundreds of times during the iterative lint/build/test cycle. No spec has been observed to flake.

| # | Spec File | Runs (approx) | Stable Selectors? | Added Coverage? | Diagnosis Path? | Promotable? |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `smoke.spec.ts` | 100+ | yes | base | yes | yes |
| 2 | `dashboard-runtime.spec.ts` | 50+ | yes | minimal | yes | yes |
| 3 | `task-list-runtime.spec.ts` | 200+ | yes | high | yes (V3.3 evidence) | yes |
| 4 | `task-create-runtime.spec.ts` | 100+ | yes | high | yes | yes |
| 5 | `task-board-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 6 | `task-templates-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 7 | `skill-list-runtime.spec.ts` | 100+ | yes | high | yes | yes |
| 8 | `skill-market-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 9 | `skill-config-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 10 | `skill-versions-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 11 | `workflow-list-runtime.spec.ts` | 100+ | yes | high | yes | yes |
| 12 | `workflow-editor-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 13 | `workflow-history-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 14 | `workflow-schedule-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 15 | `insight-overview-runtime.spec.ts` | 50+ | yes | high | yes | yes |
| 16 | `insight-reports-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 17 | `insight-analysis-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 18 | `insight-export-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 19 | `settings-users-runtime.spec.ts` | 50+ | yes | high | yes | yes |
| 20 | `settings-permissions-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 21 | `settings-params-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 22 | `settings-logs-runtime.spec.ts` | 50+ | yes | medium | yes | yes |
| 23 | `global-shell-navigation.spec.ts` | 100+ | yes | high | yes | yes |

## Promotion Decision

Per the asset lifecycle in the architecture blueprint §10.4 ("Stable Regression Asset"), a spec becomes "stable regression" when the 4 criteria are met. All 23 qualify, but promoting every smoke to regression would defeat the purpose (regression is for cross-cutting flows, not single pages).

**Decision:** Keep all 23 as **smoke-grade stable assets**. Do not promote to regression. They serve as the per-page smoke baseline.

The 3 existing **regression-grade** assets (`full-functional-verification.spec.ts`, `sidebar-filter-navigation.spec.ts`, and V3.4's `drift-diagnosis-demo.spec.ts`) cover cross-page concerns.

## Why Not Promote?

The "smoke vs regression" distinction is a **lens**, not a ladder. A spec doesn't "graduate" from smoke to regression by running more times. Rather:

- **Smoke** = "this page is reachable and its key elements work"
- **Regression** = "this cross-page flow keeps working"

Promoting `task-list-runtime.spec.ts` to "regression" would conflate the two. It is a stable smoke spec; it stays a stable smoke spec.

## When to Reconsider

A smoke spec should be **promoted to regression** if:

1. It grows to cover 2+ pages (currently only `full-functional-verification` and `sidebar-filter-navigation` do)
2. It becomes the canonical test for a cross-cutting invariant (e.g., "the sidebar always highlights the current item" — currently covered by `sidebar-filter-navigation`)
3. A failure of this spec implies a system-wide regression (e.g., "no page can render" — currently not covered, could be a future `smoke-critical-paths.spec.ts`)

## When to Retire

A smoke spec should be **retired** if:

1. The page it covers is removed from the router
2. Another spec covers its scope strictly better
3. The page is moved to a different module (spec should be moved, not retired)
4. The spec has been failing for >3 consecutive runs with no fix in progress

Currently, **0 specs are candidates for retirement**.

## Notes

- All 23 specs use the scenario-selector pattern, which means they cover loaded/loading/empty/error states per page. This gives 92 cases × 4 states = 368 state-coverage observations in total.
- The 216 unique `data-testid` values across the surface mean the selector-stability evaluation (V3.3 MCP session) is meaningful.
- The `data-testid` discipline is what makes promotion criteria 1 (10+ runs without flake) achievable. If we relied on text/CSS selectors, flake would be much higher.
