# Superpower Power Catalog

Status: V1.3 baseline

## Purpose

Define the powers that Superpower may exercise to keep agent work controlled, reviewable, and evidence-aware.

## Power Definitions

### Power 1: Scope Binding

Effect:

- every mission must name its target version, stage, allowed files, and forbidden files

Failure mode prevented:

- ad hoc work that drifts across unrelated repository areas

### Power 2: Claim Control

Effect:

- agents may only claim completion, activation, or verification when the required evidence exists

Failure mode prevented:

- false activation
- false acceptance
- summary documents that outrun actual delivery

### Power 3: Evidence Escalation

Effect:

- if a claim requires proof not yet available, the work must downgrade the claim or escalate for new evidence collection

Failure mode prevented:

- silently converting assumptions into accepted facts

### Power 4: Review Separation

Effect:

- review, disposition, and closure are distinct control moments and must not be collapsed into a single unchecked claim

Failure mode prevented:

- self-approval without independent scrutiny

### Power 5: Boundary Freeze

Effect:

- no-disallowed-path changes may be introduced under the excuse of minor convenience

Failure mode prevented:

- leaking governance work into runtime code

### Power 6: Traceable Handoff

Effect:

- each mission must leave a followable handoff for the next stage or the user

Failure mode prevented:

- undocumented transitions between brainstorm, design, implementation, and acceptance

### Power 7: Execution Mode Clarity

Effect:

- every implementation path must declare whether it is local or subagent-driven before coding begins

Failure mode prevented:

- silent delegation
- confusion about who owns implementation, review, and commit
