import { expect, test } from '@playwright/test';

test.describe('Skill Market Runtime Baseline', () => {
  test('loaded page shows heading, sections, and cards', async ({ page }) => {
    await page.goto('/skill/market');
    await expect(page.getByRole('heading', { name: /skill market/i })).toBeVisible();
    await expect(page.getByTestId('skill-market-featured')).toBeVisible();
    await expect(page.getByTestId('skill-market-recommended')).toBeVisible();

    // Verify cards are visible
    const cards = page.locator('[data-testid^="skill-card-"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('featured section contains skill cards', async ({ page }) => {
    await page.goto('/skill/market');
    await expect(page.getByTestId('skill-market-featured')).toBeVisible();

    const featuredCards = page.getByTestId('skill-market-featured').locator('[data-testid^="skill-card-"]');
    const count = await featuredCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('install toggle changes button text', async ({ page }) => {
    await page.goto('/skill/market');
    await expect(page.getByTestId('skill-market-featured')).toBeVisible();

    // Get the first install button
    const installButton = page.locator('[data-testid^="skill-install-"]').first();
    await expect(installButton).toBeVisible();

    const initialText = await installButton.textContent();

    // Click install/uninstall button
    await installButton.click();

    // Button text should change
    await expect(installButton).not.toHaveText(initialText!.trim());
  });

  test('empty state shows empty message', async ({ page }) => {
    await page.goto('/skill/market');

    // Switch to empty scenario
    await page.getByTestId('skill-market-scenario-select').click();
    await page.getByTitle('Empty').click();

    // Empty state should appear
    await expect(page.getByText('No skills available')).toBeVisible();
  });

  test('loading state shows skeleton UI', async ({ page }) => {
    await page.goto('/skill/market');

    // Switch to loading scenario
    await page.getByTestId('skill-market-scenario-select').click();
    await page.getByTitle('Loading').click();

    // Loading skeleton should appear
    await expect(page.getByTestId('skill-market-loading')).toBeVisible();
  });

  test('error state shows error with retry affordance', async ({ page }) => {
    await page.goto('/skill/market');

    // Switch to error scenario
    await page.getByTestId('skill-market-scenario-select').click();
    await page.getByTitle('Error').click();

    // Error state should appear
    await expect(page.getByTestId('skill-market-error')).toBeVisible();
    await expect(page.getByTestId('skill-market-error-retry-link')).toBeVisible();

    // Click retry to return to loaded state
    await page.getByTestId('skill-market-error-retry-link').click();
    await expect(page.getByTestId('skill-market-featured')).toBeVisible();
    await expect(page.getByTestId('skill-market-recommended')).toBeVisible();
  });
});
