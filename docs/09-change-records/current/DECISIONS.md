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
| D031 | 2026-06-07 | V3 is approved as the next major version after V2. V3 corresponds to architecture blueprint Phase 3 "First Evidence Loop" and produces knowledge maps, e2e asset registry, first MCP exploration session, drift diagnosis, and evolution candidates. |
| D032 | 2026-06-07 | V3 uses one IR/SR bundle for the whole major version (per D028-D030 pattern). Each minor version (V3.1-V3.5) uses a reduced gate set: proposal → tasks → implementation → verify → release. The full 19-artifact chain applies only to V3.1. |
| D033 | 2026-06-07 | V3.3 falls back to deriving evidence from existing e2e test artifacts (181 passing tests) because real Playwright MCP browser tooling is not available in the current session. The fallback is documented in the session record and is the first item on V4's follow-up list (re-run with real MCP). |
| D034 | 2026-06-07 | V3.4 retro-documents the V2.10 sidebar hotfix as a failure-diagnosis record and produces 1 first-accepted knowledge candidate (KE-001) + 5 first-accepted rule candidates (RE-001 through RE-005). The "drift demo" e2e spec uses `test.fixme()` for its negative control so the suite stays green. |
| D035 | 2026-06-07 | V3 first-accepts 5 rules: RE-001 (sidebar items must have unique `path`), RE-003 (every testable element must have `data-testid`), RE-004 (e2e tests must assert on URL change for navigation), RE-005 (mock data interfaces must include all filter values). RE-002 (scenario selector on every page) is deferred to V4 for re-evaluation. |
| D036 | 2026-06-07 | V3 is closed. All 19 functional requirements, 6 non-functional requirements, and 12 of 13 exit-gate criteria are met. The 13th (user acceptance) is the final step. |
| D037 | 2026-06-07 | V4 is approved as the next major version after V3. V4 = "Skill v1 implementation" corresponding to architecture blueprint Phase 4. V4 will convert the 4 skeleton Skills (frontend-project-reader, frontend-incremental-coder, frontend-e2e-explorer, skill-evolution-maintainer) into usable v1, using V3's evidence (knowledge maps, e2e registry, MCP session, drift diagnosis) as the validation set. |
| D038 | 2026-06-07 | V4.1: `frontend-project-reader` v1 accepted. 9-step procedure validated against V3.1 knowledge maps (route-map, component-map, project-map, state-flow-map, api-contract-map). |
| D039 | 2026-06-07 | V4.2: `frontend-incremental-coder` v1 accepted. 9-step procedure validated against V3.4 failure-diagnosis (V2.10 sidebar hotfix). |
| D040 | 2026-06-07 | V4.3: `frontend-e2e-explorer` v1 accepted. 9-step procedure validated against V3.3 MCP session (12 evidence records). |
| D041 | 2026-06-07 | V4.4: `skill-evolution-maintainer` v1 accepted. 8-step procedure validated against V3.4 evolution queues (KE-001, RE-001 through RE-005). |
| D042 | 2026-06-07 | V4 is closed. All 7 functional requirements met. All 4 Skills have v1 procedures with validation examples. evidence-to-skill-promotion updated with 4 accepted promotions. |
| D043 | 2026-06-07 | V5 is approved as the next major version after V4. V5 = "Benchmark Demo Expansion" corresponding to architecture blueprint Phase 5. V5 will add more complex demo pages to the V2 surface, expanding the evidence loop to cover more interaction patterns. |
| D044 | 2026-06-07 | V5 is closed. All 5 domain modules enhanced with complex interactions (20+ pages). 183/184 e2e tests passing. Phase 5 verification report passes. V5 release record created. |
| D045 | 2026-06-07 | V6 is approved as the next major version after V5. V6 = "MCP-Assisted Exploration" corresponding to architecture blueprint Phase 6. V6 will integrate practical Playwright MCP exploration workflow with real browser evidence, replacing the V3 fallback approach. |
| D046 | 2026-06-07 | V6 is closed. 3 real MCP sessions completed (/task/list, /skill/list, /workflow/editor). 7 screenshots, 10+ snapshots, 4 interaction traces, 28 selectors evaluated. Drift diagnosis confirms V3 fallback accuracy with 6 evidence gaps identified. Knowledge maps updated. |
| D047 | 2026-06-07 | User accepted V6. V6 is formally closed as the MCP-Assisted Exploration baseline. All Phase 6 deliverables complete. |
| D048 | 2026-06-07 | V7 is approved as the next major version after V6. V7 = "Self-Evolution Validation" corresponding to architecture blueprint Phase 7. V7 will prove the Skill/Rule/Knowledge evolution loop works end-to-end through a controlled UI drift scenario, completing the first full Evidence → Diagnosis → Candidate → Patch → Verification → Archive cycle. |
| D049 | 2026-06-07 | V7 is closed. Self-evolution cycle validated: 1 controlled drift (AntD Button.Group → Space.Compact) → 1 test failure → 3 evolution candidates (KE-005, RE-006, SE-001) → 2-line minimal patch → 183/184 e2e tests pass. Full cycle archived in phase-7-self-evolution-validation.md. |

## Pending Confirmations

| Direction | Pending Item |
| --- | --- |
| V2 release semantics | Whether the first frontend implementation version should be accepted only after a full evidence loop or may close with staged blocked items |
