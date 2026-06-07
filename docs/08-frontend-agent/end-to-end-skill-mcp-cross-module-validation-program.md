# End-to-End Skill + MCP + Cross-Module Validation Program

Last Updated: 2026-06-07
Status: Active
Priority: High

## Purpose

Define the benchmark-grade validation program for the next phase of this project:

- real Skill-driven execution
- MCP-first page exploration
- cross-module frontend modification
- skill self-evolution based on verified runtime evidence

This program exists because local Playwright-driven validation is no longer enough.
It proved that the engineering loop works, but it did not yet prove that the full
`Skill + MCP + governed context + evolution` loop works under realistic agent constraints.

## What This Program Must Prove

The program should collect evidence strong enough to answer all of the following:

1. Can an agent complete frontend work by following Skills rather than free-form repository access?
2. Can MCP-first exploration produce usable evidence before code changes begin?
3. Can an agent complete a cross-module change without uncontrolled context growth?
4. Can runtime anomalies be promoted into justified evolution candidates rather than one-off notes?
5. Can the same task be reproduced with artifact-backed evidence that is suitable for article publication?

## Validation Scope

Every benchmark-grade end-to-end run in this phase must include all four layers:

1. Skill execution layer
2. MCP exploration layer
3. Cross-module change layer
4. Self-evolution evidence layer

If any layer is missing, the run is incomplete for this program.

## Core Contract

The execution order is:

```text
Skill-only planning
→ MCP-first route exploration
→ bounded cross-module change
→ runtime validation
→ anomaly capture
→ evolution candidate extraction
→ governed run conclusion
```

This order is mandatory unless a blocking environmental issue prevents one step.

## Required Run Types

The program requires at least these run types:

### 1. Skill-Only Readiness Run

Goal:

- verify that the assigned Skill can guide the target task without free-form repository scanning

Minimum evidence:

- initial context list
- what was deliberately not loaded
- any context escalation
- success or blockage result

### 2. MCP-First Exploration Run

Goal:

- prove that page understanding starts from MCP/browser interaction, not code-first reasoning

Minimum evidence:

- MCP session record
- before/after screenshots or equivalent snapshots
- selector notes
- runtime console observations

### 3. Cross-Module Change Run

Goal:

- prove that the agent can safely implement a bounded change spanning more than one module

Minimum evidence:

- affected route list
- affected component list
- changed files
- justification for crossing module boundaries
- build and runtime verification

### 4. Self-Evolution Extraction Run

Goal:

- turn verified anomalies or repeated friction into queue-ready evolution candidates

Minimum evidence:

- anomaly ID
- repeated pattern
- evidence references
- candidate target:
  - Skill
  - rule
  - knowledge
- acceptance status:
  - pending
  - accepted
  - rejected
  - deferred

## Minimum End-to-End Artifact Set

Each run under this program must produce:

1. `manifest.md`
2. one task-level validation report
3. one MCP session or MCP evidence record
4. at least 2 screenshots
5. one trace or HTML report
6. raw logs
7. one self-evolution observation record
8. links to any queue updates caused by the run

## Context Governance Requirements

This program is subordinate to `context-governance-contract.md`.

Each run must explicitly record:

1. initial minimal context
2. first escalation trigger
3. whether escalation stayed bounded
4. compression strategy before the next phase

Cross-module work is not an excuse to bulk-load all maps, all Skills, and all historical runs.

## MCP-First Rule

For this program, page understanding must start from MCP-first exploration whenever MCP is available.

Allowed fallback:

- if MCP is unavailable, blocked, or insufficient, the run may fall back to Playwright spec execution

Required behavior when falling back:

- explicitly record why MCP was not used or was insufficient
- mark the fallback in the manifest

## Cross-Module Modification Rule

A valid cross-module run must:

1. identify the source module
2. identify the destination module
3. identify any shared routing or shell touchpoints
4. justify why the change is still bounded
5. verify that the change did not create uncontrolled coupling

## Self-Evolution Rule

A runtime anomaly becomes an evolution candidate only if:

1. it is real
2. it is captured in artifacts
3. it has a plausible root cause
4. it points to a reusable improvement in Skill, rule, or knowledge

Single-run anomalies may be recorded, but should be promoted cautiously.

## Run Output Structure

Use this structure for each program run:

```text
artifacts/validation/runs/<run-id>/
├── manifest.md
├── task-report.md
├── mcp-session.md
├── self-evolution-observations.md
└── change-evidence.md
```

The sibling raw artifact folders remain:

- `artifacts/validation/screenshots/`
- `artifacts/validation/playwright-html/`
- `artifacts/validation/traces/`
- `artifacts/validation/json/`
- `artifacts/validation/raw-logs/`

## Run Acceptance Criteria

A run is considered complete only if:

- the task was actually executed
- runtime evidence exists
- the cross-module scope is explicit
- context behavior is recorded
- a self-evolution conclusion exists, even if it is:
  - no candidate created

## Program-Level Exit Criteria

This phase is considered sufficiently evidenced when the repository has:

1. at least 3 complete end-to-end runs
2. at least 2 MCP-first runs
3. at least 2 cross-module change runs
4. at least 2 self-evolution candidates derived from runtime evidence
5. at least 1 accepted and verified Skill evolution decision

## Relationship to Other Docs

- Use with `ui-validation-evidence-contract.md`
- Use with `playwright-mcp-policy.md`
- Use with `context-governance-contract.md`
- Use with `docs/08-frontend-agent/evolution/`
- Raw outputs live under `artifacts/validation/`
