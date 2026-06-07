# Brainstorm Template

Status: Draft

## Purpose

Define the exploration scope before a change artifact is created.

If the Superpowers brainstorming skill produced the real brainstorm document,
this file must act as the redirect manifest that points to that canonical file.

## Problem

Describe the problem, user intent, and constraints.

## Brainstorm Source

```yaml
source_mode: superpowers | fallback-local
required_skill: superpowers/brainstorming | openspec-explore
fallback_reason: <required when source_mode=fallback-local>
canonical_brainstorm_path: <path>
redirect_approved: true | false
path_compliance: pass | fail
```

## Redirect Rule

- If `Source mode` is `superpowers`, the canonical file must be under `docs/superpowers/specs/`.
- If `Source mode` is `fallback-local`, this file itself is the canonical brainstorm artifact.
- Any other redirect target is non-compliant.

## Redirect Audit Checklist

| Check | Result | Notes |
| --- | --- | --- |
| `source_mode` is declared | pass / fail | notes |
| `required_skill` is declared | pass / fail | notes |
| `canonical_brainstorm_path` is declared | pass / fail | notes |
| Superpowers redirect stays under `docs/superpowers/specs/` | pass / fail / n/a | notes |
| Fallback reason is present when `source_mode=fallback-local` | pass / fail / n/a | notes |
| No alternate redirect target is used | pass / fail | notes |

## Frontend Context

- Target routes or pages:
- Existing domain modules touched:
- Existing UI or workflow pain points:
- Existing Playwright coverage related to this area:

## Risks

- Risk 1
- Risk 2

## Skill And MCP Direction

| Need | Planned Skill | Planned MCP / Tool | Why |
| --- | --- | --- | --- |
| exploration | skill name | MCP or CLI tool | reason |

## Acceptance Direction

- What must be true before this idea may enter proposal/specs work.
- What E2E-visible outcomes must be proven in the browser.
