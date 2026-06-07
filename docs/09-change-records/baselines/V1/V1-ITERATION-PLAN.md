# V1 Iteration Plan

Status: In Progress

Version: V1-plan.1

Date: 2026-06-07

## Purpose

Define the minor-version plan for V1. V1 is the major version for building the OpenSpec + SuperSpec + Superpower collaboration framework. It will be delivered through multiple gated minor versions.

## Major Goal

V1 must produce a usable collaboration framework in which:

- OpenSpec controls change management
- SuperSpec controls project workflow
- Superpower controls brainstorm and agent execution governance

V1 is not complete until the user accepts the full major-version result.

## Minor-Version Strategy

### V1.1 Governance Runtime Foundation

Goal:

- define and stabilize the governance runtime boundaries

Required outputs:

- refined V1 IR
- refined V1 SR
- governance design baseline
- gate contract
- dispatch contract

Exit gate:

- user accepts that the V1 governance foundation is clear enough to start schema and governance implementation

### V1.2 SuperSpec Schema Baseline and Activation Contract

Goal:

- create the project-local `superspec` static schema assets, activation contract, and usage rules without business-code changes

Required outputs:

- schema design baseline
- schema activation contract
- schema artifact map
- `openspec/schemas/superspec/schema.yaml`
- schema templates
- schema workflow reference
- `docs/03-openspec/superspec-usage.md`
- schema readiness evidence

Exit gate:

- user accepts that the repository has a complete SuperSpec baseline, including static schema assets, without reopening V1.1 governance questions

### V1.3 Superpower Governance Activation

Goal:

- implement the Superpower brainstorm and agent-governance layer

Required outputs:

- `docs/03-openspec/superpower/README.md`
- mission definitions
- power definitions
- brainstorm usage rules
- agent dispatch and review governance

Exit gate:

- user accepts that brainstorm and agent execution are now governed rather than ad hoc

### V1.4 Integration and Gate Verification

Goal:

- verify that OpenSpec, SuperSpec, and Superpower work together under the V1 gate model

Required outputs:

- integrated walkthrough or dry-run record
- traceability from requirement to gate artifacts
- acceptance precheck record for V1
- blocked-item list if any gap remains

Exit gate:

- user accepts that the full collaboration framework is operational at V1 scope

## Sequencing Rule

- V1.2 must not start before V1.1 is accepted.
- V1.3 must not start before V1.2 is accepted.
- V1.4 must not start before V1.3 is accepted.
- Progress inside a minor version may continue through review, disposition, and closure gates, but the next minor version still requires user acceptance.

## Major-Version Closure Rule

V1 may close only when:

- all intended minor versions are either accepted or explicitly deferred by user decision
- the V1 aggregate summary exists
- the V1 release record exists
- the user explicitly accepts V1 as complete

## Recommended Next Minor Version

Current active minor version: `V1.4 Integration and Gate Verification`.

Reason:

- V1.3 has been accepted
- V1 still operates under a no-code constraint
- the next control-plane gap is proving that OpenSpec, SuperSpec, and Superpower now work together under the V1 gate model
