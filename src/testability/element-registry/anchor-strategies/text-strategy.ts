import type { BrowserElement, CodeComponent } from '../types';
import type { AnchorStrategy, CodeMatch } from './index';

/**
 * Matches elements by visible text content. Falls back when testid is absent.
 */
export const textStrategy: AnchorStrategy = {
  name: 'text',

  extractBrowserFeature(el: BrowserElement): string | null {
    if (!el.visibleText || el.visibleText.length < 2) return null;
    return el.visibleText;
  },

  findCodeMatches(feature: string, components: CodeComponent[]): CodeMatch[] {
    const results: CodeMatch[] = [];
    const normalized = feature.toLowerCase().trim();

    for (const comp of components) {
      const matches = comp.jsxVisibleTexts.filter((t) => {
        const nt = t.toLowerCase().trim();
        return nt === normalized || nt.includes(normalized);
      });
      if (matches.length > 0) {
        results.push({
          component: comp,
          matchReason: `text match: "${matches[0]}" ↔ "${feature}"`,
        });
      }
    }
    return results;
  },

  scoreMatch(browser: BrowserElement, code: CodeMatch): number {
    const feature = browser.visibleText?.toLowerCase().trim() ?? '';
    // Exact match is high-ish, substring is lower
    const matchedText = code.matchReason.match(/"([^"]+)"/)?.[1]?.toLowerCase();
    if (matchedText === feature) return 0.75;
    return 0.55;
  },

  isViable(profile): boolean {
    return profile.textUniqueness >= 0.4;
  },
};
