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

export function validateScenarioShape(
  fixture: Partial<ScenarioFixture>,
  source: string,
): asserts fixture is ScenarioFixture {
  const required: Array<keyof ScenarioFixture> = [
    'scenarioId',
    'page',
    'purpose',
    'data',
    'expected',
  ];
  for (const field of required) {
    if (!(field in fixture)) {
      throw new Error(`Fixture ${source} missing required field: ${field}`);
    }
  }
  if (typeof fixture.scenarioId !== 'string' || fixture.scenarioId.length === 0) {
    throw new Error(`Fixture ${source} scenarioId must be a non-empty string`);
  }
  if (typeof fixture.page !== 'string' || fixture.page.length === 0) {
    throw new Error(`Fixture ${source} page must be a non-empty string`);
  }
  if (typeof fixture.purpose !== 'string' || fixture.purpose.length === 0) {
    throw new Error(`Fixture ${source} purpose must be a non-empty string`);
  }
  if (Array.isArray(fixture.expected?.visibleTexts) === false) {
    throw new Error(`Fixture ${source} expected.visibleTexts must be an array`);
  }
  if (Array.isArray(fixture.expected?.roles) === false) {
    throw new Error(`Fixture ${source} expected.roles must be an array`);
  }
  if (Array.isArray(fixture.expected?.actions) === false) {
    throw new Error(`Fixture ${source} expected.actions must be an array`);
  }
}
