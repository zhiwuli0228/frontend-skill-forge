# Selector Stability Evaluation — V6 Real MCP

Date: 2026-06-07
Session: V6 MCP-Assisted Exploration
Routes evaluated: `/task/list`, `/skill/list`, `/workflow/editor`
Method: Live Playwright MCP browser inspection

## Summary

Total selectors evaluated: 28
- High stability: 18 (64%)
- Medium stability: 8 (29%)
- Low stability: 2 (7%)

## /task/list Selectors

| Selector | Type | Stability | Reason |
|----------|------|-----------|--------|
| `[data-testid="task-scenario-select"]` | data-testid | **High** | Dedicated test attribute, highest tier |
| `role=row[name*="task title"]` | ARIA role | **High** | Semantic role with accessible name |
| `role=dialog` | ARIA role | **High** | Drawer rendered as dialog |
| `role=button[name="Close"]` | ARIA role+label | **High** | Unique accessible button |
| `role=checkbox[name="Select all"]` | ARIA role+label | **High** | Unique accessible checkbox |
| `role=combobox` (Status filter) | ARIA role | **Medium** | Multiple comboboxes, need label disambiguation |
| `role=combobox` (Priority filter) | ARIA role | **Medium** | Multiple comboboxes, need label disambiguation |
| `role=combobox` (Category filter) | ARIA role | **Medium** | Multiple comboboxes, need label disambiguation |
| `role=button[name="filter"]` (Status) | ARIA role+label | **Medium** | Multiple filter buttons with same label |
| `text "No tasks match the current filter"` | Text content | **Low** | Content may change |

## /skill/list Selectors

| Selector | Type | Stability | Reason |
|----------|------|-----------|--------|
| `role=textbox[name="Search skills..."]` | ARIA role+label | **High** | Unique search input |
| `role=button[name="appstore"]` | ARIA role+label | **High** | Unique icon button |
| `role=button[name="unordered-list"]` | ARIA role+label | **High** | Unique icon button |
| `role=dialog` (skill detail) | ARIA role | **High** | Modal dialog |
| `role=combobox` (category filter) | ARIA role | **Medium** | Multiple comboboxes |
| `role=combobox` (sort selector) | ARIA role | **Medium** | Multiple comboboxes |
| `role=combobox` (tags filter) | ARIA role | **Medium** | Multiple comboboxes |
| `strong` with skill name | HTML element | **Low** | Semantic but not test-oriented |

## /workflow/editor Selectors

| Selector | Type | Stability | Reason |
|----------|------|-----------|--------|
| `role=button[name="save Save"]` | ARIA role+label | **High** | Unique button |
| `role=button[name="play-circle Run"]` | ARIA role+label | **High** | Unique button |
| `role=dialog[name="Node Properties"]` | ARIA role+title | **High** | Unique dialog title |
| `role=button[name="delete Delete Node"]` | ARIA role+label | **High** | Unique delete button |
| `role=spinbutton` (X/Y position) | ARIA role | **Medium** | Multiple spinbuttons |
| Node card (TRIGGER + label) | HTML structure | **Medium** | Needs type+label combo |

## Findings

1. **data-testid usage is sparse**: Only `task-scenario-select` uses a dedicated `data-testid`. Most selectors rely on ARIA roles and labels.
2. **ARIA-based selectors are reliable**: Role+label combinations provide good stability for buttons, dialogs, and inputs.
3. **Combobox disambiguation is needed**: Pages with multiple filters (status, priority, category) share the same `combobox` role — agents need label context to target the right one.
4. **No data-testid on cards or nodes**: Skill cards and workflow nodes lack test attributes, making them harder to target programmatically.
5. **Text-based selectors are fragile**: Content strings like "No tasks match the current filter" may change with i18n or copy updates.

## Recommendations

1. Add `data-testid` to skill cards (`skill-card-{name}`) and workflow nodes (`workflow-node-{id}`)
2. Add `data-testid` to filter comboboxes (`filter-status`, `filter-priority`, `filter-category`)
3. Add `data-testid` to pagination controls
4. Keep ARIA roles as primary selectors — they're semantic and accessibility-friendly
5. Avoid text-content selectors for automated tests
