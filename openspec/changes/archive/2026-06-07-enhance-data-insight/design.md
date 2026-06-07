# Design: Enhance Data Insight

Status: Complete

## Data Model

```typescript
interface StatCard {
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down' | 'flat';
}

interface ChartDataPoint {
  label: string;
  value: number;
}

interface ReportItem {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface ExportItem {
  id: string;
  format: string;
  dateRange: string;
  createdAt: string;
  status: 'ready' | 'processing' | 'failed';
  downloadUrl: string;
}
```

## Routes

Already in router.tsx:
- `/insight/overview` → InsightOverviewPage
- `/insight/reports` → InsightReportsPage
- `/insight/analysis` → InsightAnalysisPage
- `/insight/export` → InsightExportPage

## Charts (CSS-based)

Use CSS bars and simple SVG for mock charts. No external chart library needed.
