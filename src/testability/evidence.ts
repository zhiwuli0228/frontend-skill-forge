export interface EvidenceMetadata {
  runId: string;
  scenarioId: string;
  page: string;
  state: 'loaded' | 'empty' | 'error' | 'loading' | 'drawer-open' | 'modal-open' | 'unknown';
  timestamp: string;
  result: 'pass' | 'partial' | 'fail' | 'blocked';
  artifactPaths: {
    screenshot?: string;
    trace?: string;
    consoleLog?: string;
    networkLog?: string;
    domSnapshot?: string;
  };
  notes?: string;
}

export interface EvidencePathParts {
  runId: string;
  category: 'screenshots' | 'playwright-html' | 'traces' | 'raw-logs' | 'json';
  fileName: string;
  absolute: string;
  relative: string;
}

export function buildEvidencePath(
  runId: string,
  category: EvidencePathParts['category'],
  fileName: string,
): EvidencePathParts {
  const relative = `artifacts/validation/${category}/${fileName}`;
  return {
    runId,
    category,
    fileName,
    absolute: relative,
    relative,
  };
}

export function buildScreenshotName(
  runId: string,
  page: string,
  state: EvidenceMetadata['state'],
  index: number = 0,
): string {
  const pageSlug = page.replace(/^\//, '').replace(/\//g, '-');
  const indexStr = index.toString().padStart(2, '0');
  return `${runId}-${pageSlug}-${state}-${indexStr}.png`;
}

export function buildFindingMarkdown(meta: EvidenceMetadata): string {
  const lines: string[] = [];
  lines.push(`# Finding: ${meta.scenarioId}`);
  lines.push('');
  lines.push(`- Date: ${meta.timestamp}`);
  lines.push(`- Run ID: ${meta.runId}`);
  lines.push(`- Scenario: ${meta.scenarioId}`);
  lines.push(`- Page: ${meta.page}`);
  lines.push(`- State: ${meta.state}`);
  lines.push(`- Result: ${meta.result}`);
  lines.push('');
  lines.push('## Evidence paths');
  lines.push('');
  const entries = Object.entries(meta.artifactPaths).filter(([, v]) => Boolean(v));
  if (entries.length === 0) {
    lines.push('- (none)');
  } else {
    for (const [kind, path] of entries) {
      lines.push(`- ${kind}: \`${path}\``);
    }
  }
  if (meta.notes) {
    lines.push('');
    lines.push('## Notes');
    lines.push('');
    lines.push(meta.notes);
  }
  lines.push('');
  return lines.join('\n');
}
