# DESIGN-001: OpenSpec + SuperSpec + Superpower Governance Integration

Status: Proposed V1 design baseline

Version: V1-DESIGN-001

Date: 2026-06-06

## 1. Purpose

Define the first complete governance design for this repository. This design determines how change management, design flow, brainstorm, and agent execution management work together before V1 implementation begins.

## 2. Design Conclusion

The target model is feasible, but it is not currently active in this repository.

It can be made real with this role split:

- `OpenSpec` manages change lifecycle and artifact creation.
- `SuperSpec` defines the project-local workflow schema used by OpenSpec.
- `Superpower` defines brainstorm behavior, mission structure, agent dispatch, and execution governance.

Current gap summary:

- `OpenSpec` CLI is installed and usable.
- Only the built-in `spec-driven` schema is currently available in the local CLI installation.
- This repository does not yet contain a real project-local `superspec` schema implementation.
- This repository does not yet contain executable `superpower` missions, powers, or skills.

## 3. Problem Statement

The repository currently has:

- an OpenSpec skeleton
- a configured default schema name of `superspec`
- placeholder documentation for OpenSpec, SuperSpec, and Superpower

The repository does not yet have:

- a working schema behind the `superspec` name
- a defined brainstorm workflow
- a defined multi-agent execution governance layer
- a versioned design baseline that other agents can execute against

Without a concrete design, later agents will mix planning, brainstorming, implementation, and verification in inconsistent ways.

Without explicit gate artifacts, the repository could also fall into a weaker failure mode: stage outputs would exist on disk, but later work would still bypass independent review, disposition, closure verification, or acceptance-precheck traceability.

## 4. Goals

This design must achieve:

1. Keep change management on official OpenSpec commands and artifact layout.
2. Move project process control into a project-local `superspec` workflow schema.
3. Reserve brainstorm for `superpower` skills rather than general implementation flow.
4. Define how execution agents are dispatched, bounded, and reviewed.
5. Keep everything versioned under the repository ledger introduced in `docs/09-change-records/`.
6. Enforce gate progression rather than document presence alone.

## 5. Non-Goals

This design does not:

- implement the `superspec` schema itself
- implement `superpower` skills
- create the first product-facing frontend pages
- replace OpenSpec core CLI behavior

## 6. Target Capability Split

### 6.1 OpenSpec

OpenSpec owns:

- change creation
- artifact generation
- artifact validation
- artifact status tracking
- archive workflow

Required commands:

- `openspec list`
- `openspec new` or slash-command equivalent
- `openspec validate`
- `openspec status`
- `openspec archive`

### 6.2 SuperSpec

SuperSpec owns:

- project-specific workflow stages
- artifact sequence
- mandatory gates between design and execution
- template structure for versioned design work

SuperSpec must be implemented as a project-local OpenSpec schema, not as a parallel manual convention.

### 6.3 Superpower

Superpower owns:

- brainstorm skill behavior
- mission framing
- power definitions
- agent execution roles
- dispatch and review protocol

Superpower is not treated as a native OpenSpec feature. It is a repository governance layer that must be referenced by schema artifacts and execution instructions.

## 7. End-to-End Process

The target V1 process is:

```text
Idea
→ Superpower brainstorm
→ OpenSpec change creation
→ SuperSpec artifacts
→ independent review / disposition / closure
→ agent execution through Superpower mission/power rules
→ implementation review / disposition / closure
→ verification and evidence
→ acceptance precheck
→ release record
```

Detailed stage mapping:

1. Brainstorm stage
   Use a `superpower` brainstorm skill to explore scope, constraints, risks, and acceptance direction.
2. Change-init stage
   Use OpenSpec command flow to create a change using the project-local `superspec` schema.
3. Design stage
   Produce the required `superspec` artifacts for approved scope and execution boundaries.
4. Gate stage
   No stage is considered complete until independent review, disposition, and closure verification have passed.
5. Execution stage
   Assign implementation agents under `superpower` mission and power constraints.
6. Verification stage
   Collect evidence, run tests, and produce review or closure artifacts.
7. Acceptance-precheck stage
   Reverse-check confirmed requirements against implementation and acceptance items; blocked items remain blocked.
8. Release stage
   Update the version ledger and release record under `docs/09-change-records/`.

## 8. Required Repository Structure

The minimum structure needed to make this model real is:

```text
openspec/
├── changes/
├── specs/
└── schemas/
    └── superspec/

docs/03-openspec/
├── openspec-usage.md
├── superspec-usage.md
└── superpower/
    ├── README.md
    ├── missions/
    └── powers/

docs/09-change-records/
└── baselines/V1/
```

## 9. Version Management Rules

This design is governed by the repository version ledger, not by ad hoc documentation.

Rules:

1. This file is the first V1 design baseline output.
2. Further V1 main outputs must stay under `docs/09-change-records/baselines/V1/`.
3. User-confirmed process decisions must be appended to `docs/09-change-records/current/DECISIONS.md`.
4. V1 cannot be closed without a single `docs/09-change-records/releases/V1.md` release summary.
5. Temporary experiment notes must not replace baseline outputs.

## 10. Design Gates

Before implementation begins, the following must exist:

1. A real project-local `superspec` schema under `openspec/schemas/superspec/`.
2. A written `superspec` usage document that explains the artifact sequence.
3. A written `superpower` governance document defining brainstorm, mission, and power roles.
4. A dispatch contract explaining how execution agents receive scope, allowed files, validation commands, and output format.
5. A gate contract defining review, disposition, closure verification, and acceptance-precheck requirements.

Before V1 can be marked accepted or closed, the following must exist:

1. V1 release record under `docs/09-change-records/releases/V1.md`.
2. Verification evidence under `docs/07-evidence/`.
3. Frontend-specific evidence under `docs/08-frontend-agent/` where applicable.
4. A decision trail for downgraded, blocked, or user-confirmed exceptions.
5. Acceptance-precheck results proving that important confirmed requirements were not silently downgraded.

## 11. Initial Artifact Plan

The next artifacts that should follow this design are:

1. `openspec/schemas/superspec/` implementation
2. `docs/03-openspec/superspec-usage.md`
3. `docs/03-openspec/superpower/README.md`
4. `docs/03-openspec/superpower/missions/` mission definitions
5. `docs/03-openspec/superpower/powers/` power definitions
6. V1 dispatch contract under the version ledger baseline
7. V1 gate contract under the version ledger baseline

## 12. Risks

| Risk | Impact | Required Control |
| --- | --- | --- |
| `superspec` stays only as a configured name | OpenSpec flow appears enabled but is not executable | Implement the local schema before relying on it |
| `superpower` remains only conceptual | Brainstorm and agent dispatch become inconsistent | Define explicit mission and power files before agent rollout |
| Process rules live outside the version ledger | Version audits become unreliable | Keep the main process baseline under `docs/09-change-records/` |
| OpenSpec schema customization remains experimental | Tool behavior may shift | Keep local schema minimal, explicit, and versioned |
| Gates are treated as optional ceremony | review and acceptance quality collapses | require explicit review, disposition, closure, and precheck artifacts |

## 13. Acceptance Criteria

This design baseline is accepted when:

1. It is registered as a V1 baseline output.
2. The version ledger points to it as an authoritative V1 design.
3. Later agent work references this document for workflow decisions.
4. No agent is asked to execute the combined model before the missing `superspec` and `superpower` artifacts are created.

## 14. Final Decision

The proposed model is valid and should be adopted as the target architecture.

The repository cannot honestly claim that the model is active today.

The correct next step is not implementation of business pages first. The correct next step is to finish the governance runtime for:

- `OpenSpec` as the change engine
- `SuperSpec` as the workflow schema
- `Superpower` as the brainstorm and execution-management layer

Only after those pieces are defined should V1 implementation tasks be dispatched to other agents.
