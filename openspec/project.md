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

## Agent Governance

When executing tasks that involve Playwright MCP (browser automation, E2E verification, UI exploration), the Agent must follow the MCP Context Guard protocol:

1. Read and apply `docs/08-frontend-agent/MCP_CONTEXT_GUARD.md` before any browser operation
2. Output a Compact Page State Summary after every `browser_snapshot` (template: `docs/08-frontend-agent/page-state-summary-compact.md`)
3. Follow the operation protocol in `docs/08-frontend-agent/playwright-mcp-operation-protocol.md`
4. Store raw evidence under `artifacts/playwright/` — never paste raw DOM or full snapshots into the conversation
5. Treat Playwright element refs as valid only for the current snapshot
6. Run `scripts/check-mcp-context-bloat.ps1` to verify no raw DOM leakage into docs
