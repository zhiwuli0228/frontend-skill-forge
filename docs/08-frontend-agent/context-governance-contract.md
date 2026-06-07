# Context Governance Contract

Last Updated: 2026-06-07
Status: Active
Priority: High

## Purpose

Prevent context explosion during agent execution in this benchmark project.

This contract exists because the repository now has enough Skills, maps, evidence,
and validation records that naive "load everything first" behavior is no longer
safe or efficient.

## Core Rule

Agents must load the minimum context required to complete the current step.

Do not treat:

- all maps
- all Skills
- all evidence
- all validation records

as default input.

## Context Loading Order

Use this order unless a task explicitly requires broader context:

```text
1. current task target
2. route/component map entries for that target
3. one relevant Skill
4. one relevant validation/evidence record
5. broader project maps only if blocked
6. historical runs only if diagnosing drift or repeated failures
```

## Hard Constraints

### 1. No Bulk Knowledge Loading by Default

Do not load all frontend knowledge maps at once unless the task is explicitly:

- project onboarding
- architecture audit
- cross-module planning
- map freshness audit

For route-level work, load only:

- `route-map.md`
- `component-map.md`
- one route-specific evidence or validation record if available

### 2. One Primary Skill Per Step

At execution time, prefer one primary Skill per step:

- understanding step → `frontend-project-reader`
- bounded code change step → `frontend-incremental-coder`
- runtime exploration step → `frontend-e2e-explorer`

Do not fully load all three Skills unless the task genuinely spans all three phases.

### 3. Evidence Must Be Sampled, Not Exhaustively Loaded

When checking evidence:

- start with the relevant route-level evidence index or latest validation record
- only open deeper evidence files when a gap or contradiction appears

Do not read every route snapshot, interaction trace, and MCP session for the same page unless investigating drift.

### 4. Historical Runs Are Tertiary Context

Previous validation runs are important, but they are not default context.

Load old runs only when you need:

- before/after comparison
- anomaly history
- self-evolution evidence
- regression proof

### 5. Treat Context Growth as a First-Class Risk

If a task starts requiring:

- multiple large maps
- multiple long Skills
- multiple historical runs
- multiple route evidence sets

the agent must explicitly state that context breadth is increasing and why.

## Route-Level Minimal Context Set

For a single-route UI validation task, the default context set should be:

1. target route
2. relevant `route-map.md` entry
3. relevant `component-map.md` entry
4. one primary runtime validation/evidence record
5. one execution Skill

This should be enough for most validation work in this repo.

## Change-Level Minimal Context Set

For a small bounded code change, the default context set should be:

1. change request
2. one primary Skill: `frontend-incremental-coder`
3. target route/component map entries
4. target source files
5. one latest validation record if the page has recent UI evidence

## Context Escalation Triggers

Expand context only when one of these is true:

1. route and component maps disagree
2. runtime behavior contradicts documentation
3. the page touches multiple modules
4. there is repeated selector drift
5. a previous validation record shows unresolved anomalies

## Context Compression Rules

Before moving from one phase to the next, compress context:

- summarize findings instead of carrying raw documents forward
- carry only the target route/component identifiers, anomalies, and evidence paths
- avoid reloading large docs if a stable summary already exists

## Audit Baseline

The current repository already contains several context-heavy assets above ~8k characters,
including:

- `component-map.md`
- `api-contract-map.md`
- `frontend-incremental-coder/SKILL.md`
- `frontend-e2e-explorer/SKILL.md`
- `route-map.md`
- `skill-and-map-feasibility-validation-plan.md`

This confirms that explicit context control is now required.

## Required Agent Behavior

When performing substantial work, the agent should say:

1. what minimal context it is loading first
2. what it is deliberately not loading yet
3. why it is escalating context if escalation becomes necessary

## Relationship to Other Docs

- Use with `ui-validation-evidence-contract.md`
- Use with `skill-and-map-feasibility-validation-plan.md`
- Use with the three frontend Skills under `docs/02-harness/skills/`
