# SuperSpec Usage

Status: V1.2 schema baseline

Last Updated: 2026-06-07

## Purpose

Define how this repository uses the project-local `superspec` workflow schema assets in V1. This document is a usage baseline for the static schema and templates now stored under `openspec/schemas/superspec/`. It is not a claim that every lifecycle stage has already been runtime-verified.

## Role of SuperSpec

`superspec` is the repository workflow layer for OpenSpec. It must define:

- artifact sequence
- stage semantics
- mandatory gate order
- template expectations for review, disposition, closure, and acceptance-precheck outputs
- mandatory frontend verification expectations for all user-visible changes

`OpenSpec` remains the change engine. `SuperSpec` does not replace OpenSpec commands.

Repository terminology rule:

- do not treat the upstream generic `spec-driven` label as the repository's execution contract
- for this repository, dispatch and handoff must name `superspec` explicitly
- code-bearing work must also be governed by `superpower`
- if a tool or skill emits `spec-driven` as a generic umbrella term, treat it as incomplete until the repo-specific `superspec + superpower` labels are present

## OpenSpec-Supported Directory Contract

Per the OpenSpec custom-schema model, the only canonical project-local schema structure that the toolchain relies on is:

```text
openspec/
└── schemas/
    └── superspec/
        ├── schema.yaml
        └── templates/
```

For this repository, `README.md` and `references/workflow.md` are retained as companion documents. They are repository-local documentation aids, not extra OpenSpec-required directory layers.

## Current Asset Coverage

The repository-local `superspec` directory must contain:

- `schema.yaml`
- template files for core artifacts and gate records

The repository may additionally keep:

- `README.md` for human-readable notes
- `references/` for repository-specific workflow explanation

These assets define the target workflow shape for this repository even before full execution verification is complete.

## Target Flow

The intended `superspec` flow is:

```text
brainstorm
-> proposal
-> specs
-> design
-> design review
-> design disposition
-> design closure
-> plan
-> tasks
-> implementation
-> implementation review
-> implementation disposition
-> implementation closure
-> verify
-> verify review
-> verify disposition
-> verify closure
-> acceptance precheck
-> release
```

## Artifact Expectations

The schema must be able to generate or enforce references to:

- main change artifacts
- explicit `proposal`, `specs`, `design`, `plan`, `tasks`, `implementation`, and `verify` artifacts
- review records
- disposition records
- closure verification records
- acceptance-precheck records
- release summary records

For frontend changes, the schema must also enforce:

- required skill declarations for major execution steps
- required MCP or tool declarations where browser exploration or automation is used
- mandatory Playwright E2E verification for user-visible behavior changes
- recorded verification results rather than planned-only checks
- fixed artifact output paths to prevent workflow drift

For this repository, all major-version baseline outputs must remain traceable to `docs/09-change-records/`.

## Reliability Boundary

The `superspec` baseline is reliable only to the extent proven by tool and repository evidence:

- `openspec schema which superspec` resolves to the project-local schema directory
- `openspec schema validate superspec` must pass against the current `schema.yaml`
- repository-local companion docs may explain extra semantics, but they must not redefine the OpenSpec schema contract

As of 2026-06-07, the repository should treat schema validation as the minimum reliability bar. End-to-end generation behavior remains a separate activation question.

On 2026-06-07, an isolated runtime verification also confirmed that OpenSpec can:

- create a change shell with `--schema superspec`
- compute the artifact dependency graph through `openspec status`
- resolve project-local templates and AI-facing artifact instructions

That evidence improves confidence in the schema contract, but it still does not by itself prove full repository workflow activation.

## Frontend-Specific Rule

For this repository, user-visible frontend changes are not acceptable unless verification includes the existing Playwright end-to-end framework under `tests/e2e/`. `lint` and `build` are required checks, but they are not sufficient on their own. A completed `verify` artifact must record actual command results and evidence paths.

## Skill And Path Routing Rule

`schema.yaml` is the authoritative routing contract for both skill usage and artifact output paths.

- Each artifact must be produced by its assigned skill family.
- `brainstorm` prefers the Superpowers brainstorming skill when installed.
- `proposal`, `specs`, and `design` are reserved for their corresponding OpenSpec authoring skills.
- `implementation` and `verify` may not absorb review, disposition, closure, or release outputs.
- Artifact outputs may not be redirected into `docs/`, ad hoc working folders, or alternate filenames.
- The only flexible path pattern is `specs/**/*.md`, and it still must remain under `openspec/changes/<change>/specs/`.

### Brainstorm Redirect Exception

Latest upstream evidence matters here:

- OpenSpec custom schemas support custom artifacts and templates, but they do not currently provide a reliable built-in mechanism to force orchestrators to invoke an external custom skill for artifact creation.
- An OpenSpec issue opened on February 27, 2026 records that schema-level skill directives can be ignored by current orchestration skills.
- The upstream Superpowers brainstorming skill currently writes its design output to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`, and a Superpowers issue published around April 2026 reports that it ignores custom output-path preferences.

Because of that, this repository treats `brainstorm` as a redirect-managed exception:

- the required change-local artifact remains `openspec/changes/<change>/brainstorm.md`
- if Superpowers produced the canonical brainstorm, `brainstorm.md` must record and point to the file under `docs/superpowers/specs/`
- if Superpowers is not installed, `brainstorm.md` becomes the canonical artifact and must record the fallback used
- no other external redirect target is allowed

The `brainstorm.md` file is therefore not free-form. It must contain a machine-checkable redirect block with:

- `source_mode`
- `required_skill`
- `fallback_reason` when fallback is used
- `canonical_brainstorm_path`
- `redirect_approved`
- `path_compliance`

It must also include a redirect audit checklist showing whether the path and skill routing rules were satisfied.

If a different skill assignment or file location is needed, the schema contract must be updated first rather than bypassed during execution.

## Execution Mode Rule

SuperSpec does not require local-only execution. The repository default is subagent execution on the current working branch.

If the default subagent mode is used:

- the change still uses the same artifact flow
- `plan.md` should declare `execution_mode: subagent`
- `tasks.md` should remain the `apply` entrypoint
- implementation, verify, review, disposition, closure, and commit flow must still be traceable

If the user explicitly disables subagent mode, `plan.md` should instead declare `execution_mode: local`.

## V1.2 Constraint

V1.2 may add static schema and template assets. It still does not authorize business-code changes, frontend implementation, or claims that the complete workflow has been operationally verified end to end.
