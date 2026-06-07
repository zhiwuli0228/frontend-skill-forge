# Plan: Task Create Runtime Baseline

Status: Ready for apply

## Purpose

Translate the approved task-create specs and design into an implementation plan
that another agent can execute through `apply`.

## Execution Mode

- `execution_mode: subagent`
- target branch: current working branch

## Implementation Focus

- Replace the `/task/create` placeholder with a dense form-oriented runtime
  surface.
- Keep the implementation local to the task domain unless a shared helper is
  clearly justified.
- Build deterministic mock-state flows for loaded, loading, empty/default,
  validation, and error-adjacent states.
- Add a preview or review region that updates as the form changes.

## Required Reads

- `proposal.md`
- `specs/task-create-runtime-baseline.md`
- `design.md`
- `design-review.md`
- `design-disposition.md`
- `design-closure.md`

## Verification Plan

- Add or update Playwright coverage under `tests/e2e/` for the task-create
  route.
- Verify loaded, validation, preview/review, and loading or error states.
- Run `npm run lint`, `npm run build`, and `npm run test:e2e`.

## Handoff Notes

- The next step is `tasks.md`.
- The implementation agent should stop at the change-local `tasks.md` entry
  point until the formal `apply` workflow begins.
