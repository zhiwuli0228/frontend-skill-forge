import { expect, test } from '@playwright/test';

test.describe('Settings Params Runtime Baseline', () => {
  test('loaded page shows heading, param groups, and save/reset buttons', async ({ page }) => {
    await page.goto('/settings/params');
    await expect(page.getByRole('heading', { name: /system parameters/i })).toBeVisible();
    await expect(page.getByTestId('settings-params-form')).toBeVisible();
    await expect(page.getByTestId('settings-params-save-button')).toBeVisible();
    await expect(page.getByTestId('settings-params-reset-button')).toBeVisible();
  });

  test('param groups are displayed', async ({ page }) => {
    await page.goto('/settings/params');
    await expect(page.getByTestId('settings-params-group-General')).toBeVisible();
    await expect(page.getByTestId('settings-params-group-Notification')).toBeVisible();
    await expect(page.getByTestId('settings-params-group-Security')).toBeVisible();
  });

  test('empty state shows no data message', async ({ page }) => {
    await page.goto('/settings/params');
    await page.getByTestId('settings-params-scenario-select').click();
    await page.getByTitle('Empty', { exact: true }).click();
    await expect(page.getByText(/no system parameters/i)).toBeVisible();
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/settings/params');
    await page.getByTestId('settings-params-scenario-select').click();
    await page.getByTitle('Loading', { exact: true }).click();
    await expect(page.getByTestId('settings-params-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/settings/params');
    await page.getByTestId('settings-params-scenario-select').click();
    await page.getByTitle('Error', { exact: true }).click();
    await expect(page.getByTestId('settings-params-error')).toBeVisible();
    await expect(page.getByTestId('settings-params-retry-link')).toBeVisible();
    await page.getByTestId('settings-params-retry-link').click();
    await expect(page.getByTestId('settings-params-page')).toBeVisible();
    await expect(page.getByTestId('settings-params-form')).toBeVisible();
  });
});
