import fs from 'fs';
import path from 'path';
import type { CodeComponent, CodeIndex, EventBinding, StateDeclaration, ImportInfo } from '../types';

/**
 * Extract component info from one .tsx file via regex. Deliberately not a full
 * AST parser — the goal is a lightweight, run-anywhere indexer that is good
 * enough for the stitching spike.  Full AST (ts-morph / tree-sitter) is the
 * upgrade path when we need higher precision.
 */

function scanTsxFile(filePath: string, projectRoot: string): CodeComponent[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(projectRoot, filePath).replace(/\\/g, '/');
  const components: CodeComponent[] = [];

  // ── Exported components ──
  const exportRegex = /export\s+(?:default\s+)?function\s+(\w+)\s*\(/g;
  let match: RegExpExecArray | null;
  while ((match = exportRegex.exec(content)) !== null) {
    const name = match[1];
    components.push({
      componentName: name,
      sourceFile: relPath,
      jsxTestIds: [],
      jsxVisibleTexts: [],
      jsxAriaLabels: [],
      eventBindings: [],
      stateDeclarations: [],
      propsReceived: [],
      imports: [],
    });
  }

  // Const exports: export const Foo = () => { ... }
  const constExportRegex = /export\s+const\s+(\w+)\s*=\s*(?:\(\)|function)/g;
  while ((match = constExportRegex.exec(content)) !== null) {
    const name = match[1];
    if (name[0] === name[0].toUpperCase()) {
      // Only capture PascalCase as components
      if (!components.find((c) => c.componentName === name)) {
        components.push({
          componentName: name,
          sourceFile: relPath,
          jsxTestIds: [],
          jsxVisibleTexts: [],
          jsxAriaLabels: [],
          eventBindings: [],
          stateDeclarations: [],
          propsReceived: [],
          imports: [],
        });
      }
    }
  }

  // Filter out hook-like names (useXxx)
  const comps = components.filter(
    (c) => !c.componentName.startsWith('use'),
  );

  if (comps.length === 0) return [];

  // ── data-testid ──
  const testidRegex = /data-testid=["'{]([^"'}]+)["'}]/g;
  const allTestIds: string[] = [];
  while ((match = testidRegex.exec(content)) !== null) {
    allTestIds.push(match[1]);
  }

  // ── aria-label ──
  const ariaLabelRegex = /aria-label=["']([^"']+)["']/g;
  const allAriaLabels: string[] = [];
  while ((match = ariaLabelRegex.exec(content)) !== null) {
    allAriaLabels.push(match[1]);
  }

  // ── Static text in JSX ──
  // Capture >text< pattern
  const textRegex = />\s*([^\s<][^<]{0,60}?)\s*</g;
  const allTexts: string[] = [];
  while ((match = textRegex.exec(content)) !== null) {
    const t = match[1].trim();
    if (
      t.length >= 2 &&
      t.length <= 60 &&
      !t.startsWith('{') &&
      !t.includes('<') &&
      !/^\d+$/.test(t) &&
      !/^["'`]/.test(t)
    ) {
      allTexts.push(t);
    }
  }

  // ── Event bindings ──
  const eventBindingRegex = /(on\w+)=\{(?:handle)?(\w+)\}/g;
  const allBindings: EventBinding[] = [];
  while ((match = eventBindingRegex.exec(content)) !== null) {
    const attr = match[1];
    const handler = match[2];
    // avoid false positives like control flow: {items.map(...
    if (attr.startsWith('on')) {
      const existing = allBindings.find(
        (b) => b.attribute === attr && b.handlerName === handler,
      );
      if (!existing) {
        allBindings.push({ attribute: attr, handlerName: handler });
      }
    }
  }

  // Also capture arrow-inline form: onClick={() => handleXxx(...
  const inlineEventRegex = /(on\w+)=\{\(\)\s*=>\s*(\w+)\(/g;
  while ((match = inlineEventRegex.exec(content)) !== null) {
    allBindings.push({ attribute: match[1], handlerName: match[2] });
  }

  // ── State declarations ──
  const stateRegex = /(?:const|let)\s+\[(\w+),\s*\w+\]\s*=\s*(useState|useReducer)\(/g;
  const allStates: StateDeclaration[] = [];
  while ((match = stateRegex.exec(content)) !== null) {
    allStates.push({ variableName: match[1], hook: match[2] as 'useState' | 'useReducer' });
  }

  // ── Imports ──
  const importRegex = /import\s+(?:(?:type\s+)?\{([^}]+)\}|\* as (\w+)|(\w+))\s+from\s+['"]([^'"]+)['"]/g;
  const allImports: ImportInfo[] = [];
  while ((match = importRegex.exec(content)) !== null) {
    const namedStr = match[1];
    const namespaceName = match[2];
    const defaultName = match[3];
    const source = match[4];

    if (namedStr) {
      const names = namedStr.split(',').map((n) => n.trim().split(/\s+as\s+/)[0]);
      names.forEach((name) => {
        if (name && name !== 'type') {
          allImports.push({ name, source, isDefault: false });
        }
      });
    }
    if (namespaceName) {
      allImports.push({ name: namespaceName, source, isDefault: false });
    }
    if (defaultName) {
      allImports.push({ name: defaultName, source, isDefault: true });
    }
  }

  // ── Deduplicate and assign to each component ──
  const uniqueTestIds = [...new Set(allTestIds)];
  const uniqueTexts = [...new Set(allTexts)];
  const uniqueAria = [...new Set(allAriaLabels)];
  const uniqueBindings = dedupeBindings(allBindings);
  const uniqueStates = dedupeStates(allStates);
  const uniqueImports = dedupeImports(allImports);

  comps.forEach((c) => {
    c.jsxTestIds = uniqueTestIds;
    c.jsxVisibleTexts = uniqueTexts;
    c.jsxAriaLabels = uniqueAria;
    c.eventBindings = uniqueBindings;
    c.stateDeclarations = uniqueStates;
    c.imports = uniqueImports;
  });

  return comps;
}

function dedupeBindings(bindings: EventBinding[]): EventBinding[] {
  const seen = new Set<string>();
  return bindings.filter((b) => {
    const key = `${b.attribute}:${b.handlerName}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function dedupeStates(states: StateDeclaration[]): StateDeclaration[] {
  const seen = new Set<string>();
  return states.filter((s) => {
    if (seen.has(s.variableName)) return false;
    seen.add(s.variableName);
    return true;
  });
}

function dedupeImports(imports: ImportInfo[]): ImportInfo[] {
  const seen = new Set<string>();
  return imports.filter((i) => {
    const key = `${i.name}:${i.source}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Scan all .tsx files under src/ and produce a CodeIndex.
 */
export function buildCodeIndex(
  projectRoot: string,
  srcDir = 'src',
): CodeIndex {
  const absSrc = path.join(projectRoot, srcDir);
  const files = collectFiles(absSrc, '.tsx');
  const componentMap: Record<string, CodeComponent> = {};

  for (const file of files) {
    const comps = scanTsxFile(file, projectRoot);
    for (const c of comps) {
      // Preserve the first occurrence per component name (the definition),
      // but merge if same component name appears across files (rare but possible)
      if (!componentMap[c.componentName]) {
        componentMap[c.componentName] = c;
      }
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    filesScanned: files.length,
    componentsFound: Object.keys(componentMap).length,
    components: componentMap,
  };
}

function collectFiles(dir: string, ext: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(full, ext));
    } else if (entry.name.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

/**
 * CLI entry: run with `npx tsx src/testability/element-registry/discovery/code-indexer.ts`
 * Outputs code-index.json to stdout or specified file.
 */
export function writeCodeIndex(projectRoot: string, outputPath: string): void {
  const index = buildCodeIndex(projectRoot);
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2), 'utf-8');
}

// CLI entry
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/').split('/').pop() ?? '')) {
  const root = path.resolve(process.argv[2] || '.');
  const out = process.argv[3] || 'docs/02-harness/knowledge/frontend/code-index.json';
  const absOut = path.resolve(root, out);
  const dir = path.dirname(absOut);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  writeCodeIndex(root, absOut);
  const idx = buildCodeIndex(root);
  process.stdout.write(`Code index written to ${out}\n`);
  process.stdout.write(`Files scanned: ${idx.filesScanned}\n`);
  process.stdout.write(`Components found: ${idx.componentsFound}\n`);
}
