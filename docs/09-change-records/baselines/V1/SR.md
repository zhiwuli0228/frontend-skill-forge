# Frontend Skill Forge V1 Sub Requirement

Status: Closed for V1.1

Version: V1

Date: 2026-06-06

## Purpose

This document converts the V1 requirement baseline into a design structure that can guide later execution agents. It defines the artifact layout, workflow stages, and governance responsibilities needed to activate the combined OpenSpec + SuperSpec + Superpower model.

This SR does not by itself open the implementation gate. It must later pass:

- independent SR review
- SR disposition
- SR closure verification

V1.1 gate status:

- SR review completed on 2026-06-07
- SR disposition completed on 2026-06-07
- SR closure verification completed on 2026-06-07

## Design Basis

This SR is derived from:

- [IR.md](./IR.md)
- [DESIGN-001-openspec-superspec-superpower-governance.md](./DESIGN-001-openspec-superspec-superpower-governance.md)

## Functional Decomposition

### SR-V1-001 OpenSpec Change Layer

The repository must use OpenSpec as the only official change-management engine.

Required capability:

- create changes
- validate changes
- inspect status
- archive completed changes

Design rule:

- OpenSpec owns change lifecycle, not brainstorm strategy or agent dispatch logic

### SR-V1-002 SuperSpec Workflow Schema

The repository must implement a project-local `superspec` schema under `openspec/schemas/superspec/`.

The schema must define:

- artifact sequence
- stage meanings
- gate order between brainstorming, design, execution, verification, and closure
- templates aligned with repository version management

Design rule:

- `superspec` must be a real schema implementation, not just a configured name in `openspec/config.yaml`

### SR-V1-003 Superpower Brainstorm Layer

The repository must define a Superpower brainstorm layer under `docs/03-openspec/superpower/`.

The layer must cover:

- brainstorm purpose
- mission framing
- power definitions
- expected outputs from brainstorm before a change is created

Design rule:

- brainstorm is a controlled phase, not an ad hoc chat mode

### SR-V1-004 Superpower Agent Execution Governance

The repository must define how execution agents are managed.

The governance model must specify:

- agent roles
- dispatch input contract
- allowed file boundaries
- forbidden file boundaries
- required validation commands
- required output format for handoff and review

Design rule:

- no implementation task should be delegated without a bounded dispatch contract

Required dispatch fields:

- target branch
- target stage
- allowed files
- forbidden files
- validation commands
- evidence output path
- final report format

### SR-V1-005 Version Ledger Integration

The repository must integrate governance work into the version ledger.

Required outputs:

- `docs/09-change-records/PROJECT.md` for current state
- `docs/09-change-records/current/DECISIONS.md` for user decisions
- `docs/09-change-records/baselines/V1/` for main V1 outputs
- `docs/09-change-records/releases/V1.md` for the final version conclusion
- minor-version records under the V1 baseline or release structure as needed

Design rule:

- no duplicate current-state narratives outside the version ledger

### SR-V1-006 Review and Closure Artifacts

V1 must define review gate outputs, not only baseline outputs.

Required gate artifact types:

- IR review record
- IR disposition record
- IR closure verification record
- SR review record
- SR disposition record
- SR closure verification record
- implementation review, disposition, and closure records
- acceptance precheck record
- acceptance precheck verification record when needed
- major-version aggregate summary record

Design rule:

- a stage is not considered complete when only its main output exists

## Stage Flow

The target V1 workflow is:

```text
Superpower brainstorm
→ OpenSpec change creation
→ SuperSpec artifact flow
→ independent review / disposition / closure gates
→ Superpower-governed agent execution
→ review / disposition / closure gates
→ verification and evidence
→ acceptance precheck
→ V1 release record
```

## Required Repository Outputs

| Output | Location |
| --- | --- |
| V1 IR | `docs/09-change-records/baselines/V1/IR.md` |
| V1 SR | `docs/09-change-records/baselines/V1/SR.md` |
| V1 governance design | `docs/09-change-records/baselines/V1/DESIGN-001-openspec-superspec-superpower-governance.md` |
| SuperSpec schema | `openspec/schemas/superspec/` |
| SuperSpec usage guide | `docs/03-openspec/superspec-usage.md` |
| Superpower governance guide | `docs/03-openspec/superpower/README.md` |
| Superpower missions | `docs/03-openspec/superpower/missions/` |
| Superpower powers | `docs/03-openspec/superpower/powers/` |
| Review/disposition/closure records | `docs/09-change-records/baselines/V1/` |
| V1 release record | `docs/09-change-records/releases/V1.md` |

## Execution Gates

Before implementation begins:

1. `IR.md` exists.
2. `SR.md` exists.
3. IR closure verification has completed.
4. the SuperSpec schema exists.
5. Superpower brainstorm and execution-governance docs exist.
6. dispatch and review rules are documented.
7. SR closure verification has completed.

Before V1 closure:

1. version outputs are present under `baselines/V1/`
2. required review, disposition, and closure records exist
3. verification evidence exists
4. blocked or downgraded items are documented
5. acceptance precheck has completed
6. a V1 aggregate summary exists
7. explicit user acceptance exists
8. `releases/V1.md` exists

## Risks

| Risk | Impact | Control |
| --- | --- | --- |
| OpenSpec is used without a real SuperSpec schema | fake process activation | treat schema implementation as a hard gate |
| Superpower remains only conceptual | inconsistent brainstorming and delegation | require mission and power files before agent rollout |
| governance files exist but are not versioned | weak audit trail | keep all main outputs under the V1 baseline ledger |
| stage outputs exist without passing gates | false sense of progress | require review, disposition, and closure records before stage transition |
| minor versions are mistaken for major-version completion | premature progression | require explicit major-version acceptance and final aggregate summary |

## Acceptance Criteria

This SR is satisfied when:

1. it gives execution agents a concrete structure to build against
2. it defines the missing artifacts as explicit deliverables
3. it defines stage gates beyond baseline documents
4. it prevents governance activation from being claimed prematurely
5. it ties governance work to version and release management
