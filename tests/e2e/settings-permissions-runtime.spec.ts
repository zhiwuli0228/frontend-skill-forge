import { expect, test } from '@playwright/test';

test.describe('Settings Permissions Runtime Baseline', () => {
  test('loaded page shows heading, permission tree, and matrix', async ({ page }) => {
    await page.goto('/settings/permissions');
    await expect(page.getByRole('heading', { name: /permission management/i })).toBeVisible();
    await expect(page.getByTestId('settings-permissions-tree')).toBeVisible();
    await expect(page.getByTestId('settings-permissions-matrix')).toBeVisible();
  });

  test('permission tree shows tree nodes', async ({ page }) => {
    await page.goto('/settings/permissions');
    const treeNodes = page.getByTestId('settings-permissions-tree').locator('.ant-tree-treenode');
    const count = await treeNodes.count();
    expect(count).toBeGreaterThan(0);
  });

  test('save and reset buttons are visible', async ({ page }) => {
    await page.goto('/settings/permissions');
    await expect(page.getByTestId('settings-permissions-save-button')).toBeVisible();
    await expect(page.getByTestId('settings-permissions-reset-button')).toBeVisible();
  });

  test('empty state shows no data message', async ({ page }) => {
    await page.goto('/settings/permissions');
    await page.getByTestId('settings-permissions-scenario-select').click();
    await page.getByTitle('Empty', { exact: true }).click();
    await expect(page.getByText(/no permissions available/i)).toBeVisible();
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/settings/permissions');
    await page.getByTestId('settings-permissions-scenario-select').click();
    await page.getByTitle('Loading', { exact: true }).click();
    await expect(page.getByTestId('settings-permissions-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/settings/permissions');
    await page.getByTestId('settings-permissions-scenario-select').click();
    await page.getByTitle('Error', { exact: true }).click();
    await expect(page.getByTestId('settings-permissions-error')).toBeVisible();
    await expect(page.getByTestId('settings-permissions-retry-link')).toBeVisible();
    await page.getByTestId('settings-permissions-retry-link').click();
    await expect(page.getByTestId('settings-permissions-page')).toBeVisible();
    await expect(page.getByTestId('settings-permissions-tree')).toBeVisible();
  });
});
