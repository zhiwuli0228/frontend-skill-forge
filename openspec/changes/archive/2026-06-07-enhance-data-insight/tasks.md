# Tasks: Enhance Data Insight

Status: Complete

## Task List

### 1. Mock Data

- [x] 1.1 Create `src/domains/insight/data/insight-mock-data.ts` with StatCard, ChartDataPoint, ReportItem, ExportItem interfaces and mock data

### 2. Overview Page

- [x] 2.1 Create `src/domains/insight/pages/InsightOverviewPage.tsx` with stat cards row + CSS bar chart + simple charts
- [x] 2.2 Implement scenario selector and states

### 3. Reports Page

- [x] 3.1 Create `src/domains/insight/pages/InsightReportsPage.tsx` with reports Table
- [x] 3.2 Implement scenario selector and states

### 4. Analysis Page

- [x] 4.1 Create `src/domains/insight/pages/InsightAnalysisPage.tsx` with filter bar + chart area + data table
- [x] 4.2 Implement scenario selector and states

### 5. Export Page

- [x] 5.1 Create `src/domains/insight/pages/InsightExportPage.tsx` with export config form + export history table
- [x] 5.2 Implement scenario selector and states

### 6. Router Update

- [x] 6.1 Update router: replace PlaceholderPage for `/insight/reports`
- [x] 6.2 Update router: replace PlaceholderPage for `/insight/analysis`
- [x] 6.3 Update router: replace PlaceholderPage for `/insight/export`

### 7. E2E Tests

- [x] 7.1 Create `tests/e2e/insight-overview-runtime.spec.ts`
- [x] 7.2 Create `tests/e2e/insight-reports-runtime.spec.ts`
- [x] 7.3 Create `tests/e2e/insight-analysis-runtime.spec.ts`
- [x] 7.4 Create `tests/e2e/insight-export-runtime.spec.ts`

### 8. Quality Gates

- [x] 8.1 Run `npm run lint`
- [x] 8.2 Run `npm run build`
- [x] 8.3 Run `npm run test:e2e`
