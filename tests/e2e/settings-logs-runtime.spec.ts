import { expect, test } from '@playwright/test';

test.describe('Settings Logs Runtime Baseline', () => {
  test('loaded page shows heading, filters, export button, and logs table', async ({ page }) => {
    await page.goto('/settings/logs');
    await expect(page.getByRole('heading', { name: /operation logs/i })).toBeVisible();
    await expect(page.getByTestId('settings-logs-action-filter')).toBeVisible();
    await expect(page.getByTestId('settings-logs-export-button')).toBeVisible();
    await expect(page.getByTestId('settings-logs-table')).toBeVisible();
    const rowCount = await page.getByTestId('settings-logs-table').locator('.ant-table-row').count();
    expect(rowCount).toBeGreaterThan(1);
  });

  test('empty state shows no data message', async ({ page }) => {
    await page.goto('/settings/logs');
    await page.getByTestId('settings-logs-scenario-select').click();
    await page.getByTitle('Empty', { exact: true }).click();
    await expect(page.getByText(/no operation logs/i)).toBeVisible();
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/settings/logs');
    await page.getByTestId('settings-logs-scenario-select').click();
    await page.getByTitle('Loading', { exact: true }).click();
    await expect(page.getByTestId('settings-logs-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/settings/logs');
    await page.getByTestId('settings-logs-scenario-select').click();
    await page.getByTitle('Error', { exact: true }).click();
    await expect(page.getByTestId('settings-logs-error')).toBeVisible();
    await expect(page.getByTestId('settings-logs-retry-link')).toBeVisible();
    await page.getByTestId('settings-logs-retry-link').click();
    await expect(page.getByTestId('settings-logs-page')).toBeVisible();
    await expect(page.getByTestId('settings-logs-table')).toBeVisible();
  });
});
