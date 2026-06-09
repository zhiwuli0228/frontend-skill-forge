import type { ElementRegistry, StitchReport } from './types';

// ── Health types ──

export interface RouteHealth {
  totalElements: number;
  matched: number;
  highConfidence: number;
  mediumConfidence: number;
  lowConfidence: number;
  unmatched: number;
  matchRate: number;
}

export type HealthStatus = 'healthy' | 'drifted' | 'degraded';

export interface HealthDelta {
  route: string;
  status: HealthStatus;
  before: RouteHealth;
  after: RouteHealth;
  matchRateDelta: number;
  highConfDelta: number;
  details: string[];
}

export interface RegistryHealth {
  overallStatus: HealthStatus;
  routes: HealthDelta[];
  summary: string;
}

// ── Thresholds ──

const DRIFT_MATCH_RATE_DROP = 0.05; // 5% match rate drop → drifted
const DEGRADED_MATCH_RATE_DROP = 0.15; // 15% match rate drop → degraded
const DEGRADED_HIGH_CONF_DROP = 0.2; // 20% high-confidence drop → degraded

// ── Helpers ──

function extractHealth(report: StitchReport): RouteHealth {
  const { totalElements, matched, highConfidence, mediumConfidence, lowConfidence, unmatched } = report;
  return {
    totalElements,
    matched,
    highConfidence,
    mediumConfidence,
    lowConfidence,
    unmatched,
    matchRate: totalElements > 0 ? matched / totalElements : 0,
  };
}

function classifyDelta(delta: HealthDelta): HealthStatus {
  const matchDrop = delta.before.matchRate - delta.after.matchRate;
  const highConfDrop = delta.before.highConfidence / Math.max(delta.before.totalElements, 1) -
    delta.after.highConfidence / Math.max(delta.after.totalElements, 1);

  // Absolute element count change (either direction) >= 20% → at least drifted
  const elementChange = Math.abs(delta.after.totalElements - delta.before.totalElements);
  const elementChangeRate = elementChange / Math.max(delta.before.totalElements, 1);

  if (matchDrop >= DEGRADED_MATCH_RATE_DROP || highConfDrop >= DEGRADED_HIGH_CONF_DROP) {
    return 'degraded';
  }
  if (elementChangeRate >= 0.3) {
    return 'degraded';
  }
  if (matchDrop >= DRIFT_MATCH_RATE_DROP || delta.after.unmatched !== delta.before.unmatched || elementChangeRate >= 0.15) {
    return 'drifted';
  }
  return 'healthy';
}

function buildDetails(before: RouteHealth, after: RouteHealth): string[] {
  const details: string[] = [];

  if (after.unmatched !== before.unmatched) {
    const diff = after.unmatched - before.unmatched;
    const sign = diff > 0 ? '+' : '';
    details.push(`unmatched: ${before.unmatched} → ${after.unmatched} (${sign}${diff})`);
  }
  if (after.matchRate !== before.matchRate) {
    details.push(`match rate: ${(before.matchRate * 100).toFixed(0)}% → ${(after.matchRate * 100).toFixed(0)}%`);
  }
  if (after.totalElements !== before.totalElements) {
    details.push(`elements: ${before.totalElements} → ${after.totalElements}`);
  }

  if (details.length === 0) {
    details.push('no significant change');
  }

  return details;
}

// ── Public API ──

export function computeRouteHealth(report: StitchReport): RouteHealth {
  return extractHealth(report);
}

export function compareRouteHealth(before: RouteHealth, after: RouteHealth, route: string): HealthDelta {
  const delta: HealthDelta = {
    route,
    status: 'healthy',
    before,
    after,
    matchRateDelta: after.matchRate - before.matchRate,
    highConfDelta: (after.highConfidence / Math.max(after.totalElements, 1)) -
      (before.highConfidence / Math.max(before.totalElements, 1)),
    details: buildDetails(before, after),
  };

  delta.status = classifyDelta(delta);
  return delta;
}

/**
 * Compare two registry snapshots and produce a health report.
 * Used after a re-stitch to detect if the registry has drifted or degraded.
 */
export function validateRegistryHealth(
  before: ElementRegistry,
  after: ElementRegistry,
): RegistryHealth {
  const deltas: HealthDelta[] = [];
  const seenRoutes = new Set([
    ...Object.keys(before.stitchReport),
    ...Object.keys(after.stitchReport),
  ]);

  for (const route of seenRoutes) {
    const beforeReport = before.stitchReport[route];
    const afterReport = after.stitchReport[route];

    if (!beforeReport && afterReport) {
      deltas.push({
        route,
        status: 'healthy',
        before: { totalElements: 0, matched: 0, highConfidence: 0, mediumConfidence: 0, lowConfidence: 0, unmatched: 0, matchRate: 0 },
        after: extractHealth(afterReport),
        matchRateDelta: 1,
        highConfDelta: 0,
        details: ['new route — baseline established'],
      });
      continue;
    }

    if (beforeReport && !afterReport) {
      deltas.push({
        route,
        status: 'degraded',
        before: extractHealth(beforeReport),
        after: { totalElements: 0, matched: 0, highConfidence: 0, mediumConfidence: 0, lowConfidence: 0, unmatched: 0, matchRate: 0 },
        matchRateDelta: -1,
        highConfDelta: -1,
        details: ['route removed from registry'],
      });
      continue;
    }

    if (beforeReport && afterReport) {
      const b = extractHealth(beforeReport);
      const a = extractHealth(afterReport);
      deltas.push(compareRouteHealth(b, a, route));
    }
  }

  // Overall status: most severe wins
  const hasDegraded = deltas.some((d) => d.status === 'degraded');
  const hasDrifted = deltas.some((d) => d.status === 'drifted');
  const overallStatus: HealthStatus = hasDegraded ? 'degraded' : hasDrifted ? 'drifted' : 'healthy';

  const summaryLines: string[] = [];
  for (const d of deltas) {
    if (d.status !== 'healthy') {
      summaryLines.push(`[${d.status}] ${d.route}: ${d.details.join('; ')}`);
    }
  }

  return {
    overallStatus,
    routes: deltas,
    summary: summaryLines.length > 0 ? summaryLines.join('\n') : 'All routes healthy',
  };
}
