/**
 * Report archiving and evolution queue integration.
 *
 * - saveStitchReport(): archives a markdown report to evidence/stitch-reports/
 * - pushToEvolutionQueue(): when health is drifted/degraded, appends
 *   candidates to the appropriate evolution queue files.
 *
 * Mapping:
 *   drifted  → KE (knowledge: component-map outdated)
 *   degraded → KE + RE (knowledge + rule: elements need re-stitch enforcement)
 */

import fs from 'fs';
import path from 'path';
import type { RegistryHealth } from './validator';
import type { StitchPriority } from './scheduler';

// ── Helpers ──

function nextId(content: string, prefix: string): string {
  const re = new RegExp(`\\| ${prefix}-(\\d+) \\|`, 'g');
  let max = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    const n = parseInt(m[1], 10);
    if (n > max) max = n;
  }
  return `${prefix}-${String(max + 1).padStart(3, '0')}`;
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ── Report archiving ──

export function saveStitchReport(
  health: RegistryHealth,
  triggeredBy: StitchPriority,
  affectedRoutes: string[],
  projectRoot: string,
): string {
  const dir = path.join(projectRoot, 'docs/08-frontend-agent/evidence/stitch-reports');
  ensureDir(dir);

  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filename = `stitch-report-${timestamp}.md`;
  const filepath = path.join(dir, filename);

  const lines: string[] = [
    `# Registry Stitch Report`,
    '',
    `- **Date:** ${now.toISOString()}`,
    `- **Trigger:** ${triggeredBy}`,
    `- **Health:** ${health.overallStatus.toUpperCase()}`,
    `- **Routes affected:** ${affectedRoutes.length}`,
    '',
    '## Health Summary',
    '',
    `**Overall:** ${health.overallStatus}`,
    '',
  ];

  if (health.summary !== 'All routes healthy') {
    lines.push('```');
    lines.push(health.summary);
    lines.push('```');
  } else {
    lines.push('All routes healthy — no drift detected.');
  }

  lines.push('');
  lines.push('## Per-Route Details');
  lines.push('');
  lines.push('| Route | Status | Before (matched/total) | After (matched/total) | Match Δ | Details |');
  lines.push('|-------|--------|------------------------|-----------------------|---------|---------|');

  for (const d of health.routes) {
    const beforeStr = `${d.before.matched}/${d.before.totalElements}`;
    const afterStr = `${d.after.matched}/${d.after.totalElements}`;
    const deltaPct = (d.matchRateDelta * 100).toFixed(1);
    const deltaStr = deltaPct.startsWith('-') ? deltaPct : `+${deltaPct}`;
    lines.push(
      `| ${d.route} | ${d.status} | ${beforeStr} | ${afterStr} | ${deltaStr}% | ${d.details.join('; ')} |`,
    );
  }

  lines.push('');

  fs.writeFileSync(filepath, lines.join('\n'), 'utf-8');
  return filepath;
}

// ── Evolution queue integration ──

interface EvolutionCandidate {
  id: string;
  candidate: string;
  evidence: string;
  priority: 'high' | 'medium' | 'low';
}

function pushToKnowledgeQueue(
  candidates: EvolutionCandidate[],
  projectRoot: string,
): void {
  const filepath = path.join(
    projectRoot,
    'docs/08-frontend-agent/evolution/knowledge-evolution-queue.md',
  );
  let content = fs.readFileSync(filepath, 'utf-8');

  // Insert after the table separator line (first | --- | row after "## Queue")
  const queueSection = content.indexOf('## Queue');
  const separatorEnd = content.indexOf('\n', content.indexOf('| ---', queueSection)) + 1;
  const dateStr = today();

  let newRows = '';
  for (const c of candidates) {
    newRows += `| ${c.id} | ${c.candidate} | ${c.evidence} | ${c.priority} | pending | ${dateStr} |\n`;
  }
  content = content.slice(0, separatorEnd) + newRows + content.slice(separatorEnd);

  // Append decision records
  for (const c of candidates) {
    const record = [
      '',
      `### ${c.id} (pending ${dateStr})`,
      '',
      `- **Candidate:** ${c.candidate}`,
      `- **Evidence:** ${c.evidence}`,
      `- **Decision:** Pending human review. Auto-generated from registry health check.`,
      `- **Outcome:** TBD.`,
      '',
    ].join('\n');
    content += record;
  }

  fs.writeFileSync(filepath, content, 'utf-8');
  console.log(`  Knowledge queue updated: ${candidates.map((c) => c.id).join(', ')}`);
}

function pushToRuleQueue(
  candidates: EvolutionCandidate[],
  projectRoot: string,
): void {
  const filepath = path.join(
    projectRoot,
    'docs/08-frontend-agent/evolution/rule-evolution-queue.md',
  );
  let content = fs.readFileSync(filepath, 'utf-8');

  // Insert after the table separator line (first | --- | row after "## Queue")
  const queueSection = content.indexOf('## Queue');
  const separatorEnd = content.indexOf('\n', content.indexOf('| ---', queueSection)) + 1;
  const dateStr = today();

  let newRows = '';
  for (const c of candidates) {
    newRows += `| ${c.id} | ${c.candidate} | ${c.evidence} | ${c.priority} | pending | ${dateStr} |\n`;
  }
  content = content.slice(0, separatorEnd) + newRows + content.slice(separatorEnd);

  for (const c of candidates) {
    const record = [
      '',
      `### ${c.id} (pending ${dateStr})`,
      '',
      `- **Candidate:** ${c.candidate}`,
      `- **Evidence:** ${c.evidence}`,
      `- **Decision:** Pending human review. Auto-generated from registry health check.`,
      `- **Outcome:** TBD.`,
      '',
    ].join('\n');
    content += record;
  }

  fs.writeFileSync(filepath, content, 'utf-8');
  console.log(`  Rule queue updated: ${candidates.map((c) => c.id).join(', ')}`);
}

/**
 * Analyze health deltas and push evolution candidates to the appropriate queues.
 *
 * - drifted → KE (knowledge-evolution-queue): component-map may be outdated
 * - degraded → KE + RE (rule-evolution-queue): enforce re-stitch on test failure
 */
export function pushToEvolutionQueue(
  health: RegistryHealth,
  triggeredBy: StitchPriority,
  projectRoot: string,
): { knowledge: string[]; rule: string[] } {
  const keCandidates: EvolutionCandidate[] = [];
  const reCandidates: EvolutionCandidate[] = [];

  // Read existing queue files for ID generation
  const kePath = path.join(projectRoot, 'docs/08-frontend-agent/evolution/knowledge-evolution-queue.md');
  const rePath = path.join(projectRoot, 'docs/08-frontend-agent/evolution/rule-evolution-queue.md');
  const keContent = fs.readFileSync(kePath, 'utf-8');
  const reContent = fs.readFileSync(rePath, 'utf-8');

  const dateStr = today();
  const driftedRoutes = health.routes.filter((d) => d.status === 'drifted' || d.status === 'degraded');

  if (driftedRoutes.length === 0) {
    return { knowledge: [], rule: [] };
  }

  // Build evidence reference string from route details
  const routeList = driftedRoutes.map((d) => d.route).join(', ');
  const evidenceRef = `Registry health check ${dateStr} (trigger: ${triggeredBy}, routes: ${routeList})`;

  // KE: component-map drift
  for (const d of driftedRoutes) {
    const id = nextId(keContent, 'KE');
    keCandidates.push({
      id,
      candidate: `Update component-map for ${d.route}: ${d.details.join('; ')}`,
      evidence: evidenceRef,
      priority: d.status === 'degraded' ? 'high' : 'medium',
    });
  }

  // RE: degraded routes need re-stitch enforcement
  const degradedRoutes = health.routes.filter((d) => d.status === 'degraded');
  if (degradedRoutes.length > 0) {
    const id = nextId(reContent, 'RE');
    reCandidates.push({
      id,
      candidate: `Registry elements on ${degradedRoutes.map((d) => d.route).join(', ')} must be re-stitched after code changes that modify element selectors`,
      evidence: evidenceRef,
      priority: 'high',
    });
  }

  if (keCandidates.length > 0) {
    pushToKnowledgeQueue(keCandidates, projectRoot);
  }
  if (reCandidates.length > 0) {
    pushToRuleQueue(reCandidates, projectRoot);
  }

  return {
    knowledge: keCandidates.map((c) => c.id),
    rule: reCandidates.map((c) => c.id),
  };
}
