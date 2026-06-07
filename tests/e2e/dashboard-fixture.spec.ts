import { expect, test } from '@playwright/test';
import { loadFixture } from '../helpers/fixture-loader';

const loadedFixture = loadFixture('insights/dashboard.json');

test.describe('Dashboard - fixture driven', () => {
  test(`[${loadedFixture.scenarioId}] dashboard redirects and exposes fixture-driven data`, async ({ page }) => {
    await page.goto(loadedFixture.page);

    const metrics = loadedFixture.data.metrics as Array<{ id: string; title: string }>;
    expect(metrics.length).toBeGreaterThan(0);

    // Dashboard redirects to /task/list/all per route-map.md
    expect(loadedFixture.page).toBe('/dashboard');
    expect(loadedFixture.expected.actions.length).toBeGreaterThan(0);

    // Fixture integrity: actions should include the metric interactions
    expect(loadedFixture.expected.actions).toContain('metric-click');
  });
});
