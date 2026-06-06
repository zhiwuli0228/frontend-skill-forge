# Frontend Agent Architecture

Status: Draft

## Purpose

Define the architectural boundaries between the general AI Harness layer and the frontend-specific agent layer.

## Scope

This document establishes the separation of concerns between `docs/02-harness` and `docs/08-frontend-agent`.

## Rules

### 1. Responsibility Boundary

**docs/02-harness owns:**
- Generic agent workflow
- Git governance
- Verification policy
- Generic Skill lifecycle rules
- General Skill / Rule / Knowledge structure

**docs/08-frontend-agent owns:**
- Frontend MCP exploration
- UI evidence collection
- Page snapshot catalog
- Route / component discovery
- Interaction traces
- E2E asset registry
- UI drift records
- Frontend Skill evolution queue
- Human feedback records

### 2. Evidence Flow

```text
MCP Exploration
  → UI Evidence Capture
    → Evidence Index
      → Evolution Candidate
        → Human / Agent Review
          → Skill / Rule / Knowledge Patch
```

### 3. Layer Interaction

- `docs/08-frontend-agent` may reference `docs/02-harness` for generic lifecycle rules.
- `docs/02-harness` must not contain frontend-specific evidence.
- Evolution decisions in `docs/08-frontend-agent` may produce updates to Skills defined in `docs/02-harness`.

## Outputs

- Clear separation of governance responsibilities
- Defined evidence flow between layers
- Integration points with general Harness
