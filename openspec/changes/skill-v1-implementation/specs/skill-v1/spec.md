# Skill v1 Capability

## Purpose

The V4 Skill v1 capability is the project's first operational procedural knowledge layer. It provides 4 Skills that agents can follow to perform specific tasks: read a codebase, make bounded changes, explore UI, and evolve knowledge.

## ADDED Requirements

### Requirement: Procedural Knowledge Documentation

The system SHALL provide 4 Skills as procedural markdown documents, each with a complete step-by-step procedure, inputs/outputs, validation examples, and known limitations.

#### Scenario: Skill Document Exists

- GIVEN a skeleton Skill exists at `docs/02-harness/skills/<name>/SKILL.md`
- WHEN the Skill v1 implementation is complete
- THEN the Skill document has: Purpose, When to Use, Inputs (table), Procedure (8-9 steps), Outputs (table), Validation Examples (≥2), Known Limitations, Cross-References
- AND the Status field reads "v1 (V4)"
- AND the document is ≥300 lines

#### Scenario: Skill Validated Against V3 Evidence

- GIVEN V3 produced evidence records (knowledge maps, failure-diagnosis, MCP session, evolution queues)
- WHEN a Skill v1 is validated
- THEN the Validation Examples section references specific V3 evidence IDs
- AND the examples demonstrate that running the Skill against the V2 surface produces outputs matching V3's artifacts

### Requirement: Agent Lifecycle Coverage

The system SHALL provide Skills that cover the full agent lifecycle: read → change → explore → evolve.

#### Scenario: Lifecycle Skills Available

- GIVEN the 4 Skills are implemented
- WHEN an agent needs to perform a task
- THEN there is a Skill for each lifecycle phase:
  - Read: `frontend-project-reader` (understand the codebase)
  - Change: `frontend-incremental-coder` (make bounded changes)
  - Explore: `frontend-e2e-explorer` (explore UI and create evidence)
  - Evolve: `skill-evolution-maintainer` (evolve skills/rules/knowledge)
- AND each Skill's "When to Use" section clearly scopes when to invoke it

### Requirement: Evidence-Based Validation

The system SHALL validate each Skill against V3's evidence loop.

#### Scenario: Project Reader Validated

- GIVEN `frontend-project-reader` v1 is implemented
- WHEN the Skill is run against the V2 surface
- THEN the output matches V3.1's knowledge maps (5 maps, 21 routes, 30 components)

#### Scenario: Incremental Coder Validated

- GIVEN `frontend-incremental-coder` v1 is implemented
- WHEN the Skill is run with the V2.10 sidebar hotfix as the change request
- THEN the output matches V3.4's failure-diagnosis record (FD-2026-06-07-001)

#### Scenario: E2E Explorer Validated

- GIVEN `frontend-e2e-explorer` v1 is implemented
- WHEN the Skill is run against `/task/list/all`
- THEN the output matches V3.3's 12 evidence records (4 route snapshots, 4 component discoveries, 3 interaction traces, 1 evidence index)

#### Scenario: Evolution Maintainer Validated

- GIVEN `skill-evolution-maintainer` v1 is implemented
- WHEN the Skill is run with KE-001 as the candidate
- THEN the output matches V3.4's acceptance decision (accept, KE-001)
