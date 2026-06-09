# Create Task Skill References

Supporting reference material for the `create-task-skill`. Load lazily — only when the agent needs detailed field information or troubleshooting guidance.

See also: [`skill-creation-methodology.md`](skill-creation-methodology.md) — the complete methodology used to design, explore, and write this skill, intended as a reusable tutorial for creating other UI-to-skill mappings.

## TaskFormValues Interface

```typescript
interface TaskFormValues {
  title: string;          // required, non-empty
  priority: string;       // required: critical | high | medium | low
  assignee: string;       // optional: Alice | Bob | Charlie | Diana | Eve | empty
  category: string;       // required: infrastructure | security | bugfix | observability | performance
  description: string;    // optional, free text
  dueDate: string;        // optional, ISO date string or empty
  estimatedHours: number; // optional, 0-1000, validates >= 0
  isPublic: boolean;      // optional, default false
  tags: string[];         // optional: urgent | frontend | backend | devops | security | performance
}
```

## Allowed Values

### Priority

| Value | Color in Preview |
|-------|-----------------|
| `critical` | red |
| `high` | orange |
| `medium` | blue |
| `low` | default (gray) |

### Category

| Value |
|-------|
| `infrastructure` |
| `security` |
| `bugfix` |
| `observability` |
| `performance` |

### Assignee

| Value |
|-------|
| `Alice` |
| `Bob` |
| `Charlie` |
| `Diana` |
| `Eve` |
| (clear / empty) |

### Tags (multi-select)

| Value |
|-------|
| `urgent` |
| `frontend` |
| `backend` |
| `devops` |
| `security` |
| `performance` |

## Sample Values (loaded scenario)

```typescript
const sampleValues: TaskFormValues = {
  title: 'Upgrade database connection pooling',
  priority: 'critical',
  assignee: 'Alice',
  category: 'infrastructure',
  description: 'Migrate from HikariCP 5.x to 6.x to resolve connection leak under high concurrency.',
  dueDate: '2026-06-15T00:00:00Z',
  estimatedHours: 8,
  isPublic: true,
  tags: ['backend', 'devops'],
};
```

## Empty Values (empty / validation scenarios)

```typescript
const emptyValues: TaskFormValues = {
  title: '',
  priority: '',
  assignee: '',
  category: '',
  description: '',
  dueDate: '',
  estimatedHours: 0,
  isPublic: false,
  tags: [],
};
```

## Validation Function

```typescript
function validateForm(values: TaskFormValues): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!values.title.trim()) errors.title = 'Title is required';
  if (!values.priority) errors.priority = 'Priority is required';
  if (!values.category) errors.category = 'Category is required';
  if (values.estimatedHours < 0) errors.estimatedHours = 'Hours must be positive';
  return errors;
}
```

On submit, if validation errors exist, the form resets to Step 0 and error messages appear below each invalid field in red. If validation passes, a `Modal.success` dialog appears.

## 4-Step Wizard

| Step | Index | Label | Fields | Selector |
|------|-------|-------|--------|----------|
| Basic Info | 0 | Basic Info | title, priority, assignee | `[data-testid="step-basic-info"]` |
| Details | 1 | Details | category, description, tags | `[data-testid="step-details"]` |
| Settings | 2 | Settings | dueDate, estimatedHours, isPublic | `[data-testid="step-settings"]` |
| Review | 3 | Review | read-only summary + tags display | `[data-testid="step-review"]` |

Navigation buttons at bottom:
- Step > 0: "Previous" button (`[data-testid="btn-prev"]`)
- Step < 3: "Next" button (`[data-testid="btn-next"]`)
- Step === 3: "Create Task" submit button (`[data-testid="btn-submit"]`)

## Page Layout

```
+--------------------------------------------------------------+
|  Title: "Create Task" / "Task Creator"                        |
|  Subtitle: "Create and manage operational tasks..."           |
|  [Scenario: ▼ Loaded]                                        |
+--------------------------------------------------------------+
|  Col span={14}              |  Col span={10}                 |
|  +------------------------+ |  +---------------------------+ |
|  | TaskCreateForm         | |  | TaskPreview               | |
|  | [Steps: 0-1-2-3]       | |  | Title: ...                | |
|  |                        | |  | Priority: [critical]      | |
|  | (form fields per step) | |  | Assignee: Alice           | |
|  |                        | |  | Category: infrastructure  | |
|  | [Prev] [Next/Submit]   | |  | Description: ...          | |
|  +------------------------+ |  +---------------------------+ |
+--------------------------------------------------------------+
```

## 5 UI State Scenarios

Controlled by the scenario `<Select>` at the top of the page.

| Scenario | Selector (Task Center) | Selector (Skill Library) | What Renders | Form State |
|----------|----------------------|------------------------|-------------|------------|
| `loaded` | `[data-testid="task-create-scenario-select"]` | `[data-testid="skill-task-create-scenario-select"]` | Full form + preview | Pre-filled with sampleValues |
| `loading` | same | same | Skeleton placeholders | Form not rendered; skeleton shown |
| `empty` | same | same | Full form + preview | All fields blank (emptyValues) |
| `validation` | same | same | Full form + preview | Empty fields + inline error messages |
| `error` | same | same | Error Alert with retry link | Form not rendered; error alert shown |

### Switching Scenarios

- **loaded → empty**: sets `emptyValues`, clears validation, resets to step 0
- **loaded → validation**: sets `emptyValues`, shows validation errors, resets to step 0
- **loaded → loading**: hides form, shows skeleton
- **loaded → error**: hides form, shows error alert with "Retry" link
- **error → loaded**: click "Retry" link or re-select "Loaded"

## Success Confirmation

On successful validation and submission:

```typescript
Modal.success({
  title: 'Task Created',
  content: `Task "${values.title}" has been created successfully.`,
  // or for skill route: "...created successfully via Task Creator skill."
});
```

The success modal is an Ant Design `Modal.success` dialog with an OK button. Verify it by checking for the modal dialog in the page snapshot.

## Cross-References

| Related Skill | Relationship |
|---------------|-------------|
| `frontend-auth-login` | Run first if the browser session is not authenticated |
| `frontend-e2e-explorer` | Run if selector mismatches or page structure has changed |
| `frontend-registry-stitch` | Run if element registry for these routes needs updating |
| `frontend-project-reader` | Run if knowledge maps (route-map, component-map) are stale |

## Source Files

| File | Role |
|------|------|
| `src/domains/task/components/TaskCreateForm.tsx` | 4-step wizard form, TaskFormValues interface, all form-level data-testid selectors |
| `src/domains/task/components/TaskPreview.tsx` | Live preview sidebar (right column) |
| `src/domains/task/pages/TaskCreatePage.tsx` | Task Center page, scenario logic, validation function, sample/empty values |
| `src/domains/skill/pages/SkillTaskCreatePage.tsx` | Skill Library page variant (reuses same TaskCreateForm + TaskPreview) |
| `src/domains/task/data/mock-data.ts` | TaskItem interface, priority/category/status constants |
| `src/shell/config/moduleConfig.tsx` | Module config — task and skill tabs, sidebar menus |
| `src/app/router.tsx` | Route definitions for `/task/create` and `/skill/create-task` |
