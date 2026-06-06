import { expect, test } from '@playwright/test';

test('dashboard page is reachable', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});