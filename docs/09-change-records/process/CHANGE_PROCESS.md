# Frontend Skill Forge Version Process

Last Updated: 2026-06-06

This document defines the version-management workflow for this repository. It follows the `dv-entity-linking` pattern: keep a small set of authoritative documents in HEAD, preserve main outputs by version, and enforce hard stage gates before any version can move forward.

This repository uses a two-level version model:

- major versions represent large requirement or architecture phases
- minor versions represent gated iterations under a major version

## Stage Flow

```text
version intake
  -> IR / change intent
  -> IR independent review
  -> IR disposition
  -> IR closure verification
  -> SR / design baseline
  -> SR independent review
  -> SR disposition
  -> SR closure verification
  -> implementation
  -> implementation review
  -> implementation disposition
  -> implementation closure verification
  -> verification and evidence
  -> acceptance precheck
  -> acceptance precheck verification
  -> release closure or blocked release record
```

## Required Outputs

| Stage | Output Location |
| --- | --- |
| Current status | `docs/09-change-records/PROJECT.md` |
| User decisions | `docs/09-change-records/current/DECISIONS.md` |
| Version baselines | `docs/09-change-records/baselines/Vx/` |
| Version conclusion | `docs/09-change-records/releases/Vx.md` |
| Verification evidence | `docs/07-evidence/` |
| Frontend-specific evidence | `docs/08-frontend-agent/evidence/` |
| Review, disposition, closure outputs | versioned under `docs/09-change-records/baselines/Vx/` unless archived into the release record |

## Governance Rules

- Keep current state in `PROJECT.md` only.
- Keep user-confirmed direction changes in `current/DECISIONS.md` only.
- Preserve only main version outputs in `baselines/Vx/`.
- Preserve only one release summary per version in `releases/Vx.md`.
- Do not keep temporary review scratch files as permanent docs when the outcome has already been absorbed into a baseline or release record.
- User-confirmed important requirements must be traceable through `IR -> SR -> implementation -> tests -> acceptance items`.
- Silent downgrade is forbidden. If a confirmed requirement is weakened, deferred, or reinterpreted, the change must be explicitly recorded in `current/DECISIONS.md`.
- A stage may not claim completion merely because a baseline document exists; it must pass its required review, disposition, and closure gate.
- A major version may not advance to the next major version without explicit user acceptance.
- A major version may contain multiple minor versions or gated sub-iterations.
- A major version must end with an aggregate summary before closure.

## Version Hierarchy

- Major version: a large bounded goal such as `V1`
- Minor version: a scoped gated iteration under that major version, such as `V1.1`, `V1.2`, or named sub-baselines

Minor versions may continue under the same major version until the user accepts that the major version goals have been met.

## Gate Model

Each major stage has four distinct states:

1. main output created
2. independent review completed
3. disposition completed
4. closure verification completed

A later stage may not start until the earlier stage has cleared its closure verification gate, unless a recorded decision explicitly allows the exception.

## IR/SR Pairing Rule

For this repository, IR and SR are treated as one planning bundle:

- IR captures intent, boundaries, and the first risk framing
- SR consumes the approved IR and turns it into a concrete, reviewable baseline
- the pair is the upstream planning package for a change
- the downstream implementation/spec change should start only after SR has been accepted or explicitly released into the next stage

In practical terms, the working sequence is:

1. IR
2. IR review / disposition / closure
3. SR based on the accepted IR
4. SR review / disposition / closure
5. downstream spec/change execution

This reduces handoff churn and keeps the planning story in one place, while
preserving the full gate model after SR.

## OpenSpec Change-Flow Rule

When the user explicitly requests a complete spec/change flow or asks that work stop at the `apply` handoff:

- the agent must create or continue a formal change under `openspec/changes/<change>/`
- the agent must generate the required change artifacts in schema order
- the agent must stop before implementation work begins
- the agent must hand off the change only after `openspec instructions apply --change <name> --json` reports `state: "ready"`

In that situation, version-ledger or baseline documents may provide context, but they must not replace the formal change-flow artifacts.

## Workflow Naming Rule

For this repository, the formal execution contract must be named explicitly:

- `schema: superspec`
- `governance: superpower`

The generic `spec-driven` label is only an umbrella term from the upstream toolchain. It is not sufficient as the repository's dispatch label, handoff label, or implementation claim.

## Execution Mode Rule

For code-bearing work, the repository supports two execution modes:

- `subagent`: default mode, current working branch, governed delegated execution
- `local`: optional mode, enabled only when explicitly chosen by the user

If subagent mode is used:

- the dispatch packet must say so explicitly
- the target branch must be explicit
- the dispatch packet must also name `schema: superspec` and `governance: superpower`
- implementation, verification, review, disposition, and closure still all apply
- commit execution is allowed only after those gates are satisfied

If local mode is selected:

- the dispatch packet must override the default explicitly
- the same implementation, verification, review, disposition, and closure gates still apply

Subagent mode changes who performs the work. It does not relax the workflow.

## Subagent End-To-End Rule

When subagent mode is used for code-bearing work, the delegated path must continue beyond `apply-ready` and produce the downstream artifact chain unless blocked:

- implementation
- implementation review
- implementation disposition
- implementation closure
- verify
- verify review
- verify disposition
- verify closure
- acceptance precheck
- release

Stopping at `tasks.md` or `apply-ready` is only acceptable for a handoff that explicitly says the next agent will continue the remaining stages. It is not a completion state.

## Change Completion Rule

An OpenSpec change may be described as complete only when all of the following
are true:

- `implementation.md` exists and is complete
- `implementation-review.md` exists and is complete
- `implementation-disposition.md` exists and is complete
- `implementation-closure.md` exists and is complete
- `verify.md` exists and is complete
- `verify-review.md` exists and is complete
- `verify-disposition.md` exists and is complete
- `verify-closure.md` exists and is complete
- `acceptance-precheck.md` exists and is complete
- `release.md` exists and records the final state
- the change status reports `isComplete: true`

If acceptance from the user is still missing, the release record must say
`Blocked`, and the work may only be described as implementation-complete or
verification-complete, not fully released.

## Completion Verification Rule

Before stating that a change is done, the agent must inspect the live change
status with `openspec status --change <name> --json` and confirm that the
artifact chain matches the claimed state.

If the artifact chain is incomplete, the response must say so directly and
identify the next missing gate. The agent must not infer completion from code
changes alone, from `tasks.md` alone, or from `apply-ready` alone.

## Delivery Thinning Rule

The workflow does not change, but the delivery payload should stay minimal.

- Keep agent-facing status reports short and evidence-linked.
- Prefer links to canonical artifacts over repeated narrative summaries.
- For normal handoffs, report only: current stage, completed artifacts, next
  gate, blockers, and evidence links.
- Do not restate the full downstream artifact chain unless the handoff is
  specifically about an incomplete lifecycle transition.
- Detailed rationale belongs in the artifact files, not in every progress
  message.

This rule weakens the communication burden, not the gate model.

## Major Version Acceptance Rule

The following actions require explicit user acceptance:

- closing a major version
- moving from one major version to the next
- declaring a major version accepted

Passing automation, review, and evidence gates is necessary but not sufficient. User acceptance is the final gate for major-version progression.

## Major Version Summary Rule

Before a major version is closed, the project must produce a major-version summary that includes:

- all minor versions completed under the major version
- main baseline outputs
- review and closure results
- evidence and validation summary
- blocked, deferred, or downgraded items
- final user acceptance conclusion

## Major Version Retrospective Rule

When a major version closes, the project should also capture:

- a concise aggregate summary under `docs/09-change-records/summaries/`
- the main development problems or friction points under `docs/09-change-records/issues/`
- the main process improvements, optimizations, and lessons learned under `docs/09-change-records/optimizations/`

These documents are not replacements for the release record. They exist to preserve operational learning that should influence the next major version.

## Review Input Rules

Implementation review and test review inputs must include:

- current decision ledger
- relevant IR and SR outputs
- all user-confirmed P0, P1, and P2 requirements in scope
- changed file list or implementation scope
- test mapping or acceptance mapping

Reviewers must explicitly classify each important item as:

- implemented
- not implemented
- downgraded
- needs user confirmation

## Acceptance Precheck Rules

Before a release record may claim acceptance candidate or closure readiness:

- the project must perform a reverse traceability check from confirmed user requirements back into implementation and acceptance items
- blocked items must remain blocked in the release record
- residual risk must not be used to silently pass a user-marked important requirement

If any confirmed requirement is missing from implementation or acceptance coverage, the version state must be `blocked`, not `ready`.

## Release Gates

Before a version can be marked accepted or closed:

- The relevant baseline outputs exist under `baselines/Vx/`.
- IR and SR closure verification have completed.
- implementation and test closure verification have completed where applicable.
- Verification results exist under `docs/07-evidence/`.
- Key user decisions are reflected in `current/DECISIONS.md`.
- Any blocked or downgraded requirement is explicitly recorded.
- acceptance precheck and any required precheck verification have completed.
- A single release summary exists in `releases/Vx.md`.
- explicit user acceptance exists for major-version closure.

## Blocked Version Rule

If a version is not ready for closure, it still gets a `releases/Vx.md` record. That record must state:

- why the version is blocked
- what evidence exists
- what remains open
- what the next gate is

If the blocked item belongs to a major version, the record must also state whether it blocks only the next minor version or blocks the entire major version from progressing.
