import { expect, test } from '@playwright/test';
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const runId =
  process.env.UI_VALIDATION_RUN_ID ?? '2026-06-07-ui-validation-run-03';
const artifactRoot = path.resolve(process.cwd(), 'artifacts', 'validation');
const screenshotDir = path.join(artifactRoot, 'screenshots');
const logDir = path.join(artifactRoot, 'raw-logs');
const jsonDir = path.join(artifactRoot, 'json');

const beforeShot = path.join(screenshotDir, `${runId}-skill-list-before.png`);
const afterShot = path.join(
  screenshotDir,
  `${runId}-skill-list-after-modal.png`,
);
const consoleLogPath = path.join(logDir, `${runId}-skill-list-console-all.log`);
const errorLogPath = path.join(logDir, `${runId}-skill-list-console-errors.log`);
const summaryPath = path.join(jsonDir, `${runId}-skill-list-summary.json`);

for (const dir of [screenshotDir, logDir, jsonDir]) {
  mkdirSync(dir, { recursive: true });
}

test.use({ trace: 'on' });

test('skill list real interaction validation', async ({ page }) => {
  const consoleMessages: string[] = [];
  const errorMessages: string[] = [];

  page.on('console', (msg) => {
    consoleMessages.push(`[console:${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', (error) => {
    errorMessages.push(`[pageerror] ${error.message}`);
  });

  await page.goto('/skill/list/all');
  await expect(page.getByTestId('skill-list-page')).toBeVisible();
  await page.screenshot({ path: beforeShot, fullPage: true });

  await page.getByTestId('skill-list-btn').click();
  await expect(page.getByTestId('skill-list-view')).toBeVisible();

  await page.getByTestId('skill-search').fill('API');
  const firstListItem = page
    .getByTestId('skill-list-view')
    .locator('[data-testid^="skill-list-item-"]')
    .first();
  await expect(firstListItem).toBeVisible();
  await firstListItem.click();

  const detailDialog = page.getByRole('dialog');
  await expect(detailDialog).toBeVisible();
  await page.screenshot({ path: afterShot, fullPage: true });
  await detailDialog.getByRole('button', { name: /close/i }).click();

  appendFileSync(consoleLogPath, consoleMessages.join('\n') + '\n');
  appendFileSync(errorLogPath, errorMessages.join('\n') + '\n');

  writeFileSync(
    summaryPath,
    JSON.stringify(
      {
        runId,
        route: '/skill/list/all',
        interactions: [
          'navigate',
          'toggle grid -> list',
          'search -> API',
          'open detail modal from first filtered list item',
          'close detail modal',
        ],
        screenshots: [beforeShot, afterShot],
        consoleMessageCount: consoleMessages.length,
        errorMessageCount: errorMessages.length,
      },
      null,
      2,
    ),
  );
});
