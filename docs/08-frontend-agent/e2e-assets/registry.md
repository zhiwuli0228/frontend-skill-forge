# E2E Case Registry

Status: Populated (V3.2)
Last Updated: 2026-06-07

## Registry Info

- **Project:** frontend-skill-forge
- **Total Specs:** 25
- **Total Cases:** 181
- **Coverage:** 23 of 24 unique page routes (excluding `/login` and the legacy `/dashboard` redirect)
- **Classification Method:** Each spec is classified as `smoke` (single page, <30s, deterministic, stable selectors) or `regression` (multi-page, end-to-end flow, edge cases). See `smoke-test-contract.md` and `regression-test-contract.md` for the criteria.

## Classification Summary

| Type | Specs | Cases | Notes |
| --- | --- | --- | --- |
| smoke | 23 | 130 | Per-page, all use `data-testid` selectors, all run <30s |
| regression | 2 | 51 | Multi-page navigation + cross-cutting behavior |
| **Total** | **25** | **181** | |

## Per-Spec Registry (Active)

| # | Spec File | Module | Routes Covered | Cases | Type | Priority | Last Run | Evidence Refs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `smoke.spec.ts` | (root) | `/login` | 1 | smoke | high | 2026-06-07 | _none yet_ |
| 2 | `dashboard-runtime.spec.ts` | dashboard | `/dashboard` (redirected) | 6 | smoke | medium | 2026-06-07 | _V3.3-evidence-task-list_ |
| 3 | `task-list-runtime.spec.ts` | task | `/task/list/all` (and :filter variants) | 8 | smoke | high | 2026-06-07 | _V3.3-evidence-task-list_ |
| 4 | `task-create-runtime.spec.ts` | task | `/task/create` | 10 | smoke | high | 2026-06-07 | _none yet_ |
| 5 | `task-board-runtime.spec.ts` | task | `/task/board` | 6 | smoke | medium | 2026-06-07 | _none yet_ |
| 6 | `task-templates-runtime.spec.ts` | task | `/task/templates` | 7 | smoke | medium | 2026-06-07 | _none yet_ |
| 7 | `skill-list-runtime.spec.ts` | skill | `/skill/list/all` (and :filter variants) | 8 | smoke | high | 2026-06-07 | _none yet_ |
| 8 | `skill-market-runtime.spec.ts` | skill | `/skill/market` | 6 | smoke | medium | 2026-06-07 | _none yet_ |
| 9 | `skill-config-runtime.spec.ts` | skill | `/skill/config` | 5 | smoke | medium | 2026-06-07 | _none yet_ |
| 10 | `skill-versions-runtime.spec.ts` | skill | `/skill/versions` | 5 | smoke | medium | 2026-06-07 | _none yet_ |
| 11 | `workflow-list-runtime.spec.ts` | workflow | `/workflow/list/all` (and :filter variants) | 5 | smoke | high | 2026-06-07 | _none yet_ |
| 12 | `workflow-editor-runtime.spec.ts` | workflow | `/workflow/editor` | 6 | smoke | medium | 2026-06-07 | _none yet_ |
| 13 | `workflow-history-runtime.spec.ts` | workflow | `/workflow/history` | 5 | smoke | medium | 2026-06-07 | _none yet_ |
| 14 | `workflow-schedule-runtime.spec.ts` | workflow | `/workflow/schedule` | 6 | smoke | medium | 2026-06-07 | _none yet_ |
| 15 | `insight-overview-runtime.spec.ts` | insight | `/insight/overview/all` (and :filter variants) | 5 | smoke | high | 2026-06-07 | _none yet_ |
| 16 | `insight-reports-runtime.spec.ts` | insight | `/insight/reports` | 4 | smoke | medium | 2026-06-07 | _none yet_ |
| 17 | `insight-analysis-runtime.spec.ts` | insight | `/insight/analysis` | 4 | smoke | medium | 2026-06-07 | _none yet_ |
| 18 | `insight-export-runtime.spec.ts` | insight | `/insight/export` | 5 | smoke | medium | 2026-06-07 | _none yet_ |
| 19 | `settings-users-runtime.spec.ts` | settings | `/settings/users` | 5 | smoke | high | 2026-06-07 | _none yet_ |
| 20 | `settings-permissions-runtime.spec.ts` | settings | `/settings/permissions` | 6 | smoke | medium | 2026-06-07 | _none yet_ |
| 21 | `settings-params-runtime.spec.ts` | settings | `/settings/params` | 5 | smoke | medium | 2026-06-07 | _none yet_ |
| 22 | `settings-logs-runtime.spec.ts` | settings | `/settings/logs` | 4 | smoke | medium | 2026-06-07 | _none yet_ |
| 23 | `global-shell-navigation.spec.ts` | (shell) | all 5 modules | 8 | smoke | high | 2026-06-07 | _none yet_ |
| 24 | `full-functional-verification.spec.ts` | (all) | 5 modules | 38 | regression | high | 2026-06-07 | _V3.3-evidence-task-list_ |
| 25 | `sidebar-filter-navigation.spec.ts` | (cross-module) | 4 URL-filter modules | 13 | regression | high | 2026-06-07 | _V3.3-evidence-task-list_ |
| 26 | `drift-diagnosis-demo.spec.ts` (V3.4 new) | (all) | `/task/list/all` | 1 | regression | medium | (pending) | _V3.4-drift-diagnosis_ |

## Per-Route Coverage

| Route | Primary Spec | Additional Specs | Total Cases |
| --- | --- | --- | --- |
| `/login` | `smoke.spec.ts` | — | 1 |
| `/dashboard` | (redirects to /task/list) | — | 0 |
| `/task/list/:filter?` | `task-list-runtime.spec.ts` | `full-functional-verification.spec.ts`, `sidebar-filter-navigation.spec.ts` | 59 |
| `/task/create` | `task-create-runtime.spec.ts` | `full-functional-verification.spec.ts` | 11 |
| `/task/templates` | `task-templates-runtime.spec.ts` | `full-functional-verification.spec.ts` | 8 |
| `/task/board` | `task-board-runtime.spec.ts` | `full-functional-verification.spec.ts` | 7 |
| `/skill/list/:filter?` | `skill-list-runtime.spec.ts` | `full-functional-verification.spec.ts`, `sidebar-filter-navigation.spec.ts` | 19 |
| `/skill/market` | `skill-market-runtime.spec.ts` | `full-functional-verification.spec.ts` | 7 |
| `/skill/config` | `skill-config-runtime.spec.ts` | `full-functional-verification.spec.ts` | 6 |
| `/skill/versions` | `skill-versions-runtime.spec.ts` | `full-functional-verification.spec.ts` | 6 |
| `/workflow/list/:filter?` | `workflow-list-runtime.spec.ts` | `full-functional-verification.spec.ts`, `sidebar-filter-navigation.spec.ts` | 12 |
| `/workflow/editor` | `workflow-editor-runtime.spec.ts` | `full-functional-verification.spec.ts` | 7 |
| `/workflow/history` | `workflow-history-runtime.spec.ts` | `full-functional-verification.spec.ts` | 6 |
| `/workflow/schedule` | `workflow-schedule-runtime.spec.ts` | `full-functional-verification.spec.ts` | 7 |
| `/insight/overview/:filter?` | `insight-overview-runtime.spec.ts` | `full-functional-verification.spec.ts`, `sidebar-filter-navigation.spec.ts` | 13 |
| `/insight/reports` | `insight-reports-runtime.spec.ts` | `full-functional-verification.spec.ts` | 5 |
| `/insight/analysis` | `insight-analysis-runtime.spec.ts` | `full-functional-verification.spec.ts` | 5 |
| `/insight/export` | `insight-export-runtime.spec.ts` | `full-functional-verification.spec.ts` | 6 |
| `/settings/users` | `settings-users-runtime.spec.ts` | `full-functional-verification.spec.ts`, `sidebar-filter-navigation.spec.ts` | 9 |
| `/settings/permissions` | `settings-permissions-runtime.spec.ts` | `full-functional-verification.spec.ts`, `sidebar-filter-navigation.spec.ts` | 9 |
| `/settings/params` | `settings-params-runtime.spec.ts` | `full-functional-verification.spec.ts`, `sidebar-filter-navigation.spec.ts` | 9 |
| `/settings/logs` | `settings-logs-runtime.spec.ts` | `full-functional-verification.spec.ts`, `sidebar-filter-navigation.spec.ts` | 8 |

## Coverage Summary

- **Smoke Tests:** 130 cases across 23 specs (92% of total cases)
- **Regression Tests:** 51 cases across 3 specs (8% of total cases)
- **Route Coverage:** 23 of 24 page routes have at least one spec (login excluded; dashboard is a redirect)
- **Average Cases per Route:** 7.4

## Retired Specs

(none yet)

## How a Spec is Classified

| Criterion | Smoke | Regression |
| --- | --- | --- |
| Number of routes | 1 (typical) or 1-2 (cross-page) | 2+ (cross-page, cross-module) |
| Run time | <30s | up to 1-2 min |
| Goal | "Page X loads and key elements work" | "User flow Y works end-to-end including edge cases" |
| Failure impact | "Feature X is broken" | "The system as a whole has a regression" |
| Example | `task-list-runtime.spec.ts` | `full-functional-verification.spec.ts` |

The classification is applied per spec, not per case. If a spec contains a mix of page-level smoke and cross-page regression cases, split it into two specs.

## Notes

- The `/login` page is intentionally not covered by module-specific specs because it is outside the GlobalShell and has no scenario-selector pattern.
- `dashboard-runtime.spec.ts` covers the legacy `/dashboard` route but only tests the redirect behavior (no real page assertions).
- `global-shell-navigation.spec.ts` is smoke-graded because it visits each module once, but it could be promoted to regression if the cross-module navigation patterns grow.
- V3.4 will add `drift-diagnosis-demo.spec.ts` (1 case) as a regression-grade demo of the failure-diagnosis workflow.

## Evidence References

- V3.3 will populate this column for the first spec (`task-list-runtime.spec.ts`) when the first MCP exploration session produces real evidence records.
- See `docs/08-frontend-agent/evidence/evidence-index-task-list.md` (V3.3) for the first evidence set.
