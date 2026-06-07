import { expect, test } from '@playwright/test';

test.describe('Insight Export Runtime Baseline', () => {
  test('loaded page shows heading, export form, and export table', async ({ page }) => {
    await page.goto('/insight/export');
    await expect(page.getByRole('heading', { name: /insight export/i })).toBeVisible();
    await expect(page.getByTestId('insight-export-form')).toBeVisible();
    await expect(page.getByTestId('insight-export-table')).toBeVisible();
  });

  test('export form shows format select and export button', async ({ page }) => {
    await page.goto('/insight/export');
    await expect(page.getByTestId('insight-export-form')).toBeVisible();
    // Format select and export button should be visible within the form
    await expect(page.getByTestId('insight-export-format-select')).toBeVisible();
    await expect(page.getByTestId('insight-export-button')).toBeVisible();
  });

  test('empty state shows no data message', async ({ page }) => {
    await page.goto('/insight/export');

    // Switch to empty scenario
    await page.getByTestId('insight-export-scenario-select').click();
    await page.getByTitle('Empty', { exact: true }).click();

    // Empty state should appear
    await expect(page.getByText('No export history')).toBeVisible();
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/insight/export');

    // Switch to loading scenario
    await page.getByTestId('insight-export-scenario-select').click();
    await page.getByTitle('Loading', { exact: true }).click();

    // Loading skeleton should appear
    await expect(page.getByTestId('insight-export-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/insight/export');

    // Switch to error scenario
    await page.getByTestId('insight-export-scenario-select').click();
    await page.getByTitle('Error', { exact: true }).click();

    // Error state should appear
    await expect(page.getByTestId('insight-export-error')).toBeVisible();
    await expect(page.getByTestId('insight-export-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('insight-export-retry-link').click();
    await expect(page.getByTestId('insight-export-page')).toBeVisible();
    await expect(page.getByTestId('insight-export-form')).toBeVisible();
    await expect(page.getByTestId('insight-export-table')).toBeVisible();
  });
});
