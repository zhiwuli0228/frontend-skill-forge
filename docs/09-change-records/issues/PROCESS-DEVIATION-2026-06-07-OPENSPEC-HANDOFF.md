# Process Deviation: OpenSpec Handoff Misexecution

Status: Recorded

Date: 2026-06-07

## Problem

The requested workflow was:

1. produce the complete formal spec/change flow
2. stop at the `apply` handoff
3. let another agent continue implementation

That request was not followed initially. Work was first expanded into version-ledger design/baseline documents instead of immediately creating a formal change under `openspec/changes/` and stopping at `apply-ready`.

## Root Cause

- I over-weighted the active version-ledger context and treated the request as an extension of version design.
- I did not enforce a hard priority rule that an explicit "stop at apply" request overrides the default urge to continue implementation-oriented design in repository docs.
- I did not immediately validate the actual schema `apply` entry condition before producing handoff-oriented guidance.

## Impact

- unnecessary extra design churn before the formal change existed
- a misleading handoff state that was not actually `apply-ready`
- additional correction work to move the request back onto the intended OpenSpec path

## Correction Applied

- created the formal change `implement-dashboard-runtime-baseline`
- generated change-local artifacts through `tasks.md`
- corrected the schema `apply.requires` setting so the change can actually become `apply-ready`
- verified that `openspec instructions apply --change implement-dashboard-runtime-baseline --json` now reports `state: "ready"`

## Prevention Rule

When the user explicitly asks for a formal spec/change flow and says to stop at `apply`, the producing agent must:

1. create or continue a change under `openspec/changes/<change>/`
2. generate artifacts in schema order
3. verify `apply` readiness with the CLI
4. stop before implementation
5. hand off the change name and context files only after readiness is confirmed
