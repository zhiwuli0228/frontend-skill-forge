# Brainstorm Template

Status: Draft

## Purpose

Define the exploration scope before a change artifact is created.

This file is the canonical brainstorm artifact for the change because the
Superpowers brainstorming skill is not being used for this work packet.

## Problem

`/task/create` is still a placeholder page. The V2 goal is to make it the third
complex runtime surface so later experiments can rely on a richer, stateful
form flow rather than a trivial stub.

The surface needs to support:

- multi-section or multi-step task creation
- clear validation and error handling
- draft/preview/review style interactions
- deterministic browser states for later evidence and E2E coverage

## Brainstorm Source

```yaml
source_mode: fallback-local
required_skill: openspec-explore
fallback_reason: Superpowers brainstorming skill is not installed or not being used for this change packet.
canonical_brainstorm_path: openspec/changes/implement-task-create-runtime-baseline/brainstorm.md
redirect_approved: true
path_compliance: pass
```

## Redirect Rule

- If `Source mode` is `superpowers`, the canonical file must be under
  `docs/superpowers/specs/`.
- If `Source mode` is `fallback-local`, this file itself is the canonical
  brainstorm artifact.
- Any other redirect target is non-compliant.

## Redirect Audit Checklist

| Check | Result | Notes |
| --- | --- | --- |
| `source_mode` is declared | pass | Fallback-local is declared explicitly. |
| `required_skill` is declared | pass | `openspec-explore` is recorded. |
| `canonical_brainstorm_path` is declared | pass | Points to this file. |
| Superpowers redirect stays under `docs/superpowers/specs/` | n/a | No external redirect is used. |
| Fallback reason is present when `source_mode=fallback-local` | pass | Recorded in the YAML block. |
| No alternate redirect target is used | pass | No alternate path is present. |

## Frontend Context

- Target routes or pages: `/task/create`
- Existing domain modules touched: `src/domains/task/pages/TaskCreatePage.tsx`,
  plus task-local components/data if justified
- Existing UI or workflow pain points: placeholder page does not exercise a
  realistic creation flow, validation, or review preview
- Existing Playwright coverage related to this area: none yet for task-create

## Risks

- Overfitting the form to a synthetic demo and not leaving enough reuse value
- Scope creep into task-list or dashboard behavior
- Implementing a complex form without deterministic browser states for testing

## Skill And MCP Direction

| Need | Planned Skill | Planned MCP / Tool | Why |
| --- | --- | --- | --- |
| exploration | openspec-explore | CLI | align scope and constraints with the repository plan |
| implementation | frontend coding workflow | CLI / editor | build the runtime surface under `src/domains/task/` |
| verification | Playwright E2E | Playwright + CLI | prove loading, validation, preview, and non-happy-path states |

## Acceptance Direction

- The task-create page must replace the placeholder with a dense creation
  surface.
- The surface must include a meaningful validation path and at least one
  review or preview-style interaction.
- The final E2E evidence must prove the form is usable in loaded, validation,
  empty, and error-adjacent states.
