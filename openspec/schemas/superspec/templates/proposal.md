# Proposal Template

Status: Draft

## Purpose

Define why the frontend change is needed, what is in scope, and what evidence the delivery must produce.

## Change Summary

- Problem:
- User value:
- Target routes / screens:

## In Scope

- Item 1

## Out Of Scope

- Item 1

## Delivery Constraints

- Reuse the existing frontend framework and repository structure.
- Any user-visible validation must be implemented through the existing Playwright end-to-end framework in `tests/e2e/`.
- Verification is incomplete if it only provides unit-level or static-only checks.

## Required Skills And MCP Usage

| Activity | Required Skill | MCP / Tool | Expected Output |
| --- | --- | --- | --- |
| project reading | skill name | tool name | route/component understanding |
| browser exploration | skill name | Playwright MCP | evidence snapshots / observations |
| implementation | skill name | local editor / CLI | code change |
| verification | skill name | Playwright + CLI | evidence and pass/fail result |

## Required Evidence

- Planned spec artifact path:
- Planned design artifact path:
- Planned verify artifact path:
- Planned E2E spec path:
- Planned evidence paths:

## Acceptance Direction

1. The change must produce specs, design, tasks, implementation, and verify artifacts.
2. Verification must include executed E2E results against the changed flow.
3. The final record must state whether verification passed, failed, or remains blocked.
