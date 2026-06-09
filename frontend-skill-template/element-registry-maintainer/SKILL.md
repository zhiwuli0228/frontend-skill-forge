---
name: element-registry-maintainer
description: Maintain the element registry through a self-closing loop — detect code changes, mark stale elements, re-stitch affected routes, validate health, and archive evidence.
compatibility: opencode
metadata:
  project: frontend-skill-forge
  skill_type: tooling
  authority: project
---

# Element Registry Maintainer

## Purpose

Maintain the element registry (`element-registry.json`) through a self-closing loop: detect code changes → mark stale elements → re-stitch affected routes → validate health → archive evidence → push evolution candidates.

## Use When

Use this Skill when:

- A commit modifies source files — detect affected routes and re-stitch
- An E2E test fails with selector errors — re-stitch with fresh browser snapshots and diagnose drift
- A periodic health check is needed — scan for staleness before tests catch it
- Registry health shows `drifted` or `degraded` — investigate and resolve
- Evolution queue review — human review of auto-generated KE/RE candidates

Do not use this Skill when:

- The codebase has no registry yet (use `frontend-registry-stitch` for initial onboarding)
- Capturing browser elements for the first time (use `frontend-e2e-explorer`)
- Adding new anchor strategies or modifying the stitching algorithm (manual code change)

## Required Inputs

- Trigger source (commit / e2e-failure / periodic)
- Changed file list (commit trigger) or failed routes (e2e trigger)
- Element registry: `docs/02-harness/knowledge/frontend/element-registry.json`
- Code index: `docs/02-harness/knowledge/frontend/code-index.json`

## Workflow

### 1. Receive Trigger

Determine the trigger source. Collect changed file list (commit), failed routes (e2e), or all routes (periodic).

### 2. Detect Affected Routes

Map changed files to affected routes using route-module-config analysis:

| File pattern | Affected routes |
|-------------|----------------|
| `src/shell/**`, `src/app/**`, `src/shared/**` | All routes |
| `src/domains/<M>/pages/<P>.tsx` | Exact routes in module `<M>` |
| `src/domains/<M>/components/**` | All routes in module `<M>` |

### 3. Execute Re-stitch

Choose mode based on trigger:
- **Commit/periodic**: rebuild `BrowserElement[]` from existing registry entries (code-side re-evaluation)
- **E2E-failure**: use fresh browser snapshots from MCP capture

Run via CLI: `npx tsx scripts/registry-refresh.ts --trigger <type> [--files "..."] [--routes "..."] [--snapshots "..."]`

### 4. Review Health

Check the health summary output. Triage by severity:
- **healthy** — no action needed
- **drifted** — review per-route details; check if recent code changes explain the drift
- **degraded** — immediate attention needed; likely a test will fail soon

### 5. Act on Evolution Candidates

When `drifted` or `degraded`, the system auto-pushes candidates to evolution queues. Review manually:
1. Check `knowledge-evolution-queue.md` for new KE entries
2. Check `rule-evolution-queue.md` for new RE entries
3. Validate evidence (read the stitch report)
4. Accept or reject each candidate

### 6. Close the Loop

After addressing drift:
1. Fix the root cause (update component, add testids, fix selectors)
2. Regenerate code index if source changed
3. Re-run the trigger to verify health returns to `healthy`

## Failure Handling

If blocked, use one of these failure codes:

- `BLOCKED_BY_MISSING_REGISTRY` — no element-registry.json exists; run `frontend-registry-stitch` first
- `BLOCKED_BY_STALE_CODE_INDEX` — code index outdated; regenerate before proceeding
- `BLOCKED_BY_CORRUPT_REGISTRY` — registry JSON is malformed; restore from backup
- `BLOCKED_BY_NO_BROWSER_SNAPSHOT` — e2e-failure trigger without snapshot file; capture with `frontend-e2e-explorer`
- `BLOCKED_BY_LOW_MATCH_RATE` — match rate <50%; likely a testid coverage issue, not a stitching bug
- `BLOCKED_BY_EVOLUTION_CONFLICT` — candidate conflicts with existing rule/knowledge; escalate to human

For each blocker, include: what was attempted, what evidence exists, what is missing, and the next safe action.

## Context Budget Rules

- Do not load all browser snapshots unless doing a full periodic scan
- Do not load all anchor strategy modules — load primary + one fallback
- Load code index once and keep in memory for the session
- Keep stitch report summaries in response; reference full report path
- Refer to CLI commands by name; do not paste full script output

## Output Format

```md
# Registry Health Report

## Trigger Source

## Affected Routes

## Health Summary (healthy / drifted / degraded)

## Per-Route Details

## Evolution Candidates (if any)

## Recommended Actions
```

## References

- `references/README.md` — architecture details, CLI reference, validation examples
