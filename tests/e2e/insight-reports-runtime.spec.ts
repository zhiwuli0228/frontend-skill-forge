import { expect, test } from '@playwright/test';

test.describe('Insight Reports Runtime Baseline', () => {
  test('loaded page shows heading and table with rows', async ({ page }) => {
    await page.goto('/insight/reports');
    await expect(page.getByRole('heading', { name: /insight reports/i })).toBeVisible();
    await expect(page.getByTestId('insight-reports-table')).toBeVisible();
    // Verify multiple rows are visible
    const rowCount = await page.getByTestId('insight-reports-table').locator('.ant-table-row').count();
    expect(rowCount).toBeGreaterThan(1);
  });

  test('empty state shows no data message', async ({ page }) => {
    await page.goto('/insight/reports');

    // Switch to empty scenario
    await page.getByTestId('insight-reports-scenario-select').click();
    await page.getByTitle('Empty', { exact: true }).click();

    // Empty state should appear
    await expect(page.getByText('No reports available')).toBeVisible();
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/insight/reports');

    // Switch to loading scenario
    await page.getByTestId('insight-reports-scenario-select').click();
    await page.getByTitle('Loading', { exact: true }).click();

    // Loading skeleton should appear
    await expect(page.getByTestId('insight-reports-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/insight/reports');

    // Switch to error scenario
    await page.getByTestId('insight-reports-scenario-select').click();
    await page.getByTitle('Error', { exact: true }).click();

    // Error state should appear
    await expect(page.getByTestId('insight-reports-error')).toBeVisible();
    await expect(page.getByTestId('insight-reports-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('insight-reports-retry-link').click();
    await expect(page.getByTestId('insight-reports-page')).toBeVisible();
    await expect(page.getByTestId('insight-reports-table')).toBeVisible();
  });
});
