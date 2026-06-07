# V3 Baseline

Status: Closed

## Purpose

V3 is the **First Evidence Loop** major version. It establishes the project's first operational evidence loop on top of the V2 surface: knowledge maps, e2e asset registry, first MCP exploration session, drift-diagnosis-driven evolution candidates, and full V3 governance closure.

V3 is documentation-and-evidence-heavy. The V2 surface stays stable. The only new code in V3 is one diagnostic e2e spec.

## Main Outputs

| Type | File |
| --- | --- |
| V3 IR/SR planning bundle | [V3-IR-SR-PLANNING-BUNDLE.md](./V3-IR-SR-PLANNING-BUNDLE.md) |
| V3 iteration plan | (this README) |
| V3.1 release record | [../../releases/V3.md](../../releases/V3.md) |
| V3 aggregate summary | [../../summaries/V3-AGGREGATE-SUMMARY.md](../../summaries/V3-AGGREGATE-SUMMARY.md) |
| V3 retrospective | [../../optimizations/V3-RETROSPECTIVE-AND-OPTIMIZATIONS.md](../../optimizations/V3-RETROSPECTIVE-AND-OPTIMIZATIONS.md) |
| V3 issues | [../../issues/V3-DEVELOPMENT-ISSUES.md](../../issues/V3-DEVELOPMENT-ISSUES.md) |
| V3 hotfix ledger (V2.10 sidebar) | [../../issues/2026-06-07-V2-hotfix-ledger.md](../../issues/2026-06-07-V2-hotfix-ledger.md) |
| Decision ledger (V3 entries) | [../../current/DECISIONS.md](../../current/DECISIONS.md) |
| Phase 3 verification report | [../../../07-evidence/phase-3-first-evidence-loop-verification.md](../../../07-evidence/phase-3-first-evidence-loop-verification.md) |
| Knowledge maps (5, populated) | [../../../02-harness/knowledge/frontend/](../../../02-harness/knowledge/frontend/) |
| E2E registry + smoke candidates | [../../../08-frontend-agent/e2e-assets/registry.md](../../../08-frontend-agent/e2e-assets/registry.md), [smoke-promotion-candidates.md](../../../08-frontend-agent/e2e-assets/smoke-promotion-candidates.md) |
| First MCP exploration session | [../../../08-frontend-agent/mcp/sessions/2026-06-07-V3-task-list-exploration.md](../../../08-frontend-agent/mcp/sessions/2026-06-07-V3-task-list-exploration.md) |
| Evidence records (12) | [../../../08-frontend-agent/evidence/](../../../08-frontend-agent/evidence/) |
| Failure diagnosis (V2.10 sidebar) | [../../../08-frontend-agent/evidence/failure-diagnoses/2026-06-07-V2-sidebar-drift.md](../../../08-frontend-agent/evidence/failure-diagnoses/2026-06-07-V2-sidebar-drift.md) |
| Evolution queues (knowledge, rule, skill) | [../../../08-frontend-agent/evolution/](../../../08-frontend-agent/evolution/) |
| Drift diagnosis spec (only new code) | [../../../../tests/e2e/drift-diagnosis-demo.spec.ts](../../../../tests/e2e/drift-diagnosis-demo.spec.ts) |

## Minor-Version Plan

V3 uses **one IR/SR bundle** for the whole major version, then dispatches per minor version. Each minor version has a reduced gate set (proposal → tasks → implementation → verify → release) since they are sub-changes inside the V3 IR/SR bundle.

| Minor | Goal | Output count | New code? |
| --- | --- | --- | --- |
| V3.1 | Knowledge Map Population | 5 maps fully populated | No |
| V3.2 | E2E Asset Registry | 2 new docs (registry + promotion candidates) | No |
| V3.3 | First MCP Exploration Session | 1 session + 11 evidence records | No (uses e2e artifacts) |
| V3.4 | Drift Diagnosis + Evolution Candidates | 1 failure record + 1 issue + 2 queue updates + 1 spec | 1 new e2e spec (~50 lines) |
| V3.5 | V3 Aggregate Closure | V3 governance artifacts | No |

## Scope

V3 is the major version for the **first evidence loop**:

- Knowledge maps are no longer skeletons — they document the V2 surface
- The e2e asset registry formalizes the 25 spec files
- The first MCP exploration session proves the evidence template workflow
- The V2.10 sidebar hotfix becomes a seed failure-diagnosis record
- Evolution candidates are populated and approved through the decision-record workflow

V3 is NOT:

- A new runtime feature version (that's V5)
- A Skill v1 implementation (that's V4)
- A real MCP browser tool integration (deferred — V3 used e2e artifacts as fallback)
- A code-splitting / AntD 6→7 migration (deferred to V5)

## V3 Exit Gate

V3 is closed when:

- [x] All 5 knowledge maps fully populated
- [x] 25/25 e2e spec files cataloged in registry
- [x] 1 MCP session record with 12 evidence records
- [x] 1 failure-diagnosis record (V2.10 sidebar)
- [x] 1 first-accepted knowledge candidate (KE-001)
- [x] 5 first-accepted rule candidates (RE-001 through RE-005)
- [x] 1 new diagnostic e2e spec passing
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] `npm run test:e2e` passes (183/184: 1 fixme-skipped, no failures)
- [x] V3 governance artifacts complete (this file + release + summary + retro + issues + decisions)
- [x] Decision ledger updated with D031+
- [x] User accepts V3 as complete

## V3 Status

✅ All exit-gate criteria met. Ready for user acceptance.
