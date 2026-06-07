# Tasks: Dashboard Runtime Baseline

Status: Ready for apply

## Purpose

Break the approved plan into trackable implementation and verification tasks.

## Rules

- Every implementation task that affects user-visible behavior must map to at least one E2E verification task.
- Verification tasks must reference the existing Playwright framework under `tests/e2e/`.
- A task is not complete if it lacks a recorded verification result.

## Task List

### 1. Discovery And Setup

- [x] 1.1 Confirm dashboard route, shell layout, and current dashboard file boundary.
- [x] 1.2 Confirm whether any shared/testability helper is genuinely needed before creating it.
- [x] 1.3 Confirm the intended dashboard scenario/state model for populated, loading, empty, error, and filtered states.

### 2. Dashboard Implementation

- [x] 2.1 Replace the placeholder `DashboardPage` with a real runtime composition under `src/domains/dashboard/`.
- [x] 2.2 Implement page header, metric band, queue region, activity region, and detail drawer or expandable panel.
- [x] 2.3 Implement at least one cross-region interaction where a metric or filter control changes another region.
- [x] 2.4 Implement deterministic loaded, loading, empty, error, and filtered dashboard states.
- [x] 2.5 Record changed files and intended behavior delta in `implementation.md`.

### 3. End-To-End Verification

- [x] 3.1 Add or update Playwright E2E coverage for dashboard load, interaction, detail inspection, and one non-happy-path state.
- [x] 3.2 Run `npm run test:e2e` against the affected dashboard flow.
- [x] 3.3 Capture pass/fail result and relevant evidence in `verify.md`.

### 4. Quality Gates

- [x] 4.1 Run `npm run build`.
- [x] 4.2 Run `npm run lint`, or explicitly record why lint was not run.
- [x] 4.3 Update the verify artifact with actual command outputs and conclusions.

## Apply Handoff

The next agent should start with `/opsx:apply` or equivalent implementation workflow on this change:

- Change: `implement-dashboard-runtime-baseline`
- Schema: `superspec`
- Apply-ready artifact: `tasks.md`
