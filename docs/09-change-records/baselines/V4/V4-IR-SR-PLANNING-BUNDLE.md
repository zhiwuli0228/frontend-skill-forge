# V4 IR-SR Planning Bundle

Status: Accepted
Date: 2026-06-07

## IR: Intent and Risks

### Intent

V4 converts the 4 skeleton Skills from stubs to usable v1 procedures. Each Skill is a procedural document that tells an agent how to perform a specific task in the frontend-skill-forge project. V3's evidence (knowledge maps, failure-diagnosis, MCP session, evolution queues) provides the validation set.

### Risks

| # | Risk | Mitigation |
| --- | --- | --- |
| R1 | Skills are not executable | Skills are procedural docs, not code; V5+ could add a Skill executor |
| R2 | Validation is manual | V5+ could add a Skill test suite |
| R3 | No real MCP integration | Phase 6 will re-run e2e-explorer with real MCP |

## SR: Solution and Requirements

### Solution Overview

V4 is 4 minor versions, each producing 1 Skill:

```text
V4.1 frontend-project-reader v1      ← reads codebase, produces summary
V4.2 frontend-incremental-coder v1   ← makes bounded changes
V4.3 frontend-e2e-explorer v1        ← explores UI, creates evidence
V4.4 skill-evolution-maintainer v1   ← evolves skills/rules/knowledge
V4.5 V4 Aggregate Closure            ← governance artifacts
```

### Functional Requirements

| # | Requirement | Satisfied By |
| --- | --- | --- |
| FR1 | frontend-project-reader has v1 procedure | V4.1 |
| FR2 | frontend-incremental-coder has v1 procedure | V4.2 |
| FR3 | frontend-e2e-explorer has v1 procedure | V4.3 |
| FR4 | skill-evolution-maintainer has v1 procedure | V4.4 |
| FR5 | Each Skill has validation examples referencing V3 evidence | V4.1-V4.4 |
| FR6 | evidence-to-skill-promotion updated with 4 accepted promotions | V4.5 |
| FR7 | Decision ledger updated with D038+ | V4.5 |

### Out of Scope

- New runtime features (V5)
- Real MCP browser tool integration (Phase 6)
- Skill code implementation (Skills are docs, not executable code)
- New e2e tests for the Skills themselves
