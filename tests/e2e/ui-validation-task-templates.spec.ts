import { expect, test } from '@playwright/test';
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const runId =
  process.env.UI_VALIDATION_RUN_ID ?? '2026-06-07-ui-validation-run-02';
const artifactRoot = path.resolve(process.cwd(), 'artifacts', 'validation');
const screenshotDir = path.join(artifactRoot, 'screenshots');
const logDir = path.join(artifactRoot, 'raw-logs');
const jsonDir = path.join(artifactRoot, 'json');

const beforeShot = path.join(
  screenshotDir,
  `${runId}-task-templates-before.png`,
);
const afterShot = path.join(
  screenshotDir,
  `${runId}-task-templates-error-or-retry.png`,
);
const consoleLogPath = path.join(logDir, `${runId}-console-all.log`);
const errorLogPath = path.join(logDir, `${runId}-console-errors.log`);
const summaryPath = path.join(jsonDir, `${runId}-task-templates-summary.json`);

for (const dir of [screenshotDir, logDir, jsonDir]) {
  mkdirSync(dir, { recursive: true });
}

test.use({ trace: 'on' });

test('task templates real interaction validation', async ({ page }) => {
  const consoleMessages: string[] = [];
  const errorMessages: string[] = [];

  page.on('console', (msg) => {
    const line = `[console:${msg.type()}] ${msg.text()}`;
    consoleMessages.push(line);
  });

  page.on('pageerror', (error) => {
    errorMessages.push(`[pageerror] ${error.message}`);
  });

  await page.goto('/task/templates');
  await expect(page.getByTestId('task-templates-page')).toBeVisible();

  await page.screenshot({ path: beforeShot, fullPage: true });

  await page.getByTestId('template-category-filter').click();
  await page.getByTitle('development').click();

  await page.getByTestId('template-search').fill('Bug');
  const bugFixCard = page
    .getByTestId('template-grid')
    .locator('[data-testid^="template-card-"]')
    .first();
  await expect(bugFixCard).toBeVisible();

  await bugFixCard.click();
  const previewDialog = page.getByRole('dialog');
  await expect(previewDialog).toBeVisible();
  await previewDialog.getByRole('button', { name: /close/i }).first().click();

  await page.getByTestId('task-templates-scenario-select').click();
  await page.getByTitle('Empty').click();
  await expect(
    page.getByText('No templates match the current search criteria'),
  ).toBeVisible();

  await page.getByTestId('task-templates-scenario-select').click();
  await page.getByTitle('Loading').click();
  await expect(page.getByTestId('task-templates-loading')).toBeVisible();

  await page.getByTestId('task-templates-scenario-select').click();
  await page.getByTitle('Error').click();
  await expect(page.getByTestId('task-templates-error')).toBeVisible();

  await page.screenshot({ path: afterShot, fullPage: true });

  await page.getByTestId('task-templates-error-retry-link').click();
  await expect(page.getByTestId('template-grid')).toBeVisible();

  appendFileSync(consoleLogPath, consoleMessages.join('\n') + '\n');
  appendFileSync(errorLogPath, errorMessages.join('\n') + '\n');

  writeFileSync(
    summaryPath,
    JSON.stringify(
      {
        runId,
        route: '/task/templates',
        interactions: [
          'navigate',
          'category filter -> development',
          'search -> Bug',
          'open preview modal',
          'close preview modal',
          'switch Empty',
          'switch Loading',
          'switch Error',
          'retry to Loaded',
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
