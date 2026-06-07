# V2 End-to-End Closure Gap

Status: Recorded

Date: 2026-06-07

## Issue

The `implement-task-create-runtime-baseline` change reached implementation and
verification success, but the post-implementation chain was not treated as part
of the completion definition during the first pass.

As a result, the work was described as complete before the following artifacts
were in place:

- implementation review
- implementation disposition
- implementation closure
- verify review
- verify disposition
- verify closure
- acceptance precheck
- release

## Impact

- The user saw a false impression that the change might be finished when it was
  only implementation-complete.
- The subagent workflow appeared to terminate too early.
- The release gate remained ambiguous until the missing artifacts were added.

## Root Cause

- The change workflow allowed `tasks.md` and `verify.md` to be read as practical
  end states.
- The handoff template did not force the post-implementation artifact chain to
  remain visible as required work.
- The completion definition was not explicit enough in the process docs during
  the first pass.

## Resolution

- Added a hard completion rule to `docs/09-change-records/process/CHANGE_PROCESS.md`
  that requires the full downstream artifact chain before a change may be
  described as complete.
- Added a completion check to the subagent handoff template.
- Added explicit "apply-ready is not completion" language to the apply handoff
  template.

## Follow-up

Future changes must not be called done until `openspec status --change <name>
--json` confirms the expected final state and the post-implementation artifacts
exist.
