# Superpower Mission Catalog

Status: V1.3 baseline

## Purpose

Define the mission types that Superpower may assign or authorize inside the V1 governance model.

## Mission Types

### Mission 1: Brainstorm

Purpose:

- explore solution directions before a change is treated as implementation work

Allowed outputs:

- alternatives
- tradeoff analysis
- risk list
- recommendation
- explicit unknowns

Forbidden claims:

- that a design is approved
- that a change is accepted
- that runtime behavior is verified

### Mission 2: Baseline Design

Purpose:

- convert accepted direction into versioned design or governance baselines

Allowed outputs:

- design documents
- contracts
- maps
- usage rules

Required constraints:

- must cite controlling version scope
- must stay inside declared allowed files

### Mission 3: Bounded Implementation

Purpose:

- execute a clearly scoped work packet under dispatch control

Allowed outputs:

- file changes inside the dispatch boundary
- validation results
- implementation report

Required constraints:

- no boundary expansion without escalation
- no silent scope substitution
- if executed in subagent mode, the dispatch must declare the delegated role and commit whether review/commit are in scope

### Mission 4: Independent Review

Purpose:

- assess whether a design or implementation output satisfies its declared scope

Allowed outputs:

- findings
- pass/fail disposition recommendation
- unresolved risks

Required constraints:

- reviewer must evaluate the delivered output, not restate the author's intent
- missing evidence must be reported as a gap
- reviewer should be role-separated from the implementing subagent when subagent mode is used

### Mission 5: Closure Verification

Purpose:

- confirm that review and disposition outputs remain reflected in the final closed artifact set

Allowed outputs:

- closure verification record
- traceability summary
- residual-gap statement

Required constraints:

- closure cannot fabricate missing acceptance
- closure cannot erase unresolved blocked items
