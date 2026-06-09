import fs from 'fs';
import path from 'path';
import type { ModuleRouteMap, FileChangeResult } from './types';

/**
 * Build a module→route mapping from the project's moduleConfig and router.
 * Uses the module config as the authoritative source for route keys,
 * augmented with filter-param routes from the sidebarMenu definitions.
 */
export function buildModuleRouteMap(projectRoot: string): ModuleRouteMap {
  const moduleRoutes: Record<string, string[]> = {};
  const pageFileToRoute: Record<string, string> = {};

  const rel = (p: string) => path.relative(projectRoot, p).replace(/\\/g, '/');

  // Scan router.tsx for page→route mappings by matching import patterns
  const routerPath = path.join(projectRoot, 'src/app/router.tsx');
  const routerContent = fs.readFileSync(routerPath, 'utf-8');

  // Extract page imports: import { XPage } from '../domains/<module>/pages/XPage'
  const pageImportRegex = /import\s+\{\s*(\w+)\s*\}\s+from\s+'\.\.\/domains\/(\w+)\/pages\/(\w+)'/g;
  let m: RegExpExecArray | null;
  while ((m = pageImportRegex.exec(routerContent)) !== null) {
    const moduleName = m[2];

    if (!moduleRoutes[moduleName]) {
      moduleRoutes[moduleName] = [];
    }
  }

  // Read moduleConfig for the authoritative route list
  const configPath = path.join(projectRoot, 'src/shell/config/moduleConfig.tsx');
  const configContent = fs.readFileSync(configPath, 'utf-8');

  // For each module, extract tab paths and sidebar paths
  // by locating module start positions in configContent.
  const moduleKeyPosRegex = /(\w+):\s*\{/g;
  const modulePositions: Array<{ key: string; start: number }> = [];
  while ((m = moduleKeyPosRegex.exec(configContent)) !== null) {
    if (m[1] === 'modules') continue; // skip the outer Record type key
    modulePositions.push({ key: m[1], start: m.index });
  }

  for (let i = 0; i < modulePositions.length; i++) {
    const { key: configKey, start } = modulePositions[i];
    const end = i < modulePositions.length - 1
      ? modulePositions[i + 1].start  // next module's start
      : configContent.lastIndexOf('}'); // end of modules object
    const moduleSection = configContent.slice(start, end);
    const routes: string[] = [];

    // Tab routes: { key: '/module/path', label: '...' }
    const tabRegex = /key:\s*'(\/[^']+)'/g;
    while ((m = tabRegex.exec(moduleSection)) !== null) {
      routes.push(m[1]);
    }

    // Sidebar routes: path: '/module/list/filter'
    const sidebarRegex = /path:\s*'(\/[^']+)'/g;
    while ((m = sidebarRegex.exec(moduleSection)) !== null) {
      routes.push(m[1]);
    }

    moduleRoutes[configKey] = [...new Set(routes)];
  }

  // Build page file → route mapping from router.tsx
  const routeRegex = /path:\s*'([^']+)',\s*element:\s*<(\w+)\s*\/?>/g;
  while ((m = routeRegex.exec(routerContent)) !== null) {
    const routePath = m[1];
    const componentName = m[2];
    // Find the import for this component
    const importRegex = new RegExp(
      `import\\s+\\{\\s*${componentName}\\s*\\}\\s+from\\s+'([^']+)'`,
    );
    const impMatch = importRegex.exec(routerContent);
    if (impMatch) {
      const importPath = impMatch[1];
      // Resolve relative import to file path
      const resolved = path.resolve(path.dirname(routerPath), importPath);
      const filePath = rel(resolved + '.tsx');
      const mod = findModuleForRoute(routePath, moduleRoutes);
      if (mod && moduleRoutes[mod]) {
        for (const r of moduleRoutes[mod]) {
          pageFileToRoute[r] = filePath;
        }
      }
    }
  }

  // Build filePrefixToRoutes: directory prefix → affected routes
  const filePrefixToRoutes: Record<string, string[]> = {
    'src/shell/': Object.values(moduleRoutes).flat(),
    'src/app/': Object.values(moduleRoutes).flat(),
    'src/shared/': Object.values(moduleRoutes).flat(),
  };

  for (const [mod, routes] of Object.entries(moduleRoutes)) {
    filePrefixToRoutes[`src/domains/${mod}/`] = routes;
  }

  return { moduleRoutes, pageFileToRoute, filePrefixToRoutes };
}

function findModuleForRoute(
  routePath: string,
  moduleRoutes: Record<string, string[]>,
): string | null {
  for (const [mod, routes] of Object.entries(moduleRoutes)) {
    if (routes.some((r) => r.startsWith(`/${mod}/`))) return mod;
    if (routePath.startsWith(`/${mod}`)) return mod;
  }
  return null;
}

/**
 * Given a list of changed files (from git diff), determine which routes
 * are affected and need re-stitching.
 */
export function detectAffectedRoutes(
  changedFiles: string[],
  projectRoot: string,
  routeMap?: ModuleRouteMap,
): FileChangeResult {
  const map = routeMap ?? buildModuleRouteMap(projectRoot);

  const affectedRoutes = new Set<string>();
  const affectedModules = new Set<string>();
  let isShellChange = false;
  let isGlobalChange = false;

  for (const file of changedFiles) {
    const normalized = file.replace(/\\/g, '/');

    // Shell / App / Shared → all routes affected
    if (
      normalized.startsWith('src/shell/') ||
      normalized.startsWith('src/app/') ||
      normalized.startsWith('src/shared/')
    ) {
      isShellChange = true;
      for (const routes of Object.values(map.moduleRoutes)) {
        for (const r of routes) affectedRoutes.add(r);
      }
      for (const m of Object.keys(map.moduleRoutes)) affectedModules.add(m);
      continue;
    }

    // Domain files → module-scoped routes
    for (const [prefix, routes] of Object.entries(map.filePrefixToRoutes)) {
      if (normalized.startsWith(prefix)) {
        for (const r of routes) affectedRoutes.add(r);
        // Extract module name from prefix: 'src/domains/task/' → 'task'
        const modMatch = prefix.match(/domains\/(\w+)\//);
        if (modMatch) affectedModules.add(modMatch[1]);
        break;
      }
    }

    // Check if this is a page file → exact route match
    if (map.pageFileToRoute[normalized]) {
      affectedRoutes.add(map.pageFileToRoute[normalized]);
    }
  }

  // Detect global change (shared dependency affecting multiple modules)
  if (affectedModules.size >= 3) {
    isGlobalChange = true;
  }

  return {
    changedFiles,
    affectedRoutes: [...affectedRoutes],
    affectedModules: [...affectedModules],
    isShellChange,
    isGlobalChange,
  };
}
