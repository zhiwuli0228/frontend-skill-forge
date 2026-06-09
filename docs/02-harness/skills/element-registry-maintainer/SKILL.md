# Element Registry Maintainer

Status: v1 (V10)
Version: 1.0.0

## Purpose

Maintain the element registry (`element-registry.json`) through a self-closing loop: detect code changes → mark stale elements → re-stitch affected routes → validate health → archive evidence → push evolution candidates. This Skill automates registry freshness and closes the gap between code changes and test selector drift.

## When to Use

Invoke this Skill when:

- **Code change detected**: a commit modifies source files — detect affected routes and re-stitch
- **E2E test failure**: a test fails with selector errors — re-stitch with fresh browser snapshots and diagnose drift
- **Periodic health check**: scheduled scan to detect staleness before tests catch it
- **Registry drift reported**: health check shows `drifted` or `degraded` — investigate and resolve
- **Evolution queue review**: human review of auto-generated KE/RE candidates

Do NOT use when:

- The codebase has no registry yet (use `frontend-registry-stitch` for initial onboarding)
- Capturing browser elements for the first time (use `frontend-e2e-explorer`)
- Adding new anchor strategies or modifying the stitching algorithm (manual code change)

## Architecture

The self-closing loop has 5 layers:

```
Trigger Layer ──→ Detection Layer ──→ Schedule Layer ──→ Execute Layer ──→ Archive Layer
(git/CI/e2e)     (detector.ts)       (scheduler.ts)     (merger.ts)       (archive.ts)
                                     (validator.ts)
```

### Layer 1: Trigger

Three trigger sources, prioritized: `e2e-failure` > `commit` > `periodic`.

### Layer 2: Detection (`src/testability/element-registry/detector.ts`)

Maps changed files to affected routes using `moduleConfig.tsx` + `router.tsx` analysis.

| File pattern | Affected routes |
|-------------|----------------|
| `src/shell/**`, `src/app/**`, `src/shared/**` | All routes |
| `src/domains/<M>/pages/<P>.tsx` | Exact routes in module `<M>` |
| `src/domains/<M>/components/**` | All routes in module `<M>` |

### Layer 3: Schedule (`src/testability/element-registry/scheduler.ts`)

In-memory priority queue with 5-second dedup window. Overlapping route batches are merged; priority upgrades to highest.

### Layer 4: Execute (`src/testability/element-registry/merger.ts` + `validator.ts`)

Two modes:
- **Commit/periodic**: rebuilds `BrowserElement[]` from existing registry entries (code-side re-evaluation)
- **E2E-failure**: uses fresh browser snapshots from MCP capture

After re-stitch, `validator.ts` compares before/after health:
- `healthy` — no significant change
- `drifted` — match rate shift ≥ 5% or element count change ≥ 15%
- `degraded` — match rate shift ≥ 15% or element count change ≥ 30%

### Layer 5: Archive (`src/testability/element-registry/archive.ts`)

Saves stitch report to `docs/08-frontend-agent/evidence/stitch-reports/`. When health is `drifted` or `degraded`, pushes candidates to:
- **KE** (knowledge-evolution-queue): component-map needs updating
- **RE** (rule-evolution-queue): enforce re-stitch discipline

## CLI Commands

### Check staleness (dry-run)

```bash
npm run registry:check
```

Scans all routes in the registry and reports which have stale elements.

### Commit trigger

```bash
npx tsx scripts/registry-refresh.ts \
  --trigger commit \
  --files "src/domains/task/components/TaskTable.tsx,src/shell/layout/GlobalShell.tsx"
```

Detects affected routes from changed files, marks stale, re-stitches, validates health, and archives.

### E2E failure trigger

```bash
npx tsx scripts/registry-refresh.ts \
  --trigger e2e-failure \
  --routes "/task/list/all" \
  --snapshots "artifacts/browser-snapshots/route-elements-v2.json"
```

Uses fresh browser snapshots for re-stitching (not registry rebuild). Compares against previous registry state to detect drift.

### Periodic scan

```bash
npx tsx scripts/registry-refresh.ts --trigger periodic
```

Scans all routes for stale elements and re-stitches any that have drifted.

## Procedure

### Step 1: Trigger received

Determine the trigger source (git hook, CI failure, scheduled job). Collect:
- Changed file list (commit trigger)
- Failed routes (e2e trigger)
- Or all routes (periodic trigger)

### Step 2: Detect affected routes

Run `detectAffectedRoutes(changedFiles)` to map files → routes. For e2e-failure, routes come directly from the test failure. For periodic, scan all routes with `staleSince` set.

### Step 3: Schedule and execute

The CLI orchestrator handles queueing, dedup, and execution. Monitor the output for:
- Each route's match results (matched/total, confidence distribution)
- Errors during re-stitch (missing code index, corrupt registry)

### Step 4: Review health report

Check the health summary:

```
--- Health Check: HEALTHY/DRIFTED/DEGRADED ---
```

- **healthy**: no action needed
- **drifted**: review the per-route details; check if recent code changes explain the drift
- **degraded**: immediate attention needed; likely a test will fail soon

### Step 5: Act on evolution candidates

When `drifted` or `degraded`, the system auto-pushes candidates to the evolution queues. Human review required:

1. Check `knowledge-evolution-queue.md` for new KE entries
2. Check `rule-evolution-queue.md` for new RE entries
3. Validate the evidence (read the stitch report)
4. Accept or reject each candidate

### Step 6: Close the loop

After addressing drift:
1. Fix the root cause (update component, add testids, fix selectors)
2. Regenerate code index if source changed: `npx tsx src/testability/element-registry/discovery/code-indexer.ts`
3. Re-run the appropriate trigger to verify health returns to `healthy`

## Outputs

| Output | Location | Format |
|--------|----------|--------|
| Updated registry | `docs/02-harness/knowledge/frontend/element-registry.json` | JSON |
| Stitch report | `docs/08-frontend-agent/evidence/stitch-reports/stitch-report-<timestamp>.md` | Markdown |
| Knowledge candidates | `docs/08-frontend-agent/evolution/knowledge-evolution-queue.md` | Markdown table |
| Rule candidates | `docs/08-frontend-agent/evolution/rule-evolution-queue.md` | Markdown table |

## Cross-References

- `frontend-registry-stitch` — initial registry onboarding and full re-stitch
- `frontend-e2e-explorer` — browser element capture (produces snapshots consumed by e2e-failure trigger)
- `skill-evolution-maintainer` — evolution queue review and promotion process
- `docs/08-frontend-agent/element-stitching-protocol.md` — stitching protocol design
- `docs/08-frontend-agent/evolution/README.md` — evolution system overview
