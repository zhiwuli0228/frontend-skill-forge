# V2 Baseline

Status: In Progress

## Purpose

Capture the first code-bearing frontend validation baseline built on top of the accepted V1 control plane.

## Main Outputs

| Type | File |
| --- | --- |
| V2 IR | [IR.md](./IR.md) |
| V2 SR | [SR.md](./SR.md) |
| Design baseline 001 | [DESIGN-001-complex-frontend-validation-surfaces.md](./DESIGN-001-complex-frontend-validation-surfaces.md) |
| V2 iteration plan | [V2-ITERATION-PLAN.md](./V2-ITERATION-PLAN.md) |
| V2.1 gate contract | [V2.1-GATE-CONTRACT.md](./V2.1-GATE-CONTRACT.md) |
| V2.1 dispatch contract | [V2.1-DISPATCH-CONTRACT.md](./V2.1-DISPATCH-CONTRACT.md) |
| V2.1 IR review | [V2.1-IR-REVIEW.md](./V2.1-IR-REVIEW.md) |
| V2.1 IR disposition | [V2.1-IR-DISPOSITION.md](./V2.1-IR-DISPOSITION.md) |
| V2.1 IR closure | [V2.1-IR-CLOSURE.md](./V2.1-IR-CLOSURE.md) |
| V2.1 SR review | [V2.1-SR-REVIEW.md](./V2.1-SR-REVIEW.md) |
| V2.1 SR disposition | [V2.1-SR-DISPOSITION.md](./V2.1-SR-DISPOSITION.md) |
| V2.1 SR closure | [V2.1-SR-CLOSURE.md](./V2.1-SR-CLOSURE.md) |
| V2.1 design review | [V2.1-DESIGN-REVIEW.md](./V2.1-DESIGN-REVIEW.md) |
| V2.1 design disposition | [V2.1-DESIGN-DISPOSITION.md](./V2.1-DESIGN-DISPOSITION.md) |
| V2.1 design closure | [V2.1-DESIGN-CLOSURE.md](./V2.1-DESIGN-CLOSURE.md) |
| V2.1 acceptance precheck | [V2.1-ACCEPTANCE-PRECHECK.md](./V2.1-ACCEPTANCE-PRECHECK.md) |
| V2.1 acceptance precheck verification | [V2.1-ACCEPTANCE-PRECHECK-VERIFICATION.md](./V2.1-ACCEPTANCE-PRECHECK-VERIFICATION.md) |
| V2.1 user acceptance | [V2.1-USER-ACCEPTANCE.md](./V2.1-USER-ACCEPTANCE.md) |
| V2.2 dashboard design | [V2.2-DASHBOARD-RUNTIME-DESIGN.md](./V2.2-DASHBOARD-RUNTIME-DESIGN.md) |
| V2.2 gate contract | [V2.2-GATE-CONTRACT.md](./V2.2-GATE-CONTRACT.md) |
| V2.2 dispatch contract | [V2.2-DISPATCH-CONTRACT.md](./V2.2-DISPATCH-CONTRACT.md) |

## Scope

V2 is the first version that must deliver real frontend implementation complexity rather than governance-only baselines. It must:

- replace placeholder pages with complex runtime surfaces
- create realistic UI states for later evidence and E2E work
- preserve the V1 governance model while entering code-bearing execution
- remain backend-free and experiment-oriented

## Current Status

- V1 is closed and accepted.
- V2.1 is closed and accepted as the version-design and runtime-surface architecture iteration.
- V2.2 is closed and accepted as the dashboard runtime baseline iteration.
- V2.3 is closed and accepted as the task-list runtime baseline iteration.
- Runtime code is allowed in V2, but it must remain bounded by V2 contracts and verification rules.
- V2.4 is active as the task-create runtime baseline iteration.
