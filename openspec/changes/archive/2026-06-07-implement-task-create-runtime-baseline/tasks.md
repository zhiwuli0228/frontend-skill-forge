# Tasks: Task Create Runtime Baseline

Status: Ready for apply

## Purpose

Break the approved plan into trackable implementation and verification tasks.

## Rules

- Every implementation task that affects user-visible behavior must map to at
  least one E2E verification task.
- Verification tasks must reference the existing Playwright framework under
  `tests/e2e/`.
- A task is not complete if it lacks a recorded verification result.

## Task List

### 1. Discovery And Setup

- [x] 1.1 Confirm the `/task/create` route, current placeholder boundary, and
  task-domain file layout.
- [x] 1.2 Confirm whether any shared/testability helper is genuinely needed
  before creating it.
- [x] 1.3 Confirm the intended task-create scenario/state model for
  loaded/default, validation, preview, loading, and error-adjacent states.

### 2. Task Create Implementation

- [x] 2.1 Replace the placeholder `TaskCreatePage` with a real runtime
  composition under `src/domains/task/`.
- [x] 2.2 Implement sectioned form behavior, validation feedback, and preview or
  review interaction.
- [x] 2.3 Implement at least one cross-region interaction where editing form
  inputs changes another visible region.
- [x] 2.4 Implement deterministic loaded, loading, default/empty, validation,
  and error-adjacent task-create states.
- [x] 2.5 Record changed files and intended behavior delta in
  `implementation.md`.

### 3. End-To-End Verification

- [x] 3.1 Add or update Playwright E2E coverage for task-create load,
  validation, preview/review, and one non-happy-path state.
- [x] 3.2 Run `npm run test:e2e` against the affected task-create flow.
- [x] 3.3 Capture pass/fail result and relevant evidence in `verify.md`.

### 4. Quality Gates

- [x] 4.1 Run `npm run build`.
- [x] 4.2 Run `npm run lint`, or explicitly record why lint was not run.
- [x] 4.3 Update the verify artifact with actual command outputs and
  conclusions.

## Apply Handoff

The next agent should start with `/opsx:apply` or equivalent implementation
workflow on this change:

- Change: `implement-task-create-runtime-baseline`
- Schema: `superspec`
- Governance: `superpower`
- Apply-ready artifact: `tasks.md`
