import { expect, test } from '@playwright/test';
import { loadFixture } from '../helpers/fixture-loader';

const loadedFixture = loadFixture('workflows/workflow-list.json');

test.describe('Workflow List - fixture driven', () => {
  test(`[${loadedFixture.scenarioId}] table renders workflows from fixture`, async ({ page }) => {
    await page.goto(loadedFixture.page);

    for (const text of loadedFixture.expected.visibleTexts) {
      await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
    }

    const workflows = loadedFixture.data.workflows as Array<{ id: string; name: string }>;
    expect(workflows.length).toBeGreaterThan(0);

    expect(loadedFixture.expected.actions).toContain('status-toggle');
  });
});
