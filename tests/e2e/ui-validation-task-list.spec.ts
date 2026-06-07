import { expect, test } from '@playwright/test';
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const runId =
  process.env.UI_VALIDATION_RUN_ID ?? '2026-06-07-ui-validation-run-03';
const artifactRoot = path.resolve(process.cwd(), 'artifacts', 'validation');
const screenshotDir = path.join(artifactRoot, 'screenshots');
const logDir = path.join(artifactRoot, 'raw-logs');
const jsonDir = path.join(artifactRoot, 'json');

const beforeShot = path.join(screenshotDir, `${runId}-task-list-before.png`);
const afterShot = path.join(
  screenshotDir,
  `${runId}-task-list-drawer-open.png`,
);
const consoleLogPath = path.join(logDir, `${runId}-task-list-console-all.log`);
const errorLogPath = path.join(logDir, `${runId}-task-list-console-errors.log`);
const summaryPath = path.join(jsonDir, `${runId}-task-list-summary.json`);

for (const dir of [screenshotDir, logDir, jsonDir]) {
  mkdirSync(dir, { recursive: true });
}

test.use({ trace: 'on' });

test('task list real interaction validation', async ({ page }) => {
  const consoleMessages: string[] = [];
  const errorMessages: string[] = [];

  page.on('console', (msg) => {
    consoleMessages.push(`[console:${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', (error) => {
    errorMessages.push(`[pageerror] ${error.message}`);
  });

  await page.goto('/task/list/all');
  await expect(page.getByTestId('task-list-page')).toBeVisible();
  await page.screenshot({ path: beforeShot, fullPage: true });

  const firstRow = page
    .getByTestId('task-table')
    .locator('.ant-table-tbody .ant-table-row')
    .first();
  await firstRow.click();

  const detailDrawer = page.getByRole('dialog');
  await expect(detailDrawer).toBeVisible();
  await page.screenshot({ path: afterShot, fullPage: true });
  await detailDrawer.getByRole('button', { name: /close/i }).click();

  await page.getByTestId('task-scenario-select').click();
  await page.getByTitle('Empty').click();
  await expect(page.getByText('No tasks match the current filter')).toBeVisible();

  await page.getByTestId('task-scenario-select').click();
  await page.getByTitle('Error').click();
  await expect(page.getByTestId('task-list-error')).toBeVisible();
  await page.getByTestId('task-error-retry-link').click();
  await expect(page.getByTestId('task-table')).toBeVisible();

  await page.getByRole('listitem', { name: /2/i }).click();

  appendFileSync(consoleLogPath, consoleMessages.join('\n') + '\n');
  appendFileSync(errorLogPath, errorMessages.join('\n') + '\n');

  writeFileSync(
    summaryPath,
    JSON.stringify(
      {
        runId,
        route: '/task/list/all',
        interactions: [
          'navigate',
          'open first row detail drawer',
          'close drawer',
          'switch Empty',
          'switch Error',
          'retry to Loaded',
          'click pagination page 2',
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
