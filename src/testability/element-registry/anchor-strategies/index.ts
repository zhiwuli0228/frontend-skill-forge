import type { CodeComponent, ProjectAnchorProfile, BrowserElement } from '../types';

export interface AnchorStrategy {
  name: string;
  /** Extract a feature string from a browser element */
  extractBrowserFeature(el: BrowserElement): string | null;
  /** Find code-side matches */
  findCodeMatches(
    feature: string,
    components: CodeComponent[],
  ): CodeMatch[];
  /** Score confidence of the match (0-1) */
  scoreMatch(browser: BrowserElement, code: CodeMatch): number;
  /** Whether this strategy is viable */
  isViable(profile: ProjectAnchorProfile): boolean;
}

export interface CodeMatch {
  component: CodeComponent;
  matchReason: string; // e.g., "testid exact match: task-filter-bar"
}

/**
 * Compute the project's anchor profile from code index stats.
 */
export function computeProjectProfile(
  components: Record<string, CodeComponent>,
): ProjectAnchorProfile {
  const all = Object.values(components);
  const totalComps = all.length;

  // testid coverage: % of components that have at least one testid
  const withTestId = all.filter((c) => c.jsxTestIds.length > 0).length;
  const testidCoverage = totalComps > 0 ? withTestId / totalComps : 0;

  // text uniqueness: % of text strings that appear in only one component
  const allTexts = all.flatMap((c) => c.jsxVisibleTexts);
  const textFreq = new Map<string, number>();
  for (const t of allTexts) {
    textFreq.set(t, (textFreq.get(t) ?? 0) + 1);
  }
  const uniqueTexts = [...textFreq.values()].filter((v) => v === 1).length;
  const textUniqueness = allTexts.length > 0 ? uniqueTexts / allTexts.length : 0;

  // aria-label coverage
  const withAria = all.filter((c) => c.jsxAriaLabels.length > 0).length;
  const ariaLabelCoverage = totalComps > 0 ? withAria / totalComps : 0;

  // Recommend primary / fallback
  let primary = 'text';
  let fallback = 'component-role';
  if (testidCoverage >= 0.3) {
    primary = 'testid';
    fallback = 'text';
  } else if (ariaLabelCoverage >= 0.2) {
    primary = 'aria';
    fallback = 'text';
  }

  return {
    testidCoverage,
    textUniqueness,
    ariaLabelCoverage,
    recommendedPrimary: primary,
    recommendedFallback: fallback,
    minimumConfidence: 0.6,
  };
}
