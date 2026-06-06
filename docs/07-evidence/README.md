# Verification Evidence

Status: Draft

## Purpose

Store cross-cutting verification evidence and test results.

## Scope

This directory contains:
- Phase verification reports
- Bootstrap verification evidence
- Cross-cutting test results

## Directory Structure

```text
docs/07-evidence/
├── README.md
├── phase-0-bootstrap-verification.md
└── phase-1-frontend-agent-foundation-verification.md
```

## Rules

1. Frontend-specific UI evidence belongs in `docs/08-frontend-agent/evidence`.
2. Cross-cutting verification evidence belongs here.
3. Phase verification reports are stored here.

## Relationship with docs/08-frontend-agent/evidence

- `docs/07-evidence` stores cross-cutting verification evidence
- `docs/08-frontend-agent/evidence` stores frontend-specific UI evidence
- Frontend evidence may be promoted to `docs/07-evidence` for cross-cutting concerns

## Outputs

- Phase verification reports
- Bootstrap verification evidence
- Cross-cutting test results
