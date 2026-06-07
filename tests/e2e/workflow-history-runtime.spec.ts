import { expect, test } from '@playwright/test';

test.describe('Workflow History Runtime Baseline', () => {
  test('loaded page shows heading, history table, and multiple rows', async ({ page }) => {
    await page.goto('/workflow/history');
    await expect(page.getByRole('heading', { name: /workflow execution history/i })).toBeVisible();
    await expect(page.getByTestId('workflow-history-table')).toBeVisible();
    const rowCount = await page.getByTestId('workflow-history-table').locator('.ant-table-row').count();
    expect(rowCount).toBeGreaterThan(1);
  });

  test('status filter narrows visible history entries', async ({ page }) => {
    await page.goto('/workflow/history');
    await expect(page.getByTestId('workflow-history-table')).toBeVisible();

    const initialCount = await page.getByTestId('workflow-history-table').locator('.ant-table-row').count();
    expect(initialCount).toBeGreaterThan(0);

    // Apply status filter
    await page.getByTestId('workflow-history-status-filter').click();
    await page.getByTitle('failed').click();

    const filteredCount = await page.getByTestId('workflow-history-table').locator('.ant-table-row').count();
    expect(filteredCount).toBeLessThan(initialCount);
  });

  test('empty state shows empty message', async ({ page }) => {
    await page.goto('/workflow/history');

    await page.getByTestId('workflow-history-scenario-select').click();
    await page.getByTitle('Empty').click();

    await expect(page.getByText('No execution logs match the current filter')).toBeVisible();
  });

  test('loading state shows loading indicator', async ({ page }) => {
    await page.goto('/workflow/history');

    await page.getByTestId('workflow-history-scenario-select').click();
    await page.getByTitle('Loading').click();

    await expect(page.getByTestId('workflow-history-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/workflow/history');

    await page.getByTestId('workflow-history-scenario-select').click();
    await page.getByTitle('Error', { exact: true }).click();

    await expect(page.getByTestId('workflow-history-error')).toBeVisible();
    await expect(page.getByTestId('workflow-history-error-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('workflow-history-error-retry-link').click();
    await expect(page.getByTestId('workflow-history-table')).toBeVisible();
  });
});
