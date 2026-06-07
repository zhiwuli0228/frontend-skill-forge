# Current Decision Ledger

Last Updated: 2026-06-07

This ledger stores user-confirmed decisions that affect scope, release semantics, documentation governance, and version progression. Raw discussion details stay in Git history unless they become baseline inputs.

## Confirmed Decisions

| ID | Date | Decision |
| --- | --- | --- |
| D001 | 2026-06-06 | The first priority is to make the agent harness and evidence system real, but the first execution phase must begin by building complex frontend pages that later validations can use. |
| D002 | 2026-06-06 | The project primarily serves AI-agent development and maintenance, but outputs must stay human-readable so they can transfer into real projects. |
| D003 | 2026-06-06 | The design engineer role for this repository includes architecture design, milestone decomposition, task dispatch rules, acceptance criteria, validation review, and summary. |
| D004 | 2026-06-06 | Current placeholder pages are disposable scaffolding and will be replaced rather than treated as accepted baseline pages. |
| D005 | 2026-06-06 | UI style is not constrained by brand; page complexity, nesting, and validation value matter more than polished product branding. |
| D006 | 2026-06-06 | Technical validation changes, optimizations, issues, and lessons learned must be recorded under a strict, unified version management system. |
| D007 | 2026-06-06 | Version management for this project should follow the `dv-entity-linking` repository pattern: few authoritative entry points, versioned baselines, one release record per version, and centralized decision tracking. |
| D008 | 2026-06-06 | The first V1 design baseline adopts a combined governance model: OpenSpec manages changes, SuperSpec defines workflow schema, and Superpower governs brainstorm and agent execution management. |
| D009 | 2026-06-06 | V1 must contain formal IR and SR main outputs in addition to the governance design baseline; the design document does not replace requirement and sub-requirement documents. |
| D010 | 2026-06-07 | The repository must adopt the stricter `dv-entity-linking` gate model: stage completion requires independent review, disposition, closure verification, and acceptance-precheck traceability where applicable; document presence alone does not open the next gate. |
| D011 | 2026-06-07 | All future large version changes require explicit user acceptance before further major-version progression. Each major version may contain multiple minor versions, and major-version closure requires an aggregate summary across those minor versions. |
| D012 | 2026-06-07 | V1 development will proceed through gated minor versions. The initial recommended sequence is V1.1 governance foundation, V1.2 SuperSpec schema activation, V1.3 Superpower governance activation, and V1.4 integration and gate verification. |
| D013 | 2026-06-07 | V1.1 is a documentation-only minor version. It must not modify `src/`, `tests/`, or `openspec/` implementation files and may only establish governance baselines and gate records. |
| D014 | 2026-06-07 | The user accepted V1.1 after design-lead review. V1.2 may begin. |
| D015 | 2026-06-07 | V1 continues under a no-business-code constraint. V1.2 and V1.3 must complete all spec-related, non-business-code framework assets, including static schema files, templates, usage guides, and governance contracts. They must not modify `src/`, `tests/`, or business/runtime implementation code. |
| D016 | 2026-06-07 | The user accepted V1.2 after review. V1.2 is closed as the SuperSpec schema baseline and activation-contract iteration. |
| D017 | 2026-06-07 | V1.3 may begin as a documentation-only Superpower governance activation iteration covering brainstorm rules, mission/power definitions, and dispatch/review governance. |
| D018 | 2026-06-07 | The user accepted V1.3 after review. V1.3 is closed as the Superpower governance activation baseline for V1. |
| D019 | 2026-06-07 | V1.4 may begin as the integration and gate-verification iteration. It may collect control-plane runtime evidence and dry-run traceability, but it still does not authorize business/frontend implementation. |
| D020 | 2026-06-07 | The user accepted V1.4 after review. V1.4 is closed as the integration and gate-verification iteration for V1. |
| D021 | 2026-06-07 | The user accepted V1 as complete. V1 is closed as the first OpenSpec + SuperSpec + Superpower collaboration framework baseline. |
| D022 | 2026-06-07 | V2 should start as the first code-bearing frontend version built on top of the accepted V1 control plane. |
| D023 | 2026-06-07 | The main goal of V2 is to implement complex frontend validation pages that provide realistic surfaces for later evidence, E2E, MCP, and skill-evolution experiments. |
| D024 | 2026-06-07 | V2 should prioritize complexity and testability over product completeness. Mocked states, nested interactions, filters, drawers, multistep forms, and explicit loading/error/empty states are in scope; real backend integration remains out of scope. |
| D025 | 2026-06-07 | The user accepted V2.1 after review. V2.1 is closed as the version-design and runtime-surface architecture iteration for V2. |
| D026 | 2026-06-07 | V2.2 may begin as the dashboard runtime baseline iteration. It should turn the current dashboard placeholder into an operations-style page with multiple visible states and evidence-friendly interactions. |
| D027 | 2026-06-07 | The user accepted V2.3 after review. V2.3 is closed as the task-list runtime baseline iteration for V2. V2.4 may begin as the task-create runtime baseline iteration. |
| D028 | 2026-06-07 | Agent delivery should be thinned down to the minimum useful status payload, with canonical artifact links and next-gate focus, while keeping the full end-to-end gate model unchanged. |
| D029 | 2026-06-07 | IR and SR should be treated as one upstream planning bundle. IR captures intent and risks; SR consumes the accepted IR and produces the concrete baseline that feeds the downstream spec/change execution. |
| D030 | 2026-06-07 | The V2 exploration that bundled IR/SR and thinned handoff payloads is a preserved process learning. Future code-bearing changes should default to this lower-noise delivery shape while keeping all gates intact. |

## Pending Confirmations

| Direction | Pending Item |
| --- | --- |
| V2 release semantics | Whether the first frontend implementation version should be accepted only after a full evidence loop or may close with staged blocked items |
