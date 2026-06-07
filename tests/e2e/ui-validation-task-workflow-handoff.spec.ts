import { expect, test } from '@playwright/test';
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const runId =
  process.env.UI_VALIDATION_RUN_ID ?? '2026-06-07-context-upper-bound-run-04';
const artifactRoot = path.resolve(process.cwd(), 'artifacts', 'validation');
const screenshotDir = path.join(artifactRoot, 'screenshots');
const logDir = path.join(artifactRoot, 'raw-logs');
const jsonDir = path.join(artifactRoot, 'json');

const beforeShot = path.join(
  screenshotDir,
  `${runId}-task-workflow-handoff-before.png`,
);
const afterShot = path.join(
  screenshotDir,
  `${runId}-task-workflow-handoff-after.png`,
);
const consoleLogPath = path.join(logDir, `${runId}-task-workflow-handoff-console-all.log`);
const errorLogPath = path.join(logDir, `${runId}-task-workflow-handoff-console-errors.log`);
const summaryPath = path.join(jsonDir, `${runId}-task-workflow-handoff-summary.json`);

for (const dir of [screenshotDir, logDir, jsonDir]) {
  mkdirSync(dir, { recursive: true });
}

test.use({ trace: 'on' });

test('task template preview can hand off into workflow editor', async ({ page }) => {
  const consoleMessages: string[] = [];
  const errorMessages: string[] = [];

  page.on('console', (msg) => {
    consoleMessages.push(`[console:${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', (error) => {
    errorMessages.push(`[pageerror] ${error.message}`);
  });

  await page.goto('/task/templates');
  await expect(page.getByTestId('task-templates-page')).toBeVisible();

  await page.getByTestId('template-search').fill('Bug');
  const bugFixCard = page
    .getByTestId('template-grid')
    .locator('[data-testid^="template-card-"]')
    .first();
  await expect(bugFixCard).toBeVisible();
  await bugFixCard.click();

  const previewDialog = page.getByRole('dialog');
  await expect(previewDialog).toBeVisible();
  await page.screenshot({ path: beforeShot, fullPage: true });

  await page.getByTestId('template-open-workflow').click();
  await expect(page).toHaveURL(/\/workflow\/editor\?/);
  await expect(page.getByTestId('workflow-editor-page')).toBeVisible();
  await expect(page.getByTestId('workflow-template-context')).toContainText('Bug Fix');

  await page.getByTestId('workflow-node-n2').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.screenshot({ path: afterShot, fullPage: true });

  appendFileSync(consoleLogPath, consoleMessages.join('\n') + '\n');
  appendFileSync(errorLogPath, errorMessages.join('\n') + '\n');

  writeFileSync(
    summaryPath,
    JSON.stringify(
      {
        runId,
        routes: ['/task/templates', '/workflow/editor'],
        interactions: [
          'navigate to templates',
          'search Bug',
          'open template preview modal',
          'handoff to workflow editor',
          'verify template context banner',
          'open node properties drawer',
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
