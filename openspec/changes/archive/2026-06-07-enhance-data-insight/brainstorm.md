# Brainstorm: Enhance Data Insight

Status: Complete

## Context

The Data Insight module (`/insight/*`) has PlaceholderPage for all routes except `/insight/overview`. Need to build overview with charts, reports, analysis, and export pages.

## Target Routes

- `/insight/overview` — Dashboard with summary cards + charts (line, bar, pie)
- `/insight/reports` — Report list with table
- `/insight/analysis` — Data analysis with filters and chart
- `/insight/export` — Export configuration and history

## UI Patterns

### Overview Page
- Summary stat cards (total tasks, active skills, workflows, success rate)
- Line chart (task completion trend)
- Bar chart (skill usage by category)
- Pie chart (workflow success/fail ratio)
- Scenario selector

### Reports Page
- Table with report name, type, date, status, actions
- Generate report button
- Scenario selector

### Analysis Page
- Filter bar (metric, time range)
- Chart area (dynamic chart based on filters)
- Data table below chart
- Scenario selector

### Export Page
- Export config form (format, date range, data type)
- Export history table
- Download button per row
- Scenario selector

## Note on Charts

Since this is a mock project without real chart libraries, use simplified representations:
- CSS-based bar charts (div widths)
- SVG-based simple charts
- Or placeholder chart areas with data labels
