# UI Validation Evidence Contract

Last Updated: 2026-06-07
Status: Active
Priority: High

## Purpose

Define the mandatory evidence contract for benchmark-grade frontend validation in this repository.

This contract exists because code-level verification is not enough for the project's long-term goals:

- benchmark project credibility
- article-grade evidence collection
- reproducible UI behavior validation
- Skill / map / evidence loop evaluation based on real runtime behavior

## Core Rule

For UI-facing work, real page interaction evidence is more important than code-only verification.

Code inspection, static reasoning, and passing tests are necessary but not sufficient.

Any validation result that does not show real runtime page behavior is incomplete by default.

## Applies To

This contract is mandatory when any task involves one or more of the following:

- route behavior
- page rendering
- filters, forms, tables, drawers, modals, tabs
- selector stability
- E2E evidence quality
- frontend Skill feasibility
- map freshness validation
- UI drift diagnosis

## Minimum Evidence Requirement

For every UI validation run, collect all of the following:

1. Real route navigation evidence
2. At least one real user interaction sequence
3. At least one visual artifact
4. One machine-executable result artifact
5. One human-readable run manifest

Validation is considered incomplete if any of these are missing.

## Required Artifact Set Per Run

Each UI validation run must produce, at minimum:

1. `manifest.md` under `artifacts/validation/runs/<run-id>/`
2. at least 2 screenshots:
   - initial page state
   - post-interaction state
3. one of the following runtime artifacts:
   - Playwright HTML report
   - Playwright trace
   - MCP interaction session record with concrete interaction steps
4. raw command or execution log
5. explicit pass/fail/partial conclusion in a governed doc or run record

Recommended additional artifacts:

- console log capture
- network request capture
- DOM/accessibility snapshot
- short notes on selector stability

## Strong Constraints

### 1. No Code-Only Closure

Do not close a UI validation task using only:

- source reading
- map reading
- test file reading
- assertion summaries without runtime artifacts

Those inputs may support validation, but they cannot replace runtime evidence.

### 2. Real Interaction Is Mandatory

A valid UI verification run must perform at least one concrete page interaction, such as:

- click
- type
- select
- open modal
- open drawer
- switch scenario
- change view mode
- submit or retry action

Pure page load without interaction is not enough for benchmark evidence.

### 3. Headless-Only Black Box Is Not Enough

If Playwright runs headless, the run must still emit reviewable artifacts:

- screenshots
- trace
- HTML report

If none of these are preserved, the run is not strong enough for benchmark evidence.

### 4. Documentation Must Point to Raw Artifacts

Every formal conclusion in `docs/` must point to the exact raw artifact paths under `artifacts/validation/`.

No conclusion should stand alone without raw evidence references.

## Evidence Priority Order

When judging confidence, prefer this order:

1. real page interaction artifacts
2. MCP exploration records with screenshots/snapshots
3. Playwright runtime reports and traces
4. test assertions and logs
5. source-code-only reasoning

This order should also guide what gets cited in article material.

## Minimum Run Flow

Each benchmark-grade UI validation run should follow:

```text
Create run manifest
→ open target route
→ capture initial screenshot
→ perform concrete interaction
→ capture post-interaction screenshot
→ save runtime artifact (trace/report/log)
→ write validation conclusion
→ link docs to raw artifacts
```

## Failure Policy

If a run cannot produce real page interaction evidence, record it explicitly as:

```text
blocked: runtime evidence missing
```

Do not silently downgrade the run into a code-only validation and still mark it complete.

## Publication Guidance

For article or benchmark use, prefer evidence that is:

- visual
- reproducible
- interaction-based
- timestamped
- path-addressable in the repository

The artifact layer should make it possible for a reviewer to answer:

1. What page was opened?
2. What interaction was performed?
3. What changed afterward?
4. Where is the raw proof?

## Relationship to Other Docs

- Use with `playwright-mcp-policy.md`
- Use with `skill-and-map-feasibility-validation-plan.md`
- Raw outputs live under `artifacts/validation/`
- Formal conclusions live under governed `docs/` locations
