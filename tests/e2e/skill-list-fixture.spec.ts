import { expect, test } from '@playwright/test';
import { loadFixture } from '../helpers/fixture-loader';

const loadedFixture = loadFixture('skills/skill-list.json');
const emptyFixture = loadFixture('skills/skill-list-empty.json');
const errorFixture = loadFixture('skills/skill-list-error.json');

test.describe('Skill List - fixture driven', () => {
  test(`[${loadedFixture.scenarioId}] loaded state honors fixture expectations`, async ({ page }) => {
    await page.goto(loadedFixture.page);

    for (const text of loadedFixture.expected.visibleTexts) {
      await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
    }
    for (const role of loadedFixture.expected.roles) {
      const roleMatcher = page.getByRole(role as 'heading' | 'textbox' | 'combobox' | 'button' | 'list');
      await expect(roleMatcher.first()).toBeVisible();
    }

    const skills = loadedFixture.data.skills as Array<{ id: string; name: string }>;
    expect(skills.length).toBeGreaterThan(0);

    await expect(page.getByTestId('skill-grid')).toBeVisible();
  });

  test(`[${emptyFixture.scenarioId}] empty state shows expected copy`, async ({ page }) => {
    await page.goto(emptyFixture.page);

    await page.getByTestId('skill-scenario-select').click();
    await page.getByTitle('Empty').click();

    for (const text of emptyFixture.expected.visibleTexts) {
      await expect(page.getByText(text, { exact: false })).toBeVisible();
    }

    const cardCount = await page.locator('[data-testid^="skill-card-"]').count();
    expect(cardCount).toBe(0);
  });

  test(`[${errorFixture.scenarioId}] error state shows retry affordance`, async ({ page }) => {
    await page.goto(errorFixture.page);

    await page.getByTestId('skill-scenario-select').click();
    await page.getByTitle('Error').click();

    for (const text of errorFixture.expected.visibleTexts) {
      await expect(page.getByText(text, { exact: false })).toBeVisible();
    }
    expect(errorFixture.expected.actions).toContain('retry');

    await expect(page.getByTestId('skill-error-retry-link')).toBeVisible();
    await page.getByTestId('skill-error-retry-link').click();
    await expect(page.getByTestId('skill-grid')).toBeVisible();
  });
});
