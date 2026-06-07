# Verification Policy

Status: Active Draft

## Purpose

Define the repository-wide verification baseline and point frontend changes to their stricter execution rules.

## General Policy

- Verification must report executed results, not only planned checks.
- Every change must record what was run, what passed, what failed, and what remains blocked.
- Blocking verification gaps must be explicit and traceable to an owner.

## Frontend Policy

Frontend changes must also follow [rules/frontend-verification-rules.md](./rules/frontend-verification-rules.md).

That means:

- `npm run lint` is required
- `npm run build` is required
- `npm run test:e2e` is required for user-visible behavior changes
- unit-only verification is not sufficient for frontend acceptance

## Evidence Policy

Verification evidence should include:

- command results
- test file paths
- reports, screenshots, or traces where relevant
- MCP/browser observations when browser exploration was used

## Workflow Policy

When a change uses `superspec`, the verification outcome must be recorded in the dedicated `verify` artifact before acceptance-precheck or release claims are made.
