import { expect, test } from '@playwright/test';

test('task list page is reachable', async ({ page }) => {
  await page.goto('/task/list');
  await expect(page.getByRole('heading', { name: /task list/i })).toBeVisible();
});