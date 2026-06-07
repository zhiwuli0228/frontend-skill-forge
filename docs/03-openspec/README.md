# OpenSpec / SuperSpec

Status: V1 baseline

## Scope

This directory documents how the repository uses OpenSpec as the change engine, SuperSpec as the project-local workflow schema layer, and Superpower as the execution and review governance layer.

Repository rule:

- `spec-driven` is an upstream umbrella description, not the repository's execution label
- `superspec` is the concrete schema name used for formal change flow
- `superpower` is the concrete governance layer used for dispatch, review, and closure of code-bearing work

## Current V1 State

- `openspec/config.yaml` points to `superspec` as the default schema direction.
- `openspec/schemas/superspec/` stores the repository-local static schema assets.
- `superspec-usage.md` defines the intended workflow semantics.
- `superpower/` defines the governance layer for brainstorm, dispatch, and review control.
- V1.4 now focuses on integrated validation and traceability across these layers before any business-code work begins.
