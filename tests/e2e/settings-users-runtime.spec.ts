import { expect, test } from '@playwright/test';

test.describe('Settings Users Runtime Baseline', () => {
  test('loaded page shows heading, add button, and users table', async ({ page }) => {
    await page.goto('/settings/users');
    await expect(page.getByRole('heading', { name: /user management/i })).toBeVisible();
    await expect(page.getByTestId('settings-users-add-button')).toBeVisible();
    await expect(page.getByTestId('settings-users-table')).toBeVisible();
    const rowCount = await page.getByTestId('settings-users-table').locator('.ant-table-row').count();
    expect(rowCount).toBeGreaterThan(1);
  });

  test('add user button opens modal', async ({ page }) => {
    await page.goto('/settings/users');
    await page.getByTestId('settings-users-add-button').click();
    await expect(page.getByTestId('settings-users-add-modal').locator('.ant-modal')).toBeVisible();
  });

  test('empty state shows no data message', async ({ page }) => {
    await page.goto('/settings/users');
    await page.getByTestId('settings-users-scenario-select').click();
    await page.getByTitle('Empty', { exact: true }).click();
    await expect(page.getByText(/no users/i)).toBeVisible();
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/settings/users');
    await page.getByTestId('settings-users-scenario-select').click();
    await page.getByTitle('Loading', { exact: true }).click();
    await expect(page.getByTestId('settings-users-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/settings/users');
    await page.getByTestId('settings-users-scenario-select').click();
    await page.getByTitle('Error', { exact: true }).click();
    await expect(page.getByTestId('settings-users-error')).toBeVisible();
    await expect(page.getByTestId('settings-users-retry-link')).toBeVisible();
    await page.getByTestId('settings-users-retry-link').click();
    await expect(page.getByTestId('settings-users-page')).toBeVisible();
    await expect(page.getByTestId('settings-users-table')).toBeVisible();
  });
});
