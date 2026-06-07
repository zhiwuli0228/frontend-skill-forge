import { expect, test } from '@playwright/test';

test.describe('Insight Analysis Runtime Baseline', () => {
  test('loaded page shows heading, filter, and chart', async ({ page }) => {
    await page.goto('/insight/analysis');
    await expect(page.getByRole('heading', { name: /insight analysis/i })).toBeVisible();
    await expect(page.getByTestId('insight-analysis-filter')).toBeVisible();
    await expect(page.getByTestId('insight-analysis-chart')).toBeVisible();
  });

  test('empty state shows no data message', async ({ page }) => {
    await page.goto('/insight/analysis');

    // Switch to empty scenario
    await page.getByTestId('insight-analysis-scenario-select').click();
    await page.getByTitle('Empty', { exact: true }).click();

    // Empty state should appear
    await expect(page.getByText('No analysis data available')).toBeVisible();
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/insight/analysis');

    // Switch to loading scenario
    await page.getByTestId('insight-analysis-scenario-select').click();
    await page.getByTitle('Loading', { exact: true }).click();

    // Loading skeleton should appear
    await expect(page.getByTestId('insight-analysis-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/insight/analysis');

    // Switch to error scenario
    await page.getByTestId('insight-analysis-scenario-select').click();
    await page.getByTitle('Error', { exact: true }).click();

    // Error state should appear
    await expect(page.getByTestId('insight-analysis-error')).toBeVisible();
    await expect(page.getByTestId('insight-analysis-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('insight-analysis-retry-link').click();
    await expect(page.getByTestId('insight-analysis-page')).toBeVisible();
    await expect(page.getByTestId('insight-analysis-filter')).toBeVisible();
    await expect(page.getByTestId('insight-analysis-chart')).toBeVisible();
  });
});
