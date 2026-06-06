# Frontend Agent Governance Layer

Status: Draft

## Purpose

Define the frontend-specific AI Harness governance layer that enables MCP-based UI exploration, evidence collection, and self-evolving frontend Skills.

## Scope

This layer owns all frontend-specific agent capabilities:

- Frontend MCP exploration protocol
- Playwright MCP operation policy
- UI evidence collection and cataloging
- Route and component discovery
- E2E asset lifecycle management
- UI drift diagnosis
- Frontend Skill / Rule / Knowledge evolution
- Human feedback integration

## Directory Structure

```text
docs/08-frontend-agent/
├── README.md
├── frontend-agent-architecture.md
├── mcp-exploration-protocol.md
├── playwright-mcp-policy.md
├── ui-evidence-policy.md
├── e2e-asset-lifecycle.md
├── ui-drift-diagnosis.md
├── self-evolution-mechanism.md
├── mcp/                         # MCP exploration templates
├── evidence/                    # UI evidence templates
├── e2e-assets/                  # E2E test asset templates
├── evolution/                   # Skill evolution templates
└── schemas/                     # JSON schema templates
```

## Rules

1. Frontend-specific evidence must be stored under this layer, not in `docs/02-harness`.
2. All MCP exploration sessions must follow the defined protocol.
3. UI evidence must use the standard templates and naming conventions.
4. Skill evolution must be driven by verified evidence.
5. Human feedback must be recorded before promoting evidence to Skills.

## Outputs

- MCP exploration session records
- UI evidence artifacts
- E2E asset registry entries
- Skill / Rule / Knowledge evolution records
- Drift diagnosis reports
