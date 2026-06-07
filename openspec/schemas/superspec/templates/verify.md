# Verify Template

Status: Draft

## Purpose

Record executed verification results for the frontend change. This artifact is mandatory and must contain actual results, not planned checks.

## Verification Scope

- Change name:
- Related routes or screens:
- Related E2E specs:

## Skill And MCP Usage Summary

| Activity | Skill | MCP / Tool | Evidence |
| --- | --- | --- | --- |
| browser exploration | skill name | Playwright MCP | snapshot / log |
| automated verification | skill name | `npm run test:e2e` | command result |
| static checks | skill name | `npm run lint` / `npm run build` | command result |

## Executed Commands

| Command | Required | Result | Notes |
| --- | --- | --- | --- |
| `npm run lint` | yes | pass / fail | notes |
| `npm run build` | yes | pass / fail | notes |
| `npm run test:e2e` | yes | pass / fail | notes |

## End-To-End Results

| Scenario | Spec Path | Result | Evidence |
| --- | --- | --- | --- |
| scenario | `tests/e2e/example.spec.ts` | pass / fail | screenshot / trace / report |

## Browser Evidence

- Snapshot references:
- Screenshot references:
- Console or network findings:

## Verification Decision

- Overall status: pass / fail / blocked
- Blocking issue summary:
- Follow-up required:

## Non-Compliance Check

State explicitly whether verification relied only on unit tests or static checks. If yes, this artifact must be marked failed or blocked.
