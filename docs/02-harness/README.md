# General AI Harness Governance

Status: Draft

## Purpose

Define the general AI Harness governance layer that applies to all agent activities.

## Scope

This layer owns cross-cutting governance concerns:
- Agent workflow
- Git governance
- Verification policy
- Generic Skill lifecycle rules
- General Skill / Rule / Knowledge structure

## Directory Structure

```text
docs/02-harness/
├── README.md
├── workflow.md
├── git-governance.md
├── verification-policy.md
├── agent-rules.md
├── skill-evolution-policy.md
├── migration-guide.md
├── rules/           # Generic Rule definitions
└── knowledge/       # Generic Knowledge definitions
```

## Rules

1. This layer must not contain frontend-specific evidence.
2. Frontend-specific governance belongs in `docs/08-frontend-agent`.
3. Evolution decisions from `docs/08-frontend-agent` may produce updates here.

## Outputs

- Governance policies
- Skill / Rule / Knowledge templates
- Verification procedures
