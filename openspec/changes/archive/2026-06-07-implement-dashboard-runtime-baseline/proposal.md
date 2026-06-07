# Proposal: Implement Dashboard Runtime Baseline

Status: Draft ready for implementation planning

## Purpose

Define why the frontend change is needed, what is in scope, and what evidence the delivery must produce.

## Change Summary

- Problem: `/dashboard` is still a placeholder and does not provide a realistic runtime surface for later experiments.
- User value: the repository gains its first complex frontend page suitable for E2E, MCP, evidence, and drift experiments.
- Target routes / screens: `/dashboard`

## In Scope

- Replace the existing dashboard placeholder with an operations-style dashboard page.
- Add dashboard regions such as page header, metric band, alert queue, activity feed, and detail drawer or expandable panel.
- Implement explicit dashboard states: populated, loading, empty, error, and interacted/filtered.
- Strengthen Playwright coverage for the dashboard route beyond simple reachability.

## Out Of Scope

- Task list implementation
- Task creation implementation
- Real backend or persistence integration
- Broad shell or navigation redesign unrelated to dashboard needs

## Delivery Constraints

- Reuse the existing frontend framework and repository structure.
- Any user-visible validation must be implemented through the existing Playwright end-to-end framework in `tests/e2e/`.
- Verification is incomplete if it only provides unit-level or static-only checks.

## Required Skills And MCP Usage

| Activity | Required Skill | MCP / Tool | Expected Output |
| --- | --- | --- | --- |
| project reading | repo-reading / architecture-reading workflow | CLI | route and component boundary understanding |
| browser exploration | frontend E2E / exploration workflow | Playwright | dashboard observations and interaction evidence |
| implementation | frontend incremental coding workflow | local editor / CLI | dashboard code change |
| verification | verification workflow | Playwright + CLI | executed E2E and build results |

## Required Evidence

- Planned spec artifact path: `openspec/changes/implement-dashboard-runtime-baseline/specs/dashboard-runtime-baseline.md`
- Planned design artifact path: `openspec/changes/implement-dashboard-runtime-baseline/design.md`
- Planned verify artifact path: `openspec/changes/implement-dashboard-runtime-baseline/verify.md`
- Planned E2E spec path: `tests/e2e/dashboard-runtime.spec.ts` or equivalent updated dashboard-focused spec
- Planned evidence paths: change-local `verify.md` plus any repository evidence paths chosen during verification

## Acceptance Direction

1. The change must produce specs, design, plan, tasks, implementation, and verify artifacts.
2. Verification must include executed E2E results against the changed dashboard flow.
3. The final record must state whether verification passed, failed, or remains blocked.
