import fs from 'fs';
import path from 'path';
import type {
  BrowserElement,
  CodeComponent,
  CodeIndex,
  ElementRegistry,
  ImportInfo,
  ProjectAnchorProfile,
  StitchedElement,
  UnmappedElement,
  StitchReport,
  RouteElementSnapshot,
} from './types';
import {
  computeProjectProfile,
  type AnchorStrategy,
} from './anchor-strategies/index';
import { testidStrategy } from './anchor-strategies/testid-strategy';
import { textStrategy } from './anchor-strategies/text-strategy';
import { componentRoleStrategy, contextScore } from './anchor-strategies/component-role-strategy';

// Ordered strategy list — first viable one wins as primary
const ALL_STRATEGIES: AnchorStrategy[] = [testidStrategy, textStrategy, componentRoleStrategy];

/**
 * Narrow code-side components to those reachable from a given route.
 * Simple heuristics: match by module prefix from the URL path.
 */
function scopeComponentsToRoute(
  route: string,
  components: Record<string, CodeComponent>,
): CodeComponent[] {
  const seg = route.split('/').filter(Boolean)[0]; // 'task', 'skill', etc.
  const all = Object.values(components);

  // Module-specific narrowing
  const moduleComps = all.filter(
    (c) =>
      c.sourceFile.includes(`/domains/${seg}/`) ||
      c.sourceFile.includes('/shell/') ||
      c.sourceFile.includes('/app/') ||
      c.sourceFile.includes('/shared/'),
  );

  // If too few matches (module name doesn't match), fall back to all
  return moduleComps.length >= 3 ? moduleComps : all;
}

/**
 * Find the parent (page-level) component for a given component
 * by tracing imports: which page component imports this one.
 */
function findParentComponent(
  component: CodeComponent,
  allComponents: Record<string, CodeComponent>,
): string {
  // Look for a page-level component that imports this one
  for (const [name, comp] of Object.entries(allComponents)) {
    if (name === component.componentName) continue;
    const importsThis = comp.imports.some(
      (i: ImportInfo) =>
        i.name === component.componentName ||
        component.sourceFile.endsWith(`${i.name}.tsx`),
    );
    // Heuristic: pages are in pages/ subdirectory
    if (importsThis && comp.sourceFile.includes('/pages/')) {
      return comp.componentName;
    }
  }
  return 'unknown';
}

/**
 * Find service calls implied by the handler function name.
 * Traces through the handler's owning component to find matching imports.
 */
function findServiceCalls(
  handlerName: string,
  handlerComponent: CodeComponent | undefined,
): Array<{ serviceModule: string; methodName: string }> {
  if (!handlerComponent) return [];
  // Look for imports that look like services (file path, not npm package)
  const serviceImports = handlerComponent.imports.filter(
    (i) => i.source.startsWith('.') && i.source.includes('ervice'),
  );
  return serviceImports.map((s) => ({
    serviceModule: s.source,
    methodName: handlerName, // proxy — exact method name requires source-level tracing
  }));
}

/**
 * Score a match combining strategy confidence with structural context fit.
 */
function combinedScore(
  browser: BrowserElement,
  match: { component: CodeComponent; matchReason: string },
  strategy: AnchorStrategy,
): number {
  const strategyScore = strategy.scoreMatch(browser, match);
  const ctxScore = contextScore(browser, match.component);
  // Strategy score carries more weight, but context can pull it down
  return strategyScore * 0.65 + ctxScore * 0.35;
}

/**
 * Primary matching: for each browser element, try primary then fallback.
 * Uses context scoring for disambiguation and confidence adjustment.
 */
const MIN_CONFIDENCE = 0.48;

function unmappedElement(el: BrowserElement, reason: UnmappedElement['reason']): UnmappedElement {
  return {
    route: '',
    selector: el.testid
      ? `getByTestId('${el.testid}')`
      : `getByRole('${el.a11yRole}', { name: /${el.visibleText}/i })`,
    status: 'unmapped',
    reason,
  };
}

function tryMatch(
  el: BrowserElement,
  strategy: AnchorStrategy | undefined,
  components: CodeComponent[],
): StitchedElement | null {
  if (!strategy) return null;
  const feature = strategy.extractBrowserFeature(el);
  if (!feature) return null;

  const matches = strategy.findCodeMatches(feature, components);
  if (matches.length === 0) return null;

  const scored = matches
    .map((m) => ({ match: m, score: combinedScore(el, m, strategy) }))
    .sort((a, b) => b.score - a.score);

  if (scored[0].score < MIN_CONFIDENCE) return null;

  return buildStitched(el, scored[0].match, strategy.name, scored[0].score);
}

function matchElement(
  el: BrowserElement,
  profiles: ProjectAnchorProfile,
  components: CodeComponent[],
): StitchedElement | UnmappedElement {
  const primary = ALL_STRATEGIES.find((s) => s.name === profiles.recommendedPrimary);
  const fallback = ALL_STRATEGIES.find((s) => s.name === profiles.recommendedFallback);

  const primaryResult = tryMatch(el, primary, components);
  if (primaryResult) return primaryResult;

  if (fallback && fallback.name !== profiles.recommendedPrimary) {
    const fallbackResult = tryMatch(el, fallback, components);
    if (fallbackResult) return fallbackResult;
  }

  if (primary) {
    const feature = primary.extractBrowserFeature(el);
    if (feature && primary.findCodeMatches(feature, components).length > 0) {
      return unmappedElement(el, 'below-confidence-threshold');
    }
  }

  return unmappedElement(el, 'no-testid-no-unique-text');
}

function buildStitched(
  el: BrowserElement,
  match: { component: CodeComponent; matchReason: string },
  strategy: string,
  confidence: number,
): StitchedElement {
  const comp = match.component;
  const conf =
    confidence >= 0.8 ? 'high' : confidence >= 0.55 ? 'medium' : 'low';

  // Find relevant handler from event bindings
  const roleHandlerMap: Record<string, string> = {
    button: 'onClick',
    checkbox: 'onChange',
    combobox: 'onChange',
    textbox: 'onChange',
  };
  const expectedAttr = roleHandlerMap[el.a11yRole] ?? '';
  const relatedBinding = expectedAttr
    ? comp.eventBindings.find((b) => b.attribute === expectedAttr)
    : undefined;
  const boundHandler = relatedBinding?.handlerName;

  // Find state
  const stateVar = comp.stateDeclarations[0]?.variableName;

  return {
    selector: {
      primary: el.testid
        ? `getByTestId('${el.testid}')`
        : `getByRole('${el.a11yRole}', { name: /${el.visibleText}/i })`,
      strategy: strategy as StitchedElement['selector']['strategy'],
    },
    a11yRole: el.a11yRole,
    visibleText: el.visibleText,
    sourceComponent: comp.componentName,
    sourceFile: comp.sourceFile,
    parentComponent: 'unknown', // filled post-stitch
    elementTestId: el.testid,
    boundProp: undefined,
    boundState: stateVar,
    boundHandler,
    dataFlow: {
      handlerDefinedIn: 'unknown', // filled post-stitch
      stateOwnedBy: 'unknown', // filled post-stitch
      serviceCalls: [],
    },
    anchorMethod: strategy,
    confidence: conf,
    lastVerifiedCommit: '',
  };
}

/**
 * Run full stitching for a route snapshot against a code index.
 */
export function stitchRoute(
  route: string,
  snapshot: RouteElementSnapshot,
  codeIndex: CodeIndex,
): { elements: StitchedElement[]; unmatched: UnmappedElement[]; report: StitchReport } {
  const profile = computeProjectProfile(codeIndex.components);
  const scoped = scopeComponentsToRoute(route, codeIndex.components);

  const stitched: StitchedElement[] = [];
  const unmatched: UnmappedElement[] = [];

  for (const el of snapshot.elements) {
    const result = matchElement(el, profile, scoped);
    if ('status' in result) {
      result.route = route;
      unmatched.push(result);
    } else {
      result.route = route;
      stitched.push(result);
    }
  }

  // ── Post-stitch enrichment ──
  for (const elem of stitched) {
    const comp = codeIndex.components[elem.sourceComponent];
    if (comp) {
      // Parent component
      elem.parentComponent = findParentComponent(comp, codeIndex.components);

      // Handler defined in: trace from source component outward
      if (elem.boundHandler) {
        // Source component is the best first guess
        elem.dataFlow.handlerDefinedIn = elem.sourceComponent;

        // If source component doesn't declare it, search imports chain
        const sourceComp = codeIndex.components[elem.sourceComponent];
        if (sourceComp) {
          const sourceHasHandler = sourceComp.eventBindings.some(
            (b) => b.handlerName === elem.boundHandler,
          );
          if (!sourceHasHandler) {
            // Handler is likely passed via props — look among imported components
            for (const [name, c] of Object.entries(codeIndex.components)) {
              if (name === elem.sourceComponent) continue;
              const hasHandler = c.eventBindings.some(
                (b) => b.handlerName === elem.boundHandler,
              );
              if (hasHandler && c.sourceFile.includes('/pages/')) {
                elem.dataFlow.handlerDefinedIn = name;
                break;
              }
            }
            if (elem.dataFlow.handlerDefinedIn === elem.sourceComponent) {
              elem.dataFlow.handlerDefinedIn = elem.parentComponent;
            }
          }
        }
      }

      // State owned by: prefer source component, then search globally
      if (elem.boundState) {
        const sourceComp2 = codeIndex.components[elem.sourceComponent];
        const sourceHasState = sourceComp2?.stateDeclarations.some(
          (s) => s.variableName === elem.boundState,
        );
        if (sourceHasState) {
          elem.dataFlow.stateOwnedBy = elem.sourceComponent;
        } else {
          for (const [name, c] of Object.entries(codeIndex.components)) {
            if (
              c.stateDeclarations.some((s) => s.variableName === elem.boundState)
            ) {
              elem.dataFlow.stateOwnedBy = name;
              break;
            }
          }
          if (elem.dataFlow.stateOwnedBy === 'unknown') {
            elem.dataFlow.stateOwnedBy = elem.sourceComponent;
          }
        }
      }

      // Service calls
      const handlerComp =
        codeIndex.components[elem.dataFlow.handlerDefinedIn];
      elem.dataFlow.serviceCalls = findServiceCalls(
        elem.boundHandler ?? '',
        handlerComp,
      );
    }
  }

  const highCount = stitched.filter((e) => e.confidence === 'high').length;
  const medCount = stitched.filter((e) => e.confidence === 'medium').length;
  const lowCount = stitched.filter((e) => e.confidence === 'low').length;

  const report: StitchReport = {
    route,
    totalElements: stitched.length + unmatched.length,
    matched: stitched.length,
    highConfidence: highCount,
    mediumConfidence: medCount,
    lowConfidence: lowCount,
    unmatched: unmatched.length,
  };

  return { elements: stitched, unmatched, report };
}

/**
 * Build the full ElementRegistry from route snapshots and a code index.
 */
export function buildRegistry(
  codeIndex: CodeIndex,
  snapshots: Record<string, RouteElementSnapshot>,
  commitHash: string,
): ElementRegistry {
  const profile = computeProjectProfile(codeIndex.components);
  const routes: Record<string, StitchedElement[]> = {};
  const allUnmatched: UnmappedElement[] = [];
  const allReports: Record<string, StitchReport> = {};

  for (const [route, snapshot] of Object.entries(snapshots)) {
    const { elements, unmatched, report } = stitchRoute(
      route,
      snapshot,
      codeIndex,
    );
    // Stamp commit hash on all elements
    for (const el of elements) {
      el.lastVerifiedCommit = commitHash;
    }
    routes[route] = elements;
    allUnmatched.push(...unmatched);
    allReports[route] = report;
  }

  return {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    projectAnchorProfile: profile,
    routes,
    unmatched: allUnmatched,
    stitchReport: allReports,
  };
}

/**
 * CLI entry: run with `npx tsx src/testability/element-registry/stitch.ts
 *   <code-index.json> <snapshots.json> <output.json>
 *
 * The snapshots file is a JSON produced by running browser_evaluate
 * captures and formatting them as Record<string, BrowserElement[]>.
 */
export function writeRegistry(
  codeIndexPath: string,
  snapshotsPath: string,
  outputPath: string,
  commit?: string,
): ElementRegistry {
  const codeIndex: CodeIndex = JSON.parse(
    fs.readFileSync(codeIndexPath, 'utf-8'),
  );
  const rawSnapshots: Record<string, BrowserElement[]> = JSON.parse(
    fs.readFileSync(snapshotsPath, 'utf-8'),
  );
  const snapshots: Record<string, RouteElementSnapshot> = {};
  for (const [route, elements] of Object.entries(rawSnapshots)) {
    snapshots[route] = {
      route,
      capturedAt: new Date().toISOString(),
      elements,
    };
  }

  const registry = buildRegistry(codeIndex, snapshots, commit ?? 'HEAD');
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2), 'utf-8');
  return registry;
}
