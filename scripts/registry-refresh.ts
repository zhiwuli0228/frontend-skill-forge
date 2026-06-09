/**
 * Registry Refresh — CLI orchestrator for the self-closing loop.
 *
 * Modes:
 *   commit:  npx tsx scripts/registry-refresh.ts --trigger commit --files <changed-files>
 *   e2e:     npx tsx scripts/registry-refresh.ts --trigger e2e-failure --routes /task/list/all [--snapshots <file>]
 *   periodic:npx tsx scripts/registry-refresh.ts --trigger periodic
 *   check:   npx tsx scripts/registry-refresh.ts --check  (dry-run, reports staleness)
 *
 * Flow: detect → schedule → markStale → restitch → validate → report
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { detectAffectedRoutes } from '../src/testability/element-registry/detector.ts';
import { StitchScheduler } from '../src/testability/element-registry/scheduler.ts';
import type { StitchPriority } from '../src/testability/element-registry/scheduler.ts';
import {
  markStale,
  restitchRouteIntoRegistry,
  mergeStitchedIntoRegistry,
} from '../src/testability/element-registry/merger.ts';
import { stitchRoute } from '../src/testability/element-registry/stitch.ts';
import { validateRegistryHealth } from '../src/testability/element-registry/validator.ts';
import {
  saveStitchReport,
  pushToEvolutionQueue,
} from '../src/testability/element-registry/archive.ts';
import type {
  ElementRegistry,
  CodeIndex,
  BrowserElement,
  RouteElementSnapshot,
} from '../src/testability/element-registry/types.ts';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, '..');
const REGISTRY_PATH = path.join(
  PROJECT_ROOT,
  'docs/02-harness/knowledge/frontend/element-registry.json',
);
const CODE_INDEX_PATH = path.join(
  PROJECT_ROOT,
  'docs/02-harness/knowledge/frontend/code-index.json',
);

function loadRegistry(): ElementRegistry | null {
  if (!fs.existsSync(REGISTRY_PATH)) return null;
  return JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
}

function saveRegistry(registry: ElementRegistry): void {
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2), 'utf-8');
}

function getCommitHash(): string {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf-8', cwd: PROJECT_ROOT }).trim();
  } catch {
    return 'unknown';
  }
}

function parseArgs(): {
  trigger?: StitchPriority;
  files?: string[];
  routes?: string[];
  snapshots?: string;
  check: boolean;
} {
  const args = process.argv.slice(2);
  const result: ReturnType<typeof parseArgs> = { check: false };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--trigger':
        result.trigger = args[++i] as StitchPriority;
        break;
      case '--files':
        result.files = args[++i].split(',');
        break;
      case '--routes':
        result.routes = args[++i].split(',');
        break;
      case '--snapshots':
        result.snapshots = args[++i];
        break;
      case '--check':
        result.check = true;
        break;
    }
  }
  return result;
}

function loadSnapshots(
  snapshotsPath: string,
): Record<string, RouteElementSnapshot> {
  const raw: Record<string, BrowserElement[]> = JSON.parse(
    fs.readFileSync(snapshotsPath, 'utf-8'),
  );
  const snapshots: Record<string, RouteElementSnapshot> = {};
  for (const [route, elements] of Object.entries(raw)) {
    snapshots[route] = {
      route,
      capturedAt: new Date().toISOString(),
      elements,
    };
  }
  return snapshots;
}

function main(): void {
  const args = parseArgs();
  const registry = loadRegistry();
  const codeIndex: CodeIndex = JSON.parse(fs.readFileSync(CODE_INDEX_PATH, 'utf-8'));
  const commitHash = getCommitHash();

  if (!registry) {
    console.log('No registry found. Run a full stitch first: npx tsx scripts/run-stitch.ts');
    process.exit(1);
  }

  // Snapshot the registry before modifications for health comparison
  const registryBefore = JSON.parse(JSON.stringify(registry)) as ElementRegistry;

  // Determine affected routes
  let affectedRoutes: string[];

  if (args.routes && args.routes.length > 0) {
    affectedRoutes = args.routes;
  } else if (args.files && args.files.length > 0) {
    const result = detectAffectedRoutes(args.files, PROJECT_ROOT);
    console.log(`\nDetected changes:`);
    console.log(`  Files: ${result.changedFiles.join(', ')}`);
    console.log(`  Affected modules: ${result.affectedModules.join(', ') || '(none)'}`);
    console.log(`  Shell change: ${result.isShellChange}`);
    console.log(`  Global change: ${result.isGlobalChange}`);
    affectedRoutes = result.affectedRoutes;
  } else if (args.trigger === 'periodic' || args.check) {
    affectedRoutes = [];
    for (const [route, elements] of Object.entries(registry.routes)) {
      const hasStale = elements.some((el) => el.staleSince);
      if (hasStale) affectedRoutes.push(route);
    }
    if (affectedRoutes.length === 0) {
      console.log('All routes are fresh — no stale elements found.');
      process.exit(0);
    }
    console.log(`Found ${affectedRoutes.length} route(s) with stale elements`);
  } else {
    console.log('Usage: npx tsx scripts/registry-refresh.ts [--check] [--trigger <type>] [--files <list>] [--routes <list>] [--snapshots <file>]');
    console.log('  --check          Dry-run: report staleness without re-stitching');
    console.log('  --trigger commit | e2e-failure | periodic');
    console.log('  --files          Comma-separated changed file paths');
    console.log('  --routes         Comma-separated route paths');
    console.log('  --snapshots      Path to fresh browser snapshots JSON (for e2e-failure)');
    process.exit(1);
  }

  if (affectedRoutes.length === 0) {
    console.log('No affected routes detected.');
    process.exit(0);
  }

  console.log(`\nAffected routes: ${affectedRoutes.join(', ')}`);

  if (args.check) {
    console.log('\n--- Staleness Report (dry-run) ---');
    for (const route of affectedRoutes) {
      const elements = registry.routes[route] ?? [];
      const staleCount = elements.filter((el) => el.staleSince).length;
      console.log(`  ${route}: ${elements.length} elements, ${staleCount} stale`);
    }
    process.exit(0);
  }

  // ── E2E-failure mode with fresh snapshots ──
  const hasFreshSnapshots = args.snapshots && args.trigger === 'e2e-failure';
  let freshSnapshots: Record<string, RouteElementSnapshot> | undefined;

  if (hasFreshSnapshots && args.snapshots) {
    console.log(`\nLoading fresh browser snapshots from: ${args.snapshots}`);
    freshSnapshots = loadSnapshots(args.snapshots);
    console.log(`  Routes in snapshot: ${Object.keys(freshSnapshots).join(', ')}`);
  }

  // Schedule and process
  const priority = args.trigger ?? 'commit';
  const reason = args.trigger === 'e2e-failure'
    ? 'E2E test failure detected'
    : args.trigger === 'periodic'
      ? 'Periodic freshness scan'
      : 'Code change detected';

  const scheduler = new StitchScheduler();
  scheduler.enqueue(affectedRoutes, priority, reason);

  let batch;
  while ((batch = scheduler.dequeue()) !== null) {
    console.log(`\n--- Re-stitching batch ${batch.id} (${batch.routes.length} routes, priority: ${batch.priority}) ---`);

    markStale(batch.routes, registry);

    for (const route of batch.routes) {
      try {
        if (freshSnapshots && freshSnapshots[route]) {
          // Use fresh browser snapshot for stitching
          const snapshot = freshSnapshots[route];
          const { elements, unmatched, report } = stitchRoute(route, snapshot, codeIndex);
          mergeStitchedIntoRegistry(registry, route, elements, unmatched, report, commitHash);
          console.log(
            `  ${route}: ${report.matched}/${report.totalElements} matched ` +
            `(${report.highConfidence} high, ${report.mediumConfidence} med, ${report.unmatched} unmatched) [fresh snapshot]`,
          );
        } else {
          // Rebuild from registry (code-side re-evaluation)
          restitchRouteIntoRegistry(route, registry, codeIndex, commitHash);
          const report = registry.stitchReport[route];
          console.log(
            `  ${route}: ${report.matched}/${report.totalElements} matched ` +
            `(${report.highConfidence} high, ${report.mediumConfidence} med, ${report.unmatched} unmatched)`,
          );
        }
        scheduler.complete(batch.id);
      } catch (err) {
        console.error(`  ${route}: ERROR — ${err instanceof Error ? err.message : err}`);
        scheduler.error(batch.id);
      }
    }
  }

  // ── Health validation ──
  const health = validateRegistryHealth(registryBefore, registry);
  console.log(`\n--- Health Check: ${health.overallStatus.toUpperCase()} ---`);
  if (health.summary === 'All routes healthy') {
    console.log('  All routes healthy — no drift detected.');
  } else {
    console.log(health.summary);
  }

  // ── Archive & evolution ──
  const reportPath = saveStitchReport(health, priority, affectedRoutes, PROJECT_ROOT);
  console.log(`\nReport archived: ${path.relative(PROJECT_ROOT, reportPath)}`);

  if (health.overallStatus !== 'healthy') {
    const evo = pushToEvolutionQueue(health, priority, PROJECT_ROOT);
    if (evo.knowledge.length > 0 || evo.rule.length > 0) {
      console.log(`Evolution candidates pushed:`);
      if (evo.knowledge.length > 0) console.log(`  KE: ${evo.knowledge.join(', ')}`);
      if (evo.rule.length > 0) console.log(`  RE: ${evo.rule.join(', ')}`);
    }
  }

  // ── Save & summary ──
  saveRegistry(registry);

  const stats = scheduler.getStats();
  console.log(`\n=== Registry Refresh Complete ===`);
  console.log(`Processed: ${stats.totalProcessed} batches`);
  console.log(`Health: ${health.overallStatus}`);
  console.log(`Registry saved to: ${path.relative(PROJECT_ROOT, REGISTRY_PATH)}`);
}

main();
