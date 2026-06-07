import { expect, test } from '@playwright/test';
import { loadFixture } from '../helpers/fixture-loader';

const loadedFixture = loadFixture('tasks/task-list.json');
const emptyFixture = loadFixture('tasks/task-list-empty.json');
const errorFixture = loadFixture('tasks/task-list-error.json');

test.describe('Task List - fixture driven', () => {
  test(`[${loadedFixture.scenarioId}] table renders rows from fixture data`, async ({ page }) => {
    await page.goto(loadedFixture.page);

    for (const text of loadedFixture.expected.visibleTexts.slice(0, 4)) {
      await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
    }

    const tasks = loadedFixture.data.tasks as Array<{ id: string; title: string }>;
    expect(tasks.length).toBeGreaterThan(0);

    await expect(page.getByTestId('task-table')).toBeVisible();
    const rowCount = await page.getByTestId('task-table').locator('.ant-table-row').count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test(`[${emptyFixture.scenarioId}] empty state matches fixture copy`, async ({ page }) => {
    await page.goto(emptyFixture.page);

    await page.getByTestId('task-scenario-select').click();
    await page.getByTitle('Empty').click();

    for (const text of emptyFixture.expected.visibleTexts) {
      await expect(page.getByText(text, { exact: false })).toBeVisible();
    }
    expect(emptyFixture.expected.actions.length).toBe(0);
  });

  test(`[${errorFixture.scenarioId}] error state honors fixture and supports retry`, async ({ page }) => {
    await page.goto(errorFixture.page);

    await page.getByTestId('task-scenario-select').click();
    await page.getByTitle('Error').click();

    for (const text of errorFixture.expected.visibleTexts) {
      await expect(page.getByText(text, { exact: false })).toBeVisible();
    }
    expect(errorFixture.expected.actions).toContain('retry');

    await expect(page.getByTestId('task-error-retry-link')).toBeVisible();
    await page.getByTestId('task-error-retry-link').click();
    await expect(page.getByTestId('task-table')).toBeVisible();
  });
});
