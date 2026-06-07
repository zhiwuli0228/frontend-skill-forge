import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface ScenarioFixture {
  scenarioId: string;
  page: string;
  purpose: string;
  data: Record<string, unknown>;
  expected: {
    visibleTexts: string[];
    roles: string[];
    actions: string[];
  };
}

export function loadFixture(relativePath: string): ScenarioFixture {
  const fullPath = resolve(process.cwd(), 'tests/fixtures', relativePath);
  const raw = readFileSync(fullPath, 'utf-8');
  const parsed = JSON.parse(raw) as ScenarioFixture;
  if (!parsed.scenarioId || !parsed.page || !parsed.purpose) {
    throw new Error(`Fixture ${relativePath} missing required top-level fields`);
  }
  return parsed;
}
