# Component Discovery: Scenario Selector Pattern

Status: Complete
Evidence ID: CD-TL-004

## Component Info

- **Name:** Scenario Selector (a recurring pattern, not a single component)
- **Pattern Type:** cross-page pattern
- **Used by:** 22 of 23 page components (all except `LoginPage`)
- **Discovery Date:** 2026-06-07

## Description

The "Scenario Selector" is not a standalone component file — it is a recurring pattern that every page implements locally. It is an Ant Design `Select` placed at the top of the page, allowing the user (or agent) to switch between 4 deterministic states:

```text
Loaded → real mock data
Loading → skeleton placeholder
Empty → empty state message
Error → error alert with retry link
```

## Standard JSX Pattern

```tsx
type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

const [scenario, setScenario] = useState<Scenario>('loaded');

const scenarioSelector = (
  <Space style={{ marginBottom: 16 }}>
    <Text>Scenario:</Text>
    <Select
      value={scenario}
      onChange={setScenario}
      options={[
        { value: 'loaded', label: 'Loaded' },
        { value: 'loading', label: 'Loading' },
        { value: 'empty', label: 'Empty' },
        { value: 'error', label: 'Error' },
      ]}
      data-testid="<page-name>-scenario-select"
    />
  </Space>
);

if (scenario === 'loading') return <LoadingView />;
if (scenario === 'error') return <ErrorView onRetry={() => setScenario('loaded')} />;
if (scenario === 'empty' && data.length === 0) return <EmptyView />;
return <LoadedView />;
```

## Per-Page testids

| Page | Select testid | Loading testid | Error testid | Retry testid |
| --- | --- | --- | --- | --- |
| TaskListPage | `task-scenario-select` | `task-list-loading` | `task-list-error` | `task-error-retry-link` |
| TaskCreatePage | `task-create-scenario-select` | `task-create-loading` | `task-create-error` | `task-create-error-retry-link` |
| TaskBoardPage | `task-board-scenario-select` | `task-board-loading` | `task-board-error` | `task-board-error-retry-link` |
| TaskTemplatesPage | `task-templates-scenario-select` | `task-templates-loading` | `task-templates-error` | `task-templates-error-retry-link` |
| SkillListPage | `skill-scenario-select` | `skill-loading` | `skill-error` | `skill-error-retry-link` |
| SkillMarketPage | `skill-market-scenario-select` | `skill-market-loading` | `skill-market-error` | `skill-market-error-retry-link` |
| SkillConfigPage | `skill-config-scenario-select` | `skill-config-loading` | `skill-config-error` | `skill-config-error-retry-link` |
| SkillVersionsPage | `skill-scenario-select` (shared with list) | `skill-versions-loading` | `skill-versions-error` | `skill-versions-error-retry-link` |
| WorkflowListPage | `workflow-scenario-select` | `workflow-loading` | `workflow-error` | `workflow-error-retry-link` |
| WorkflowEditorPage | `workflow-editor-scenario-select` | `workflow-editor-loading` | `workflow-editor-error` | `workflow-editor-error-retry-link` |
| WorkflowHistoryPage | `workflow-history-scenario-select` | `workflow-history-loading` | `workflow-history-error` | `workflow-history-error-retry-link` |
| WorkflowSchedulePage | `workflow-scenario-select` (shared with list) | `workflow-schedule-loading` | `workflow-schedule-error` | `workflow-schedule-error-retry-link` |
| InsightOverviewPage | `insight-overview-scenario-select` | `insight-overview-loading` | `insight-overview-error` | `insight-overview-retry-link` |
| InsightReportsPage | `insight-reports-scenario-select` | `insight-reports-loading` | `insight-reports-error` | `insight-reports-retry-link` |
| InsightAnalysisPage | `insight-analysis-scenario-select` | `insight-analysis-loading` | `insight-analysis-error` | `insight-analysis-retry-link` |
| InsightExportPage | `insight-export-scenario-select` | `insight-export-loading` | `insight-export-error` | `insight-export-retry-link` |
| SettingsUsersPage | `settings-users-scenario-select` | `settings-users-loading` | `settings-users-error` | `settings-users-retry-link` |
| SettingsPermissionsPage | `settings-permissions-scenario-select` | `settings-permissions-loading` | `settings-permissions-error` | `settings-permissions-retry-link` |
| SettingsParamsPage | `settings-params-scenario-select` | `settings-params-loading` | `settings-params-error` | `settings-params-retry-link` |
| SettingsLogsPage | `settings-logs-scenario-select` | `settings-logs-loading` | `settings-logs-error` | `settings-logs-retry-link` |

**Note:** 3 pages (`SkillVersionsPage`, `WorkflowSchedulePage`, and 1 other) use the shared `skill-scenario-select` / `workflow-scenario-select` testid to indicate they share the selector with the list page. This is a minor inconsistency that should be normalized in V4+.

## Behavior

### States

| State | Visual Indicator |
| --- | --- |
| Loaded | Real data, full UI |
| Loading | Skeleton (Ant Design `Skeleton` component) |
| Empty | Ant Design `Empty` component with description text |
| Error | Ant Design `Alert type="error"` with retry link |

### Interactions

| Interaction | Trigger | Result |
| --- | --- | --- |
| Change scenario | user picks a value from the Select | `scenario` state updates, page re-renders with the matching view |
| Retry (from error) | user clicks the retry link | `scenario` resets to `'loaded'`, page re-renders |
| Switch from any state to any other state | user uses the Select | instant transition, no animation |

## Selectors

| Use Case | Primary | Stability | Confidence |
| --- | --- | --- | --- |
| Locate scenario select | `[data-testid$="-scenario-select"]` | High | 1.0 |
| Pick "Empty" option | `getByTitle('Empty', { exact: true })` (AntD renders options in portal) | High | 0.9 |

## Why This Pattern Is Important

1. **Deterministic evidence**: An agent can reproduce any of the 4 states on any page just by switching the Select. No need to wait for network or time-based states.
2. **Test coverage per state**: Each page's e2e tests assert on all 4 states, giving 4× the observable behavior per page.
3. **Drift detection**: A page that previously supported all 4 states but stops supporting one (e.g., removes the empty case) is immediately visible in tests.
4. **Evidence-friendly**: Every state has a known testid, so evidence collection is mechanical.

## Evidence References

| Evidence ID | Type | Description |
| --- | --- | --- |
| RS-TL-001 through RS-TL-004 | route-snapshot | 4 scenarios captured for task list |

## Notes

- This pattern was established in V2.1 and refined in V2.6-V2.10. The retro identified it as a "force multiplier" for test coverage.
- A future V4+ improvement: extract this into a `useScenarioState()` hook + `<ScenarioSelector />` component to remove duplication.
- The pattern intentionally does NOT put `scenario` in the URL. It is a demo/dev tool, not a user feature.
