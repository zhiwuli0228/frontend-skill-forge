# Implementation: Dashboard Runtime Baseline

Status: Complete

## Changed Files

| File | Change |
|------|--------|
| `src/domains/dashboard/data/mock-data.ts` | New - mock data types and sample data for metrics, alerts, activities |
| `src/domains/dashboard/components/MetricBand.tsx` | New - metric card row with selectable filtering |
| `src/domains/dashboard/components/AlertQueue.tsx` | New - alert list with severity/status tags, click-to-detail |
| `src/domains/dashboard/components/ActivityFeed.tsx` | New - activity timeline with category tags |
| `src/domains/dashboard/components/DetailDrawer.tsx` | New - Ant Design drawer with structured alert details |
| `src/domains/dashboard/pages/DashboardPage.tsx` | Replaced placeholder with runtime composition |
| `tests/e2e/dashboard-runtime.spec.ts` | New - 6 E2E tests covering load, interaction, detail, empty, loading, error states |

## Behavior Delta

- **Before**: `/dashboard` showed a static placeholder heading and paragraph.
- **After**: `/dashboard` shows an operations-style dashboard with:
  - Page header with "Dashboard" title
  - Scenario selector (Loaded / Loading / Empty / Error) for deterministic state control
  - Metric band with 4 selectable cards (Active Tasks, Open Alerts, Success Rate, Avg Response)
  - Alert queue region with severity and status tags
  - Activity feed region with action timeline
  - Detail drawer for alert inspection without route change
  - Cross-region interaction: clicking a metric card filters both alert queue and activity feed by category
  - Loading state: skeleton UI for all regions
  - Empty state: explicit empty messages in queue and feed
  - Error state: alert banner with retry affordance

## Cross-Region Interaction

Selecting a metric card sets a `filterKey` state that filters both the alert queue and activity feed. Deselecting clears the filter. This demonstrates cross-region interaction where an action in the metric band changes content in two other regions.

## State Model

| State | Trigger | Behavior |
|-------|---------|----------|
| Loaded | Default | All regions populated with mock data |
| Loading | Scenario selector | Skeleton UI for all regions |
| Empty | Scenario selector | Empty state messages in queue and feed |
| Error | Scenario selector | Error alert with retry link |
| Filtered | Metric card click | Queue and feed filtered by category |
