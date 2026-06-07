import { expect, test } from '@playwright/test';
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const runId =
  process.env.UI_VALIDATION_RUN_ID ?? '2026-06-07-context-upper-bound-run-01';
const artifactRoot = path.resolve(process.cwd(), 'artifacts', 'validation');
const screenshotDir = path.join(artifactRoot, 'screenshots');
const logDir = path.join(artifactRoot, 'raw-logs');
const jsonDir = path.join(artifactRoot, 'json');

const beforeShot = path.join(
  screenshotDir,
  `${runId}-workflow-editor-before.png`,
);
const afterShot = path.join(
  screenshotDir,
  `${runId}-workflow-editor-drawer-open.png`,
);
const consoleLogPath = path.join(logDir, `${runId}-workflow-editor-console-all.log`);
const errorLogPath = path.join(logDir, `${runId}-workflow-editor-console-errors.log`);
const summaryPath = path.join(jsonDir, `${runId}-workflow-editor-summary.json`);

for (const dir of [screenshotDir, logDir, jsonDir]) {
  mkdirSync(dir, { recursive: true });
}

test.use({ trace: 'on' });

test('workflow editor real interaction validation', async ({ page }) => {
  const consoleMessages: string[] = [];
  const errorMessages: string[] = [];

  page.on('console', (msg) => {
    consoleMessages.push(`[console:${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', (error) => {
    errorMessages.push(`[pageerror] ${error.message}`);
  });

  await page.goto('/workflow/editor');
  await expect(page.getByTestId('workflow-editor-page')).toBeVisible();
  await page.screenshot({ path: beforeShot, fullPage: true });

  await page.getByTestId('workflow-node-n2').click();
  const drawerDialog = page.getByRole('dialog');
  await expect(drawerDialog).toBeVisible();
  await page.screenshot({ path: afterShot, fullPage: true });
  await drawerDialog.getByRole('button', { name: /close/i }).click();

  await page.getByTestId('workflow-editor-scenario-select').click();
  await page.getByTitle('Error').click();
  await expect(page.getByTestId('workflow-editor-error')).toBeVisible();
  await page.getByTestId('workflow-editor-error-retry-link').click();
  await expect(page.getByTestId('workflow-editor-canvas')).toBeVisible();

  appendFileSync(consoleLogPath, consoleMessages.join('\n') + '\n');
  appendFileSync(errorLogPath, errorMessages.join('\n') + '\n');

  writeFileSync(
    summaryPath,
    JSON.stringify(
      {
        runId,
        route: '/workflow/editor',
        interactions: [
          'navigate',
          'click workflow-node-n2',
          'open node properties drawer',
          'close drawer',
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
