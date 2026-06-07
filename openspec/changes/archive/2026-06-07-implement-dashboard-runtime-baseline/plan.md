# Plan: Dashboard Runtime Baseline

Status: Draft ready for execution

## Purpose

Define the execution sequence, dispatch boundaries, MCP usage order, and evidence checkpoints before implementation starts.

## Execution Sequence

| Order | Objective | Depends On | Output |
| --- | --- | --- | --- |
| 1 | inspect current dashboard, shell, and test baseline | design closure | implementation approach confirmed |
| 2 | implement dashboard state model and page composition | step 1 | dashboard runtime surface |
| 3 | add or update dashboard E2E coverage | step 2 | stronger Playwright dashboard verification |
| 4 | run verification commands and capture outcomes | step 3 | command results for implementation and verify stages |

## Skill Dispatch Plan

| Step | Skill | Scope Boundary | Deliverable |
| --- | --- | --- | --- |
| 1 | repo-reading workflow | dashboard route, shell context, tests | affected-file and risk understanding |
| 2 | frontend incremental coding workflow | `src/domains/dashboard/**`, justified shared/testability helpers only | dashboard code implementation |
| 3 | frontend E2E workflow | `tests/e2e/**` dashboard-related specs | updated Playwright verification |
| 4 | verification workflow | build and E2E execution | recorded command outcomes |

## MCP And Tool Plan

| Step | Tool / MCP | Target | Evidence |
| --- | --- | --- | --- |
| 1 | CLI | repository files | changed-file boundary and design alignment |
| 2 | Playwright | `/dashboard` | visible region and interaction assertions |
| 3 | CLI | build and E2E commands | pass/fail command result |

## Verification Plan

- E2E spec files to add or update: dashboard-focused spec under `tests/e2e/`
- Browser flows to execute: dashboard load, metric interaction, detail drawer open, non-happy-path state
- Evidence files or logs to capture: command results in `implementation.md` and later `verify.md`
- Failure conditions that must block completion:
  - dashboard remains functionally close to placeholder
  - no non-happy-path state is visible
  - no meaningful increase in dashboard E2E coverage

## Exit Criteria

1. The task list is specific enough to execute without inventing hidden scope.
2. Required skills and MCP usage are named explicitly.
3. Verification has executable commands and expected evidence outputs.
