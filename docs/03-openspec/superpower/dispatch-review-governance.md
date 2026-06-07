# Dispatch and Review Governance

Status: V1.3 baseline

## Purpose

Define how Superpower dispatches bounded work and how that work must be reviewed, dispositioned, and closed.

## Required Dispatch Packet

Every governed execution packet must include:

- execution mode
- schema name
- governance layer
- target version or change identifier
- target stage
- mission type
- allowed files
- forbidden files
- required reads
- required validation commands
- required evidence or report outputs
- final report format

## Dispatch Rules

- subagent execution is the default when `execution_mode` is not explicitly set
- `execution_mode=local` requires explicit user choice or explicit repository-approved override
- `schema: superspec` must be explicit for formal repository work
- `governance: superpower` must be explicit for code-bearing dispatches
- the dispatch packet must be concrete enough that a reviewer can detect scope drift
- missing required reads are a governance defect
- forbidden files override convenience or speed concerns
- any needed scope expansion must be escalated before edits occur

## Review Rules

- review must evaluate the delivered output against the declared mission and boundaries
- review must distinguish findings, assumptions, and non-findings
- absence of evidence is a finding when the mission required evidence
- if the work used subagent mode, review must explicitly verify that implementation and independent review were not collapsed into one unverified role

## Disposition Rules

- disposition must resolve each review finding as accepted, corrected, deferred, or blocked
- disposition may pass with no findings only if the review explicitly reported none

## Closure Rules

- closure verification must confirm that the disposition outcome matches the artifact state
- closure verification cannot stand in for user acceptance
- the next gate may open only when the required review, disposition, and closure artifacts all exist and are coherent

## V1.3 Boundary

For V1.3, dispatch and review governance are document-layer controls only. They do not authorize business/runtime code work and do not replace V1.4 integration verification.

## Execution Mode Note

See [execution-modes.md](./execution-modes.md) for the repository rule that subagent execution is the default and local execution is optional but governed.
