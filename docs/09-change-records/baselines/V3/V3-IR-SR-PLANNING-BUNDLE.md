# V3 IR-SR Planning Bundle

Status: Accepted
Date: 2026-06-07

## Purpose

Combined IR (Intent + Risks) and SR (Solution + Requirements) for the V3 major version. Per V2's exploration (D028-D030), IR and SR are bundled as one upstream planning artifact for the whole major version, with per-minor-version dispatches using a reduced gate set.

This bundle captures the WHY (IR) and WHAT (SR) of V3, so downstream V3.1-V3.5 dispatches can be terse and artifact-linked.

## IR: Intent and Risks

### Intent

V3 establishes the project's **first operational evidence loop** on top of the V2 surface. After V3 closes, the project has:

- Working knowledge maps that any future agent can read to understand the V2 surface
- A formal e2e asset registry with smoke vs regression classification
- A real (or derived) MCP exploration session with 12 evidence records
- A first failure-diagnosis record (the V2.10 sidebar hotfix) that demonstrates the drift workflow
- First evolution candidates approved through the decision-record workflow
- All governance artifacts required for major-version closure

V3 is the **observational layer** that V4 (Skill v1 implementation) and V5 (Benchmark Demo Expansion) will build on top of.

### Why Now

The V2 surface (closed V2.6-V2.10) provides enough complexity that evidence collection is meaningful. Earlier (V1, V2.1-V2.5) was too skeleton-only; later (V4+) needs evidence to drive Skill evolution.

### Risks

| # | Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| R1 | V3 produces shallow evidence (page-loads only, no interactions) | medium | medium | V3.3 session targets interactions explicitly (3 traces minimum) |
| R2 | The "fallback to e2e artifacts" approach produces fake-looking evidence | high | low | Document the fallback in the session record; plan to re-run with real MCP in V4 |
| R3 | The V2.10 sidebar hotfix is retro-documented, weakening the diagnosis | low | low | The fix and the diagnosis both reference the same 13 e2e tests; the diagnosis remains valid evidence |
| R4 | Knowledge maps become stale as soon as the V2 surface changes | medium | high | V3.5 closes V3 with a note: "any future V* change must update the relevant knowledge map section" |
| R5 | Evolution candidates become "shelf-ware" (added but never accepted) | medium | medium | V3.4 closes 1 knowledge candidate and 5 rule candidates; this demonstrates the workflow |
| R6 | The drift-diagnosis-demo spec confuses future readers | low | low | The spec is heavily commented; the body of the negative control is documented as a template |
| R7 | V3 is doc-heavy, so it looks like "no real work happened" | medium | medium | V3 retro and aggregate summary emphasize what was produced and how it enables V4 |

## SR: Solution and Requirements

### Solution Overview

V3 is **5 minor versions**, each producing a different layer of the evidence loop:

```text
V3.1 Knowledge Maps (5 docs)        ← input to all later steps
V3.2 E2E Asset Registry (2 docs)    ← catalogs the 25 existing specs
V3.3 First MCP Session (1 + 11)     ← proves the evidence workflow on /task/list
V3.4 Drift Diagnosis (1 + 5 + 1)    ← retro-documents V2.10 hotfix + evolution candidates
V3.5 V3 Aggregate Closure (8+)      ← governance artifacts
```

### Functional Requirements

| # | Requirement | Satisfied By |
| --- | --- | --- |
| FR1 | All 21 routes documented in `route-map.md` | V3.1 |
| FR2 | All 30 components documented in `component-map.md` | V3.1 |
| FR3 | All 5 modules documented in `project-map.md` | V3.1 |
| FR4 | All 3 state sources documented in `state-flow-map.md` | V3.1 |
| FR5 | All 5 mock-data files documented in `api-contract-map.md` | V3.1 |
| FR6 | 25 spec files classified in `registry.md` | V3.2 |
| FR7 | 25 spec files reviewed for promotion in `smoke-promotion-candidates.md` | V3.2 |
| FR8 | 1 MCP session record exists | V3.3 |
| FR9 | 4 route snapshots (one per scenario) | V3.3 |
| FR10 | 3-4 component discoveries | V3.3 |
| FR11 | 2-3 interaction traces | V3.3 |
| FR12 | 1 evidence index | V3.3 |
| FR13 | 1 failure-diagnosis record (V2.10 sidebar) | V3.4 |
| FR14 | ≥1 evolution candidate accepted through decision-record workflow | V3.4 |
| FR15 | 1 diagnostic e2e spec demonstrating drift detection | V3.4 |
| FR16 | V3 baseline README + IR/SR bundle + iteration plan | V3.5 |
| FR17 | V3 release record + aggregate summary + retrospective + issues | V3.5 |
| FR18 | Decision ledger updated with D031+ | V3.5 |
| FR19 | Phase 3 verification report | V3.5 |

### Non-Functional Requirements

| # | Requirement | Target |
| --- | --- | --- |
| NFR1 | `npm run lint` passes | 0 errors, 0 warnings |
| NFR2 | `npm run build` passes | clean |
| NFR3 | `npm run test:e2e` passes | 183/184 (1 fixme-skipped, no failures) |
| NFR4 | Knowledge map read time | <5 min for a new agent to understand the project |
| NFR5 | Evidence template adoption | 100% (all 12 records use the templates; no ad-hoc format) |
| NFR6 | Cross-references | every evidence record has at least 1 link to/from a knowledge map entry or e2e test |

### Out of Scope (V3)

- New runtime features (V5)
- Skill v1 implementation (V4)
- Real MCP browser tool integration (V4 will re-run V3.3 with real MCP)
- Code splitting (V5)
- AntD 6→7 migration (V5)

### Sequencing Rule

V3.1 must close before V3.2. V3.2 before V3.3. V3.3 before V3.4. V3.4 before V3.5.

The reduced gate set per minor version (proposal → tasks → implementation → verify → release) is sufficient because the IR/SR bundle is the upstream planning artifact, and each minor version is a tightly-scoped sub-change.

## Acceptance Conclusion

V3 closes when all 19 functional requirements + 6 non-functional requirements + 13 exit-gate criteria are met. The user accepts V3 as complete.

## Cross-References

- V2 retrospective: `docs/09-change-records/process/RETRO-V2.6-V2.10.md` — provides the V2.10 hotfix seed for V3.4
- Architecture blueprint: `docs/01-architecture/frontend-skill-forge-architecture-blueprint.md` §17 — defines Phase 3 "First Evidence Loop" as the V3 scope
- Decision ledger: `docs/09-change-records/current/DECISIONS.md` — D031+ will record V3 closure
