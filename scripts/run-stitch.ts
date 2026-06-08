import { writeRegistry } from '../src/testability/element-registry/stitch.ts';

const registry = writeRegistry(
  'docs/02-harness/knowledge/frontend/code-index.json',
  'artifacts/browser-snapshots/route-elements-v2.json',
  'docs/02-harness/knowledge/frontend/element-registry.json',
  'HEAD',
);

console.log('=== STITCH REPORT ===');
for (const [route, report] of Object.entries(registry.stitchReport)) {
  console.log(
    `${route}: ${report.matched}/${report.totalElements} matched ` +
      `(${report.highConfidence} high, ${report.mediumConfidence} med, ` +
      `${report.lowConfidence} low, ${report.unmatched} unmatched)`,
  );
}
console.log('\nRegistry written to docs/02-harness/knowledge/frontend/element-registry.json');
