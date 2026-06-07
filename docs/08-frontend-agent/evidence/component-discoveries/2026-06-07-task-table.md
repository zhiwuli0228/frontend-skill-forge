# Component Discovery: TaskTable

Status: Complete
Evidence ID: CD-TL-001

## Component Info

- **Name:** TaskTable
- **Path:** `src/domains/task/components/TaskTable.tsx`
- **Component Type:** sub-component (composed inside TaskListPage)
- **Parent Page:** TaskListPage
- **Props Interface:** `TaskTableProps` (defined in the same file)
- **Discovery Date:** 2026-06-07
- **Discovery Method:** source inspection + e2e artifact

## Props

| Prop | Type | Purpose |
| --- | --- | --- |
| `tasks` | `TaskItem[]` | The array of tasks to render |
| `selectedTaskId` | `string \| null` | Highlights the row matching this id |
| `onSelect` | `(task: TaskItem) => void` | Called when a row is clicked |

## HTML Structure (Ant Design Table)

```html
<div data-testid="task-table" class="ant-table">
  <div class="ant-table-container">
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Assignee</th>
          <th>Category</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        <tr class="ant-table-row" data-row-key="t1" onclick="...">
          <td>Upgrade database connection pooling</td>
          <td><span class="ant-tag ant-tag-blue">in-progress</span></td>
          ...
        </tr>
        ...
      </tbody>
    </table>
  </div>
</div>
```

## Behavior

### States

| State | When | Visual |
| --- | --- | --- |
| empty | `tasks.length === 0` | Renders `<Empty description="No tasks">` instead of the table |
| loaded-default | `tasks.length > 0`, no selected | Renders all rows, no highlight |
| loaded-selected | `selectedTaskId !== null` | Highlights the matching row with `.ant-table-row-selected` class |
| loading | (not implemented in this component — handled by parent) | (n/a) |
| error | (not implemented — handled by parent) | (n/a) |

### Interactions

| Interaction | Trigger | Result |
| --- | --- | --- |
| Row click | user clicks `.ant-table-row` | Calls `onSelect(task)` which updates `selectedTask` in parent |
| Hover | user hovers row | Adds `.ant-table-row-hover` class (no callback) |

## Selectors

| Use Case | Primary | Fallback | Stability | Confidence |
| --- | --- | --- | --- | --- |
| Locate table | `[data-testid="task-table"]` | `.ant-table` | High | 1.0 |
| Count rows | `[data-testid="task-table"] .ant-table-row` | (n/a) | High | 1.0 |
| Click specific row | `[data-testid="task-table"] .ant-table-row:nth-child(N)` | by text content | Medium | 0.8 |
| Verify empty | `getByText('No tasks')` | (n/a) | High | 1.0 |

## Evidence References

| Evidence ID | Type | Description |
| --- | --- | --- |
| RS-TL-001 | route-snapshot | Loaded state shows table with 10 rows |
| IT-TL-001 | interaction-trace | Row click opens drawer |

## Notes

- The `data-testid="task-table-empty"` is on the empty placeholder when `tasks.length === 0`. This is a different testid than the table itself.
- The Table uses Ant Design's built-in `onRow` handler to wire the click event.
- The table does not have a built-in sort or pagination — those are deferred to V5+ benchmark expansion.
- This component is the most-referenced component in the e2e tests (8 specs assert on `[data-testid="task-table"]`).
