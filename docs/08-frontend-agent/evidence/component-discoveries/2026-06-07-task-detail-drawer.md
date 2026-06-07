# Component Discovery: TaskDetailDrawer

Status: Complete
Evidence ID: CD-TL-003

## Component Info

- **Name:** TaskDetailDrawer
- **Path:** `src/domains/task/components/TaskDetailDrawer.tsx`
- **Component Type:** sub-component (modal-like)
- **Parent Page:** TaskListPage
- **Props Interface:** `TaskDetailDrawerProps`
- **Discovery Date:** 2026-06-07

## Props

| Prop | Type | Purpose |
| --- | --- | --- |
| `task` | `TaskItem \| null` | The task to show details for; null = closed |
| `onClose` | `() => void` | Called when user dismisses the drawer |

## HTML Structure (when open)

```html
<div data-testid="task-detail-drawer" class="ant-drawer ant-drawer-open">
  <div class="ant-drawer-mask"></div>
  <div class="ant-drawer-content-wrapper">
    <div class="ant-drawer-header">
      <span class="ant-drawer-title">Task Details</span>
      <button class="ant-drawer-close" aria-label="Close">×</button>
    </div>
    <div class="ant-drawer-body">
      <h3>Upgrade database connection pooling</h3>
      <p>Status: in-progress</p>
      <p>Priority: critical</p>
      <p>Assignee: Alice</p>
      <p>Category: infrastructure</p>
      <p>Description: Migrate from HikariCP 5.x to 6.x...</p>
    </div>
  </div>
</div>
```

## Behavior

### States

| State | When | Visual |
| --- | --- | --- |
| closed | `task === null` | Not rendered (AntD doesn't render when `open={false}`) |
| open | `task !== null` | Slides in from the right |

### Interactions

| Interaction | Trigger | Result |
| --- | --- | --- |
| Close button (×) | user clicks | `onClose()` → parent sets `selectedTask = null` |
| Click mask | user clicks the dimmed background | `onClose()` |
| Press Escape | user presses Esc | `onClose()` |
| Click inside body | user interacts with content | (no callback) |

## Selectors

| Use Case | Primary | Fallback | Stability | Confidence |
| --- | --- | --- | --- | --- |
| Locate drawer | `[data-testid="task-detail-drawer"]` | `.ant-drawer` | High | 0.95 |
| Close button | `.ant-drawer-close` | `getByRole('button', { name: /close/i })` | High | 0.9 |
| Title | `.ant-drawer-title` | `getByText('Task Details')` | High | 0.9 |

## Evidence References

| Evidence ID | Type | Description |
| --- | --- | --- |
| IT-TL-001 | interaction-trace | Row click opens drawer |

## Notes

- The drawer is controlled by the parent's `selectedTask` state: passing `null` closes it, passing a `TaskItem` opens it with that task's data.
- The drawer uses `width` prop (deprecated in AntD 6, should be `size` in a future version). This is a known open item from V2.6-V2.10.
- The drawer body is intentionally simple — it shows the task fields as paragraphs. No edit form, no action buttons. Future enhancement.
- The drawer does not have a `data-testid` inside its body content; tests that need to verify the body content can use text-based selectors.
