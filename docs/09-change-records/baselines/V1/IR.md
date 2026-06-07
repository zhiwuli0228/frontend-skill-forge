# Frontend Skill Forge V1 Issue Requirement

Status: Closed for V1.1

Version: V1

Date: 2026-06-06

## Purpose

This document defines the V1 requirement baseline for the repository. V1 is the first meaningful version after bootstrap and establishes the governance runtime required before large-scale frontend validation work is delegated to other agents.

This IR is not enough by itself to move V1 forward. Under the repository gate model, it must later pass:

- independent IR review
- IR disposition
- IR closure verification

V1.1 gate status:

- IR review completed on 2026-06-07
- IR disposition completed on 2026-06-07
- IR closure verification completed on 2026-06-07

## Current Context

The repository already has:

- a React, TypeScript, Vite, and Playwright bootstrap
- layered docs and frontend-agent governance skeleton
- an installed OpenSpec CLI
- a configured default schema name of `superspec`

The repository does not yet have:

- a working project-local `superspec` schema
- executable `superpower` brainstorm and agent-governance assets
- a formal V1 governance flow tying brainstorming, change management, execution, and release control together

## Requirement Statement

V1 must establish a usable governance model in which:

1. change management is executed through OpenSpec commands
2. process flow is defined by a project-local SuperSpec workflow schema
3. brainstorm is governed by Superpower skills
4. agent execution management is governed by Superpower mission and power rules
5. all of the above are versioned under the repository ledger

## In Scope

- define the V1 governance target model
- define required responsibilities of OpenSpec, SuperSpec, and Superpower
- define process stages and release gates
- define the minimum repository structure required to activate the model
- define what must exist before implementation agents start work

## Out of Scope

- building the first complex frontend pages
- implementing the SuperSpec schema in this document
- implementing Superpower skills in this document
- closing V1

## User-Confirmed Constraints

- The first project priority is to make the agent harness and evidence system real.
- The first practical execution phase still depends on building complex frontend pages later.
- The repository must use strict version management and decision traceability.
- The version-management pattern should follow `dv-entity-linking`: few authoritative current docs, versioned baselines, and one release record per version.
- A major version may continue across multiple minor versions and cannot progress without explicit user acceptance.

## Core Requirements

### IR-V1-001 Governance Role Split

The repository must adopt this role split:

- OpenSpec: change lifecycle, artifact generation, validation, status, archive
- SuperSpec: project-local workflow schema and stage gating
- Superpower: brainstorm behavior, mission structure, agent dispatch, execution governance

### IR-V1-002 No False Activation

The repository must not claim the combined model is active until:

- `openspec/schemas/superspec/` exists and is usable
- Superpower governance files exist and are documented
- project docs explain how the three layers interact

### IR-V1-003 Versioned Main Outputs

V1 governance design outputs must be stored under `docs/09-change-records/baselines/V1/` and must not be scattered across unrelated directories as standalone temporary notes.

### IR-V1-004 Pre-Execution Gate

No major multi-agent implementation work may start until V1 has:

- an IR
- an SR
- a governance design baseline
- defined dispatch and review rules
- completed IR closure verification
- completed SR closure verification

### IR-V1-005 Release Gate

V1 cannot be marked accepted or closed without:

- a release record under `docs/09-change-records/releases/V1.md`
- linked verification evidence under `docs/07-evidence/`
- documented decisions under `docs/09-change-records/current/DECISIONS.md`
- acceptance precheck and, if required, acceptance precheck verification
- explicit user acceptance for major-version closure

### IR-V1-006 Traceability Gate

User-confirmed important requirements must be traceable through:

`IR -> SR -> implementation scope -> tests -> acceptance items`

If any important confirmed requirement drops out of this chain, V1 must remain blocked.

### IR-V1-007 No Silent Downgrade

No confirmed important requirement may be:

- quietly weakened
- deferred without explicit user confirmation
- replaced by a looser test or acceptance interpretation

Any such change must be recorded in the decision ledger before the version can proceed.

### IR-V1-008 Major/Minor Version Model

V1 must be treated as a major version that may contain multiple minor versions or sub-iterations.

Minor versions may be used to:

- deliver partial gated progress
- isolate remediation or sub-goals
- record blocked or accepted intermediate states

Minor-version completion does not imply V1 completion.

### IR-V1-009 Major Version Summary

Before V1 can be closed, the repository must produce a final V1 aggregate summary that consolidates:

- completed minor versions
- main outputs
- review and closure results
- evidence summary
- blocked or deferred items
- final user acceptance outcome

## Acceptance Criteria

This IR is satisfied when:

1. V1 has explicit IR and SR main outputs.
2. The repository has a documented combined governance target.
3. The missing activation prerequisites are listed as hard gates.
4. Traceability and no-silent-downgrade rules are explicit.
5. Major/minor version rules are explicit.
6. Later V1 work can use this IR as the requirement source for implementation and validation planning.

## Conclusion

V1 is a governance-activation version before it is a frontend-expansion version. The first required deliverable is a working control plane for OpenSpec, SuperSpec, and Superpower. Complex frontend validation pages belong after that control plane is defined.
