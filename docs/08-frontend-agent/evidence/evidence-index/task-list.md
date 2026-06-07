# Evidence Index: /task/list (Task List Page)

Status: Populated + validation-backed (V6 + run-04)
Last Updated: 2026-06-07

## Index Info

- **Route:** /task/list/:filter?
- **Last Updated:** 2026-06-07
- **Total Evidence Records:** 13

## Evidence List

| Evidence ID | Type | Captured | Confidence | Description |
| --- | --- | --- | --- | --- |
| RS-TL-001 | route-snapshot | 2026-06-07 | 0.95 | Loaded state — table renders 10 rows |
| RS-TL-002 | route-snapshot | 2026-06-07 | 0.95 | Loading state — skeleton placeholder |
| RS-TL-003 | route-snapshot | 2026-06-07 | 0.95 | Empty state — no tasks message |
| RS-TL-004 | route-snapshot | 2026-06-07 | 0.95 | Error state — alert with retry link |
| CD-TL-001 | component-discovery | 2026-06-07 | 1.0 | TaskTable sub-component |
| CD-TL-002 | component-discovery | 2026-06-07 | 1.0 | TaskFilterBar sub-component |
| CD-TL-003 | component-discovery | 2026-06-07 | 0.95 | TaskDetailDrawer sub-component |
| CD-TL-004 | component-discovery | 2026-06-07 | 1.0 | Scenario selector pattern (cross-page) |
| IT-TL-001 | interaction-trace | 2026-06-07 | 0.9 | Row click → drawer open → close |
| IT-TL-002 | interaction-trace | 2026-06-07 | 0.95 | Scenario switch: loaded → empty → loaded |
| IT-TL-003 | interaction-trace | 2026-06-07 | 0.95 | Scenario switch: loaded → error → retry → loaded |
| 2026-06-07-V3-task-list-exploration | mcp-session | 2026-06-07 | n/a | Parent session record |
| 2026-06-07-ui-validation-run-04 | validation-run | 2026-06-07 | n/a | Artifact-governed MCP validation baseline for `/task/list/all` |

## By Type

### Route Snapshots (4)

| ID | Route | Scenario | File |
| --- | --- | --- | --- |
| RS-TL-001 | /task/list/all | loaded | [../route-snapshots/2026-06-07-task-list-loaded.md](../route-snapshots/2026-06-07-task-list-loaded.md) |
| RS-TL-002 | /task/list/all | loading | [../route-snapshots/2026-06-07-task-list-loading.md](../route-snapshots/2026-06-07-task-list-loading.md) |
| RS-TL-003 | /task/list/all | empty | [../route-snapshots/2026-06-07-task-list-empty.md](../route-snapshots/2026-06-07-task-list-empty.md) |
| RS-TL-004 | /task/list/all | error | [../route-snapshots/2026-06-07-task-list-error.md](../route-snapshots/2026-06-07-task-list-error.md) |

### Component Discoveries (4)

| ID | Component | File |
| --- | --- | --- |
| CD-TL-001 | TaskTable | [../component-discoveries/2026-06-07-task-table.md](../component-discoveries/2026-06-07-task-table.md) |
| CD-TL-002 | TaskFilterBar | [../component-discoveries/2026-06-07-task-filter-bar.md](../component-discoveries/2026-06-07-task-filter-bar.md) |
| CD-TL-003 | TaskDetailDrawer | [../component-discoveries/2026-06-07-task-detail-drawer.md](../component-discoveries/2026-06-07-task-detail-drawer.md) |
| CD-TL-004 | Scenario Selector Pattern | [../component-discoveries/2026-06-07-scenario-selector.md](../component-discoveries/2026-06-07-scenario-selector.md) |

### Interaction Traces (3)

| ID | Interaction | File |
| --- | --- | --- |
| IT-TL-001 | Row click → drawer | [../interaction-traces/2026-06-07-row-click-drawer.md](../interaction-traces/2026-06-07-row-click-drawer.md) |
| IT-TL-002 | Scenario switch empty | [../interaction-traces/2026-06-07-scenario-empty-switch.md](../interaction-traces/2026-06-07-scenario-empty-switch.md) |
| IT-TL-003 | Error retry | [../interaction-traces/2026-06-07-error-retry.md](../interaction-traces/2026-06-07-error-retry.md) |

### Failure Diagnoses (0)

(none yet — V3.4 will add the first one)

### Validation Runs (1)

| ID | Scope | File |
| --- | --- | --- |
| 2026-06-07-ui-validation-run-04 | `/task/list/all` MCP validation baseline | [../../../../artifacts/validation/runs/2026-06-07-ui-validation-run-04/manifest.md](../../../../artifacts/validation/runs/2026-06-07-ui-validation-run-04/manifest.md) |

## Summary

- **Total Records:** 13
- **Active:** 13
- **Archived:** 0
- **Average Confidence:** 0.96
- **Coverage:** All 4 scenarios captured, all 3 sub-components discovered, 3 key interactions traced, plus 1 artifact-governed validation baseline under `artifacts/validation/`

## Cross-References

This evidence set feeds into:

- `docs/08-frontend-agent/e2e-assets/registry.md` — the task-list e2e specs are the cross-validation
- `docs/02-harness/knowledge/frontend/route-map.md` — confirms route 4 details
- `docs/02-harness/knowledge/frontend/component-map.md` — confirms S1, S2, S3 details
- `docs/02-harness/knowledge/frontend/state-flow-map.md` — confirms scenario selector and URL filter patterns
- `artifacts/validation/runs/2026-06-07-ui-validation-run-04/manifest.md` — provides governed pointers to raw report, trace, screenshot, log, and MCP artifacts

## Next Steps

- The route behavior evidence is complete, and `2026-06-07-ui-validation-run-04` now links both CLI runtime artifacts and direct MCP supplemental artifacts.
- Future reruns should preserve this dual evidence pattern instead of replacing it with code-only or single-tool validation.
- If any new evidence is added, this index should be updated to keep total counts and average confidence current.
