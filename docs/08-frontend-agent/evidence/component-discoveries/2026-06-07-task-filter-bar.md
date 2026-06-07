# Component Discovery: TaskFilterBar

Status: Complete
Evidence ID: CD-TL-002

## Component Info

- **Name:** TaskFilterBar
- **Path:** `src/domains/task/components/TaskFilterBar.tsx`
- **Component Type:** sub-component
- **Parent Page:** TaskListPage
- **Props Interface:** `TaskFilterBarProps`
- **Discovery Date:** 2026-06-07

## Props

| Prop | Type | Purpose |
| --- | --- | --- |
| `statusFilter` | `string \| null` | Currently selected status |
| `priorityFilter` | `string \| null` | Currently selected priority |
| `categoryFilter` | `string \| null` | Currently selected category |
| `onStatusChange` | `(value: string \| null) => void` | Status change callback |
| `onPriorityChange` | `(value: string \| null) => void` | Priority change callback |
| `onCategoryChange` | `(value: string \| null) => void` | Category change callback |

## HTML Structure

```html
<div data-testid="task-filter-bar" class="ant-space ant-space-horizontal">
  <div>
    <span class="ant-select" data-testid="filter-status">
      <span class="ant-select-selection-item">All Status</span>
    </span>
  </div>
  <div>
    <span class="ant-select" data-testid="filter-priority">
      <span class="ant-select-selection-item">All Priority</span>
    </span>
  </div>
  <div>
    <span class="ant-select" data-testid="filter-category">
      <span class="ant-select-selection-item">All Category</span>
    </span>
  </div>
</div>
```

## Behavior

### States

| State | Visual |
| --- | --- |
| all-null | All 3 selects show "All ..." |
| partially-set | One or more selects show the selected value |
| (no loading/error/empty states) | (n/a — these are handled at the page level) |

### Interactions

| Interaction | Trigger | Result |
| --- | --- | --- |
| Status select change | user picks a status | `onStatusChange(value)` is called |
| Priority select change | user picks a priority | `onPriorityChange(value)` is called |
| Category select change | user picks a category | `onCategoryChange(value)` is called |
| Reset to "All" | user picks the "All" option (which is the empty string) | `onXChange(null)` is called |

## Selectors

| Use Case | Primary | Stability | Confidence |
| --- | --- | --- | --- |
| Locate filter bar | `[data-testid="task-filter-bar"]` | High | 1.0 |
| Status filter | `[data-testid="filter-status"]` | High | 1.0 |
| Priority filter | `[data-testid="filter-priority"]` | High | 1.0 |
| Category filter | `[data-testid="filter-category"]` | High | 1.0 |

## Evidence References

| Evidence ID | Type | Description |
| --- | --- | --- |
| RS-TL-001 | route-snapshot | Filter bar visible in loaded state |

## Notes

- The filter bar's 3 selects combine via AND logic with the URL filter in the parent page. This means up to 4 conditions filter the same table.
- Filter values use the actual mock data enums (e.g., status is one of `'open' | 'in-progress' | 'completed' | 'blocked' | 'archived'`). A "Select All" option with value `null` resets that one filter.
- The filter bar is not rendered in loading/empty/error states (the entire page short-circuits to skeleton/empty/error).
- This is the only "form-like" control on the task list page. The URL filter is the primary filter mechanism; this is supplementary.
