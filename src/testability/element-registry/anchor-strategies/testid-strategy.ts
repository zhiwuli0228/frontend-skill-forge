import type { BrowserElement, CodeComponent } from '../types';
import type { AnchorStrategy, CodeMatch } from './index';

/**
 * Matches elements by data-testid. Highest-confidence strategy when
 * testids exist in the project.
 */
/** Strip template literal syntax to get the static value: `` `tab-${x}` `` → `tab-` */
function extractPrefix(template: string): string {
  // Strip leading backtick/quote and take everything before ${
  const cleaned = template.replace(/^[`'"](.+)\$\{.*/, '$1');
  return cleaned;
}

/** Strip template syntax entirely: `` `foo` `` or `` `foo-${x}` `` → `foo` */
function stripTemplate(raw: string): string {
  // Static template: `foo` → foo
  if (raw.startsWith('`') && raw.endsWith('`') && !raw.includes('${')) {
    return raw.slice(1, -1);
  }
  // Dynamic template: `foo-${x}` → foo-
  if (raw.includes('${')) {
    return extractPrefix(raw);
  }
  return raw;
}

export const testidStrategy: AnchorStrategy = {
  name: 'testid',

  extractBrowserFeature(el: BrowserElement): string | null {
    return el.testid ?? null;
  },

  findCodeMatches(feature: string, components: CodeComponent[]): CodeMatch[] {
    const results: CodeMatch[] = [];
    for (const comp of components) {
      const exact = comp.jsxTestIds.find(
        (t) => t === feature || stripTemplate(t) === feature,
      );
      if (exact) {
        results.push({
          component: comp,
          matchReason: `testid exact match: ${feature}`,
        });
      }
      // Prefix match for dynamic testids (e.g. browser `tab--task-create`
      // matches code template `` `tab-${sanitizeKey(tab.key)}` ``).
      const prefixCandidate = comp.jsxTestIds.find(
        (t) => t.includes('${') && feature.startsWith(extractPrefix(t)),
      );
      if (prefixCandidate && !results.find((r) => r.component === comp)) {
        results.push({
          component: comp,
          matchReason: `testid prefix match: ${extractPrefix(prefixCandidate)} ← ${feature}`,
        });
      }
    }
    return results;
  },

  scoreMatch(_browser: BrowserElement, code: CodeMatch): number {
    // Exact testid matches get near-perfect confidence
    return code.matchReason.startsWith('testid exact') ? 0.98 : 0.85;
  },

  isViable(profile): boolean {
    return profile.testidCoverage >= 0.3;
  },
};
