# Element Registry Maintainer — References

Supplementary material for `element-registry-maintainer`. Load only when needed.

## Architecture: Self-Closing Loop

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

### Layer 3: Schedule (`src/testability/element-registry/scheduler.ts`)

In-memory priority queue with 5-second dedup window. Overlapping route batches are merged; priority upgrades to highest.

### Layer 4: Execute (`src/testability/element-registry/merger.ts` + `validator.ts`)

After re-stitch, `validator.ts` compares before/after health:
- `healthy` — no significant change
- `drifted` — match rate shift ≥ 5% or element count change ≥ 15%
- `degraded` — match rate shift ≥ 15% or element count change ≥ 30%

### Layer 5: Archive (`src/testability/element-registry/archive.ts`)

Saves stitch report to `docs/08-frontend-agent/evidence/stitch-reports/`. When health is `drifted` or `degraded`, pushes candidates to:
- **KE** (knowledge-evolution-queue): component-map needs updating
- **RE** (rule-evolution-queue): enforce re-stitch discipline

## CLI Reference

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

## Output Destinations

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
