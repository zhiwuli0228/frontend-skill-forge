# frontend-skill-forge OpenSpec Project

Status: V1 integration verification baseline

This project uses OpenSpec as the change specification entrypoint and uses the repository-local `superspec` schema as the intended workflow baseline for gated design and agent-governed execution.

Repository naming rule:

- `spec-driven` is an upstream umbrella term, not this repository's execution label
- formal change flow must be named `superspec`
- code-bearing dispatch and review must be governed by `superpower`

V1 does not yet claim runtime activation of the full workflow. It does require that all spec-related framework assets exist in-repo, including:

- `openspec/schemas/superspec/schema.yaml`
- static SuperSpec templates
- workflow reference documentation
- repository usage and governance guides
- Superpower brainstorm and dispatch governance documents under `docs/03-openspec/superpower/`
- integrated gate-verification records under `docs/09-change-records/baselines/V1/`

Business implementation, frontend pages, and runtime agent execution remain outside this file's scope.
