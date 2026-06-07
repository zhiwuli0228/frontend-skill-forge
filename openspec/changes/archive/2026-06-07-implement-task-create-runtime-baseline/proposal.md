# Proposal: Implement Task Create Runtime Baseline

Status: Draft ready for implementation planning

## Purpose

Define why the V2 task-create change is needed, what is in scope, and what
evidence the delivery must produce.

## Change Summary

- Problem: `/task/create` is still a placeholder and does not provide a
  realistic form-oriented runtime surface.
- User value: the repository gains the third complex frontend page, optimized
  for form composition, validation, preview/review behavior, and evidence-ready
  interaction states.
- Target routes / screens: `/task/create`

## In Scope

- Replace the existing task-create placeholder with a dense runtime form
  surface.
- Add sectioned or stepped task creation behavior with visible validation.
- Provide at least one preview or review interaction that changes what the user
  sees without a route change.
- Implement explicit task-create states for loaded, draft, validation, empty,
  and error-adjacent scenarios where applicable.
- Strengthen Playwright coverage for the task-create route beyond simple
  reachability.

## Out Of Scope

- Dashboard implementation changes
- Task-list implementation changes
- Real backend or persistence integration
- Broad shell or navigation redesign unrelated to task-create needs

## Delivery Constraints

- Reuse the existing frontend framework and repository structure.
- Any user-visible validation must be implemented through the existing Playwright
  end-to-end framework in `tests/e2e/`.
- Verification is incomplete if it only provides unit-level or static-only
  checks.

## Required Skills And MCP Usage

| Activity | Required Skill | MCP / Tool | Expected Output |
| --- | --- | --- | --- |
| project reading | repo-reading / architecture-reading workflow | CLI | route/component boundary understanding |
| browser exploration | frontend E2E / exploration workflow | Playwright | task-create observations and interaction evidence |
| implementation | frontend incremental coding workflow | local editor / CLI | task-create code change |
| verification | verification workflow | Playwright + CLI | executed E2E and build results |

## Required Evidence

- Planned spec artifact path:
  `openspec/changes/implement-task-create-runtime-baseline/specs/task-create-runtime-baseline.md`
- Planned design artifact path:
  `openspec/changes/implement-task-create-runtime-baseline/design.md`
- Planned verify artifact path:
  `openspec/changes/implement-task-create-runtime-baseline/verify.md`
- Planned E2E spec path:
  `tests/e2e/task-create-runtime.spec.ts` or an equivalent task-create-focused
  spec
- Planned evidence paths: change-local `verify.md` plus any repository evidence
  paths chosen during verification

## Acceptance Direction

1. The change must produce specs, design, tasks, implementation, and verify
   artifacts.
2. Verification must include executed E2E results against the changed flow.
3. The final record must state whether verification passed, failed, or remains
   blocked.
