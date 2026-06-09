import type {
  BrowserElement,
  CodeIndex,
  ElementRegistry,
  StitchedElement,
  UnmappedElement,
  StitchReport,
  RouteElementSnapshot,
} from './types';
import { stitchRoute } from './stitch';

/**
 * Mark elements for the given routes as stale in the registry.
 * Sets staleSince to the current timestamp for all elements that
 * are not already stale.
 */
export function markStale(
  routes: string[],
  registry: ElementRegistry,
): ElementRegistry {
  const now = new Date().toISOString();
  for (const route of routes) {
    const elements = registry.routes[route];
    if (!elements) continue;
    for (const el of elements) {
      if (!el.staleSince) {
        el.staleSince = now;
      }
    }
    // Also mark unmatched entries for this route
    for (const um of registry.unmatched) {
      if (um.route === route && !um.staleSince) {
        um.staleSince = now;
      }
    }
  }
  return registry;
}

/**
 * Merge a single route's stitch results back into the registry.
 * Replaces the route's elements, unmatched list, and report.
 * Clears staleSince on all re-stitched elements.
 */
export function mergeStitchedIntoRegistry(
  registry: ElementRegistry,
  route: string,
  stitchedElements: StitchedElement[],
  unmatched: UnmappedElement[],
  report: StitchReport,
  commitHash: string,
): ElementRegistry {
  // Stamp commit hash and clear staleness
  for (const el of stitchedElements) {
    el.lastVerifiedCommit = commitHash;
    el.staleSince = undefined;
    el.route = route;
  }

  // Replace route's elements
  registry.routes[route] = stitchedElements;

  // Remove old unmatched for this route, add new
  registry.unmatched = registry.unmatched.filter((u) => u.route !== route);
  for (const um of unmatched) {
    um.route = route;
    um.staleSince = undefined;
  }
  registry.unmatched.push(...unmatched);

  // Update report
  registry.stitchReport[route] = report;

  // Update timestamp
  registry.generatedAt = new Date().toISOString();

  return registry;
}

/**
 * Rebuild a minimal BrowserElement[] from existing registry entries.
 * Used when no fresh browser snapshot is available (e.g., commit-triggered
 * re-stitch). Reconstructs enough data for code-side re-evaluation.
 */
export function rebuildBrowserElements(
  route: string,
  registry: ElementRegistry,
): BrowserElement[] {
  const elements = registry.routes[route];
  if (!elements) return [];

  return elements.map((el) => ({
    route,
    a11yRole: el.a11yRole,
    visibleText: el.visibleText,
    testid: el.elementTestId,
    ariaLabel: undefined,
    elementType: el.a11yRole,
    ancestorRoles: [] as string[],
    isInteractive: true,
  }));
}

/**
 * Rebuild a RouteElementSnapshot from existing registry entries.
 */
export function rebuildSnapshot(
  route: string,
  registry: ElementRegistry,
): RouteElementSnapshot {
  return {
    route,
    capturedAt: new Date().toISOString(),
    elements: rebuildBrowserElements(route, registry),
  };
}

/**
 * Full re-stitch of a single route into the registry.
 * 1. Rebuild snapshot from existing registry (code-side re-evaluation)
 * 2. Run stitchRoute
 * 3. Merge results back into registry
 */
export function restitchRouteIntoRegistry(
  route: string,
  registry: ElementRegistry,
  codeIndex: CodeIndex,
  commitHash: string,
): ElementRegistry {
  const snapshot = rebuildSnapshot(route, registry);
  const { elements, unmatched, report } = stitchRoute(route, snapshot, codeIndex);

  return mergeStitchedIntoRegistry(
    registry,
    route,
    elements,
    unmatched,
    report,
    commitHash,
  );
}
