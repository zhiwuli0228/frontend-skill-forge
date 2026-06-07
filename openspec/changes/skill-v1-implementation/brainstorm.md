# Brainstorm: V4 Skill v1 Implementation

Status: Complete

## Context

V3 produced the project's first operational evidence loop: 5 knowledge maps, e2e asset registry, 12 evidence records, 1 failure-diagnosis, and 9 evolution candidates (knowledge + rule). These artifacts are the **validation set** for V4.

V4 converts the 4 skeleton Skills from stubs to usable v1 procedures. Each Skill is a procedural document that tells an agent **how to do something** — not a code module, not a test, but a step-by-step procedure backed by the V3 evidence.

## V4 Goal

Convert 4 skeleton Skills to v1:

1. **frontend-project-reader** — How to read and model a frontend codebase
2. **frontend-incremental-coder** — How to make bounded frontend changes
3. **frontend-e2e-explorer** — How to explore UI and create evidence-backed E2E assets
4. **skill-evolution-maintainer** — How to evolve Skill / Rule / Knowledge safely

Each v1 Skill must:
- Be a complete, step-by-step procedure (not a stub)
- Reference the V3 evidence as validation examples
- Include concrete inputs/outputs per the blueprint §12
- Be testable: running the Skill against the V2 surface should produce outputs matching V3's artifacts

## Validation Strategy

For each Skill, I will:
1. Write the v1 procedure
2. Run it against the V2 surface (using V3 evidence as the input)
3. Compare the outputs to V3's artifacts
4. Record the validation in the evidence-to-skill-promotion file

## Non-Goals for V4

- New runtime features (V5 territory)
- Real MCP browser tool integration (Phase 6 territory — V4 uses V3's derived evidence)
- New e2e tests for the Skills themselves (Skills are docs, not code)
- Modifying the V2 surface

## Minor-Version Plan

| Minor | Goal | Output |
| --- | --- | --- |
| V4.1 | frontend-project-reader v1 | 1 Skill doc + validation against V3 knowledge maps |
| V4.2 | frontend-incremental-coder v1 | 1 Skill doc + validation against V3 failure-diagnosis |
| V4.3 | frontend-e2e-explorer v1 | 1 Skill doc + validation against V3 MCP session |
| V4.4 | skill-evolution-maintainer v1 | 1 Skill doc + validation against V3 evolution queues |
| V4.5 | V4 Aggregate Closure | V4 governance artifacts |

## Exit Gate

V4 closes when:
1. All 4 Skills have v1 procedures (not stubs)
2. Each Skill has been validated against V3 evidence
3. The evidence-to-skill-promotion file has 4 accepted promotions
4. `npm run lint`, `npm run build`, `npm run test:e2e` all pass (183/184, unchanged)
5. V4 governance artifacts complete
