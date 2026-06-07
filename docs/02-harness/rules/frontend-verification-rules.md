# Frontend Verification Rules

Status: Active Draft

## Purpose

Define the minimum verification standard for frontend changes in this repository.

## Mandatory Checks

Every user-visible frontend change must record:

- `npm run lint`
- `npm run build`
- `npm run test:e2e`

These checks must be reported with actual results in the relevant verification artifact.

## End-To-End Requirement

1. User-visible changes must be covered by the existing Playwright framework under `tests/e2e/`.
2. Verification is not acceptable if it relies only on unit tests, type checks, screenshots, or verbal claims.
3. If E2E execution is blocked, the verification record must explicitly state the blocker, impact, and owner.

## Skill And MCP Recording

Verification-related outputs must state:

- which skill performed exploration, implementation, and verification work
- which MCP or tool was used for browser exploration or automation
- what evidence was captured

## Evidence Standard

Acceptable evidence includes:

- Playwright spec file paths
- command results
- reports, traces, or screenshots
- console or network findings when relevant

## Failure Rule

A change remains blocked if:

- `npm run test:e2e` was not run for a user-visible change and no approved blocker was recorded
- the verification artifact lacks actual results
- the change claims success using only unit or static checks
