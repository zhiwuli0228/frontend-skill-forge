# Dashboard Runtime Baseline Brainstorm

Status: Finalized for proposal handoff

## Purpose

Define the exploration scope before a change artifact is created.

This change does not have a separate Superpowers-generated brainstorm file. This
artifact is the canonical brainstorm record for the change.

## Problem

The current `/dashboard` route is only a heading and paragraph placeholder. V2
requires the first code-bearing runtime surface to be a complex, testable,
operations-style dashboard that later agents can use for Playwright, MCP,
evidence, and incremental-coding experiments.

## Brainstorm Source

```yaml
source_mode: fallback-local
required_skill: openspec-explore
fallback_reason: No repository-local Superpowers brainstorm artifact was generated for this change handoff.
canonical_brainstorm_path: openspec/changes/implement-dashboard-runtime-baseline/brainstorm.md
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

- Target routes or pages: `/dashboard`
- Existing domain modules touched: `src/domains/dashboard/`, possibly `src/shared/` and `src/testability/`
- Existing UI or workflow pain points: the route has no meaningful content, no state transitions, and no nested interactions
- Existing Playwright coverage related to this area: one reachability smoke test for `/dashboard`

## Risks

- Building a visually richer dashboard that still lacks meaningful statefulness and evidence value
- Letting dashboard implementation bleed into task-list or task-create scope too early

## Skill And MCP Direction

| Need | Planned Skill | Planned MCP / Tool | Why |
| --- | --- | --- | --- |
| repository reading | frontend-project-reader or equivalent repo-reading workflow | CLI | understand route, shell, and domain boundaries |
| implementation planning | planning/decomposition workflow | CLI | convert design into executable tasks |
| implementation | frontend-incremental-coder or equivalent coding workflow | local editor / CLI | update dashboard runtime surface |
| browser verification | frontend-e2e-explorer or equivalent verification workflow | Playwright | validate loaded, interacted, and non-happy-path states |

## Acceptance Direction

- The change may enter proposal/specs work only if it stays inside dashboard scope and remains backend-free.
- The implemented dashboard must expose visible loaded, loading, empty, error, and interacted states.
- The browser-visible outcomes must be proven with stronger Playwright coverage than the current single reachability check.
