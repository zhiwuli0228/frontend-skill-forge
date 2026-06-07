# V2 IR-SR Planning and Delivery Thinning Summary

Status: Recorded

Date: 2026-06-07

## Purpose

Record the V2 exploration that redefined the planning boundary and delivery
shape without changing the underlying gate model.

## What Changed

- `IR` and `SR` were reclassified as one upstream planning bundle.
- The downstream spec or change execution was moved to the stage after SR is
  accepted.
- Handoff and progress messages were thinned down to the minimum useful status
  payload.
- The end-to-end gate chain remained unchanged:
  implementation, review, disposition, closure, verification, acceptance
  precheck, and release still apply.

## Why This Matters

- It reduces churn between intent-setting and executable baseline work.
- It lowers the cognitive load of subagent handoff.
- It makes it easier to read a handoff without losing the actual gate model.
- It separates planning clarity from execution completeness.

## Evidence of the Exploration

- The process rules now explicitly say that IR and SR are an upstream bundle.
- The handoff templates now favor canonical links and next-gate focus.
- The architecture blueprint handoff contract now uses a shorter, more direct
  payload.
- The decision ledger records the planning-bundle and thin-delivery decisions.

## Lessons Learned

1. The workflow can stay rigorous even when the delivery payload gets thinner.
2. The place to preserve detail is the canonical artifact chain, not every
   status update.
3. A planning bundle boundary makes downstream implementation packets more
   stable.
4. Excessive handoff detail creates noise without adding decision quality.

## Recommended Future Use

- Use the IR/SR bundle for all new work that needs a clearly accepted planning
  baseline.
- Keep the downstream implementation packet short and artifact-linked.
- Continue to enforce the full post-implementation gate chain before saying a
  change is complete.
