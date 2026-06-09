---
name: frontend-registry-stitch
description: Orchestrate the element-stitching pipeline — code indexing, browser element capture, stitching algorithm, and element registry output. Produces machine-consumable registry entries.
compatibility: opencode
metadata:
  project: frontend-skill-forge
  skill_type: tooling
  authority: project
---

# Frontend Registry Stitch

## Purpose

Orchestrate the full element-stitching pipeline: code-index regeneration → browser element capture → stitching algorithm → element registry output. Produces and maintains `element-registry.json` — the structured JSON mapping every interactive page element to its source component, data flow, and semantic anchors.

This Skill is the **machine-output counterpart** to `frontend-e2e-explorer`. Explorer produces human-readable evidence records; this Skill produces machine-consumable registry entries.

## Use When

Use this Skill when:

- **Onboard**: first-time project scan — index all code, explore all routes, produce full registry
- **Route change**: a route is added, removed, or its component tree changes — re-stitch affected routes
- **Selector drift**: E2E test failure indicates a selector no longer resolves — re-stitch and update stale entries
- **Periodic refresh**: scheduled re-scan to detect drift before tests catch it
- **New anchor strategy**: strategy registered — full re-stitch to update confidence scores

Do not use this Skill when:

- Exploring a page for the first time to understand its behavior (use `frontend-e2e-explorer`)
- Creating new e2e tests (use `frontend-incremental-coder`)
- The codebase has no `data-testid` attributes and no structured selectors (registry quality too low)
- MCP browser tools are unavailable and no browser snapshots exist

## Required Inputs

- Route target(s) — URL path or `"all"`
- Browser element snapshots: `artifacts/browser-snapshots/`
- Code index: `docs/02-harness/knowledge/frontend/code-index.json`
- Stitching algorithm: `src/testability/element-registry/stitch.ts`
- Anchor strategies: `src/testability/element-registry/anchor-strategies/`
- Existing registry: `docs/02-harness/knowledge/frontend/element-registry.json`

## Workflow

### 1. Ensure Code Index is Fresh

Check `code-index.json` — if `generatedAt` is older than the latest commit touching `src/**/*.tsx`, regenerate:
```bash
npx tsx src/testability/element-registry/discovery/code-indexer.ts . docs/02-harness/knowledge/frontend/code-index.json
```
Validate: `componentsFound` should match expected baseline (current: 54). A drop >10% indicates a regression.

### 2. Capture Browser Elements

Check `artifacts/browser-snapshots/` for existing snapshots of target routes. For routes without snapshots (or stale ones), run MCP browser capture. If explorer already visited a route, reuse its snapshot — no double capture. See `references/element-capture-script.md` for the extraction script.

### 3. Run Stitching

Determine scope:
- **Single route**: `stitchRoute(route, snapshot, codeIndex)` — returns elements + unmatched + report
- **Full onboard**: `buildRegistry(codeIndex, allSnapshots, commitHash)` — returns full ElementRegistry

Review the stitch report:
- `matchRate = matched / totalElements` — target >70%
- `highConfidenceRate` — target >60%
- Match rate <50% → flag for human review (likely testid coverage issue)

### 4. Review Unmatched Elements

Categorize unmatched by reason: `no-testid-no-unique-text`, `below-confidence-threshold`, `dynamic-content`. Write findings to stitch report in the evidence directory.

### 5. Update Cross-References

Update `element-registry.json` timestamp and version. Archive the stitch report under `docs/08-frontend-agent/evidence/stitch-reports/`. If anchor profile changed significantly (>10% shift), flag for human review.

## Modes

- **Mode A — Full Onboard**: All routes → full MCP exploration → full code index → `buildRegistry()` → `element-registry.json`
- **Mode B — Route-Level Update**: Single route → snapshot for that route → `stitchRoute()` → merge into existing registry
- **Mode C — Drift Repair**: Single element → re-capture parent route → re-stitch → update stale entries

## Failure Handling

If blocked, use one of these failure codes:

- `BLOCKED_BY_STALE_CODE_INDEX` — code index outdated; regenerate before stitching
- `BLOCKED_BY_NO_BROWSER_SNAPSHOTS` — no snapshots and MCP unavailable; run `frontend-e2e-explorer` first
- `BLOCKED_BY_LOW_MATCH_RATE` — match rate <50%; likely a testid coverage issue, not a stitching bug
- `BLOCKED_BY_CORRUPT_REGISTRY` — existing registry JSON is malformed
- `BLOCKED_BY_MISSING_ANCHOR_STRATEGY` — no anchor strategy registered for the target element patterns
- `BLOCKED_BY_CONFIG_DRIVEN_UI` — elements rendered from JS config objects lacking anchor metadata

For each blocker, include: what was attempted, what evidence exists, what is missing, and the next safe action.

## Context Budget Rules

- For single-route stitch, load: target route → snapshot → code index → primary + fallback anchor strategy → stitch.ts entry points
- Do not load all browser snapshots or all anchor strategies unless doing full onboard
- Load code index once and keep in memory
- Reference extraction scripts from `references/`, don't inline them
- Keep stitch report summaries concise; reference full report path

## Output Format

```md
# Stitch Report

## Scope (onboard / route-update / drift-repair)

## Target Routes

## Code Index Freshness

## Match Results
- Match rate
- Confidence distribution (high / medium / low)

## Unmatched Analysis
- Categorized by reason

## Registry Updates

## Cross-Reference Updates
```

## References

- `references/README.md` — shared contract, modes detail, validation examples, known limitations
- `references/element-capture-script.md` — browser_evaluate script for element capture
