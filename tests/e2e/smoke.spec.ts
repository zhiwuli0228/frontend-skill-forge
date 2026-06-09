import { expect, test } from '@playwright/test';

test('login redirect works and task list page is reachable', async ({ page }) => {
  // Visiting a protected route should redirect to /login
  await page.goto('/task/list');
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByTestId('login-page')).toBeVisible();

  // Log in with demo credentials
  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').fill('admin123');
  await page.getByTestId('login-submit').click();

  // Should be redirected to the task list page
  await expect(page).toHaveURL(/\/task\/list/);
  await expect(page.getByRole('heading', { name: /task list/i })).toBeVisible();
});
