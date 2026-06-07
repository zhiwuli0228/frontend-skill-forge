import { expect, test } from '@playwright/test';

test.describe('Global Shell Navigation', () => {
  test('header is visible on authenticated routes', async ({ page }) => {
    await page.goto('/task/list');
    await expect(page.getByTestId('header')).toBeVisible();
    await expect(page.getByTestId('module-switcher-btn')).toBeVisible();
    await expect(page.getByTestId('module-tag')).toBeVisible();
  });

  test('header is not visible on login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByTestId('header')).not.toBeVisible();
  });

  test('module switcher drawer opens and closes', async ({ page }) => {
    await page.goto('/task/list');
    await page.getByTestId('module-switcher-btn').click();
    await expect(page.getByTestId('module-drawer')).toBeVisible();
    // Close drawer by clicking outside
    await page.locator('.ant-drawer-mask').click();
    await expect(page.getByTestId('module-drawer')).not.toBeVisible();
  });

  test('module card navigates to module root', async ({ page }) => {
    await page.goto('/task/list');
    await page.getByTestId('module-switcher-btn').click();
    await expect(page.getByTestId('module-drawer')).toBeVisible();
    await page.getByTestId('module-card-skill').click();
    await expect(page).toHaveURL('/skill/list');
  });

  test('module tabs render and switch correctly', async ({ page }) => {
    await page.goto('/task/list');
    await expect(page.getByTestId('module-tabs')).toBeVisible();
    // Click "Create Task" tab
    await page.getByText('Create Task').click();
    await expect(page).toHaveURL('/task/create');
  });

  test('sidebar menu renders correctly', async ({ page }) => {
    await page.goto('/task/list');
    await expect(page.getByTestId('sidebar-menu')).toBeVisible();
  });

  test('breadcrumb renders correctly', async ({ page }) => {
    await page.goto('/task/list');
    await expect(page.getByTestId('breadcrumb')).toBeVisible();
  });

  test('root route redirects to task list', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/task/list');
  });
});
