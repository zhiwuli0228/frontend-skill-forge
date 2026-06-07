import { expect, test } from '@playwright/test';

test.describe('Insight Overview Runtime Baseline', () => {
  test('loaded page shows heading, stat cards, and chart', async ({ page }) => {
    await page.goto('/insight/overview');
    await expect(page.getByRole('heading', { name: /insight overview/i })).toBeVisible();
    await expect(page.getByTestId('insight-stat-cards')).toBeVisible();
    await expect(page.getByTestId('insight-chart')).toBeVisible();
  });

  test('stat cards shows 4 cards', async ({ page }) => {
    await page.goto('/insight/overview');
    await expect(page.getByTestId('insight-stat-cards')).toBeVisible();
    const cardCount = await page.getByTestId('insight-stat-cards').locator('.ant-card').count();
    expect(cardCount).toBe(4);
  });

  test('empty state shows no data message', async ({ page }) => {
    await page.goto('/insight/overview');

    // Switch to empty scenario
    await page.getByTestId('insight-overview-scenario-select').click();
    await page.getByTitle('Empty', { exact: true }).click();

    // Empty state should appear
    await expect(page.getByText('No insight data available')).toBeVisible();
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/insight/overview');

    // Switch to loading scenario
    await page.getByTestId('insight-overview-scenario-select').click();
    await page.getByTitle('Loading', { exact: true }).click();

    // Loading skeleton should appear
    await expect(page.getByTestId('insight-overview-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/insight/overview');

    // Switch to error scenario
    await page.getByTestId('insight-overview-scenario-select').click();
    await page.getByTitle('Error', { exact: true }).click();

    // Error state should appear
    await expect(page.getByTestId('insight-overview-error')).toBeVisible();
    await expect(page.getByTestId('insight-overview-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('insight-overview-retry-link').click();
    await expect(page.getByTestId('insight-overview-page')).toBeVisible();
    await expect(page.getByTestId('insight-stat-cards')).toBeVisible();
    await expect(page.getByTestId('insight-chart')).toBeVisible();
  });
});
