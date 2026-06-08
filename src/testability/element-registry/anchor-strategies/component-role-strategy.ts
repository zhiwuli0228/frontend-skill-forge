import type { BrowserElement, CodeComponent } from '../types';
import type { AnchorStrategy, CodeMatch } from './index';

/**
 * Matches elements by their ancestor structural context against source file
 * location expectations. Used primarily as a tiebreaker/disambiguator, not as
 * a primary matching strategy.
 *
 * Maps browser ancestor roles to expected source directories:
 *
 *   [banner]          → shell/          (GlobalShell, header)
 *   [tablist]         → shell/navigation/  (TopTabNavigation)
 *   [complementary, menu] → shell/      (SidebarNavigation)
 *   [main, table]     → components directory  (tables, data components)
 *   [main, generic]   → pages directory       (page-level components)
 *   [main, form]      → components directory  (form components)
 *   [main, list]      → shared or pages dir   (pagination, page lists)
 */

const STRUCTURE_TO_SOURCE: Array<{
  roles: string[];
  pathPattern: RegExp;
  label: string;
}> = [
  {
    roles: ['banner'],
    pathPattern: /\/shell\//,
    label: 'shell (header/banner)',
  },
  {
    roles: ['tablist'],
    pathPattern: /\/shell\/navigation\//,
    label: 'shell navigation (tabs)',
  },
  {
    roles: ['complementary', 'menu'],
    pathPattern: /\/shell\/navigation\/SidebarNavigation|\/shell\/config\//,
    label: 'shell navigation (sidebar)',
  },
  {
    roles: ['aside', 'menu'],
    pathPattern: /\/shell\/navigation\/SidebarNavigation|\/shell\/config\//,
    label: 'shell navigation (sidebar via <aside>)',
  },
  {
    roles: ['main', 'table', 'rowgroup'],
    pathPattern: /\/components\/|Table|Column/,
    label: 'table/data components',
  },
  {
    roles: ['main', 'form'],
    pathPattern: /\/components\/|Form|Input/,
    label: 'form components',
  },
  {
    roles: ['main', 'list'],
    pathPattern: /\/shared\/|Page/,
    label: 'shared/pagination',
  },
  {
    roles: ['main', 'generic'],
    pathPattern: /\/pages\//,
    label: 'page-level components',
  },
];

/**
 * Score how well a component's source file matches the expected location
 * given the browser element's ancestor structure. Returns 0-1.
 */
export function contextScore(
  browser: BrowserElement,
  component: CodeComponent,
): number {
  // Find the best matching structure rule
  let bestScore = 0.5; // neutral baseline

  for (const rule of STRUCTURE_TO_SOURCE) {
    // Check if ALL required roles appear in browser ancestor structure
    const allRolesPresent = rule.roles.every((r) =>
      browser.ancestorRoles.includes(r),
    );
    if (!allRolesPresent) continue;

    // Check if the source file matches the expected pattern
    if (rule.pathPattern.test(component.sourceFile)) {
      bestScore = 1.0; // strong match: context aligns
    } else {
      bestScore = 0.3; // structural mismatch: unlikely match
    }
  }

  return bestScore;
}

export const componentRoleStrategy: AnchorStrategy = {
  name: 'component-role',

  extractBrowserFeature(el: BrowserElement): string | null {
    return el.ancestorRoles.join('>') || null;
  },

  findCodeMatches(
    _feature: string,
    components: CodeComponent[],
  ): CodeMatch[] {
    // This strategy doesn't do standalone matching — it's a tiebreaker.
    // Return all components with a "context" reason.
    return components.map((comp) => ({
      component: comp,
      matchReason: `context: ${comp.sourceFile}`,
    }));
  },

  scoreMatch(browser: BrowserElement, code: CodeMatch): number {
    return contextScore(browser, code.component);
  },

  isViable(): boolean {
    return true; // always available as fallback
  },
};
