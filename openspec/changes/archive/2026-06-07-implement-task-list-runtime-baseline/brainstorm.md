# Task List Runtime Baseline Brainstorm

Status: Finalized for proposal handoff

## Purpose

Define the exploration scope before a change artifact is created.

This change does not have a separate Superpowers-generated brainstorm file. This
artifact is the canonical brainstorm record for the change.

## Problem

The current `/task/list` route is still a placeholder. V2 needs the task-list
surface to become the main dense interaction benchmark for later evidence,
E2E, MCP, and state-management experiments.

## Brainstorm Source

```yaml
source_mode: fallback-local
required_skill: openspec-explore
fallback_reason: No repository-local Superpowers brainstorm artifact was generated for this change handoff.
canonical_brainstorm_path: openspec/changes/implement-task-list-runtime-baseline/brainstorm.md
redirect_approved: true
path_compliance: pass
```

## Redirect Rule

- If `Source mode` is `superpowers`, the canonical file must be under `docs/superpowers/specs/`.
- If `Source mode` is `fallback-local`, this file itself is the canonical brainstorm artifact.
- Any other redirect target is non-compliant.

## Redirect Audit Checklist

| Check | Result | Notes |
| --- | --- | --- |
| `source_mode` is declared | pass | `fallback-local` is declared. |
| `required_skill` is declared | pass | `openspec-explore` is declared as fallback. |
| `canonical_brainstorm_path` is declared | pass | This file is the canonical artifact. |
| Superpowers redirect stays under `docs/superpowers/specs/` | n/a | No external redirect is used. |
| Fallback reason is present when `source_mode=fallback-local` | pass | Fallback reason is recorded. |
| No alternate redirect target is used | pass | No alternate redirect target is referenced. |

## Frontend Context

- Target routes or pages: `/task/list`
- Existing domain modules touched: `src/domains/task/`, possibly `src/shared/` and `src/testability/`
- Existing UI or workflow pain points: the route is still a placeholder and does not expose filter, selection, detail, or stateful task exploration
- Existing Playwright coverage related to this area: no task-list-specific coverage yet

## Risks

- Building a visually richer task list that still lacks meaningful data density or interaction depth
- Pulling task-create behavior into task-list scope
- Overbuilding abstractions before reuse is proven

## Skill And MCP Direction

| Need | Planned Skill | Planned MCP / Tool | Why |
| --- | --- | --- | --- |
| repository reading | frontend-project-reader or equivalent repo-reading workflow | CLI | understand existing task domain and routing boundaries |
| implementation planning | planning/decomposition workflow | CLI | turn task-list surface goals into bounded work |
| implementation | frontend-incremental-coder or equivalent coding workflow | local editor / CLI | update task-list runtime surface |
| browser verification | frontend-e2e-explorer or equivalent verification workflow | Playwright | validate list, filter, selection, and detail interactions |

## Acceptance Direction

- The change may enter proposal/specs work only if it stays inside task-list scope and remains backend-free.
- The implemented task list must expose dense, testable, task-centric interactions.
- The browser-visible outcomes must be proven with stronger Playwright coverage than the current dashboard-only baseline.
