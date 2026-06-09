---
name: create-task-skill
description: Create tasks through the frontend task creation wizard — guides an agent through a 4-step form with 5 UI states, validation, and success confirmation via Playwright MCP browser tools.
compatibility: opencode
metadata:
  project: frontend-skill-forge
  skill_type: action
  authority: project
---

# Create Task Skill

## Purpose

Navigate to the task creation wizard (`/task/create` or `/skill/create-task`), fill the 4-step form with provided or default values, handle all 5 UI states gracefully, submit, and verify success confirmation.

## Use When

Use this Skill when:

- The user asks to create a task, fill the task creation form, or test the task create wizard
- The user provides task details (title, priority, category, etc.) and wants them submitted through the UI
- The user wants to verify the task creation flow works end-to-end
- The target is `/task/create` (Task Center) or `/skill/create-task` (Skill Library)

Do not use this Skill when:

- The user wants to list, view, edit, or delete existing tasks — those are different flows
- Creating OpenSpec tasks or planning artifacts — use `frontend-task-creation` instead
- The dev server is not running
- Browser MCP tools are unavailable

## Required Inputs

- **Target route**: `/task/create` (default) or `/skill/create-task`
- **Task details** (all optional — defaults from Parameter Interface table apply if omitted):
  - `title` — task title
  - `priority` — critical / high / medium / low
  - `assignee` — Alice / Bob / Charlie / Diana / Eve
  - `category` — infrastructure / security / bugfix / observability / performance
  - `description` — free text
  - `tags` — urgent / frontend / backend / devops / security / performance (multi-select)
  - `dueDate` — ISO date string
  - `estimatedHours` — number 0-1000
  - `isPublic` — true / false
- **Base URL** of the running dev server (default: `http://localhost:5173`)
- **Authenticated session** — run `frontend-auth-login` first if navigating to the route redirects to `/login`

## Parameter Interface

| Parameter | Type | Allowed Values | Required | Step |
|-----------|------|---------------|----------|------|
| `title` | `string` | non-empty text | Yes | 0 - Basic Info |
| `priority` | `string` | `critical`, `high`, `medium`, `low` | Yes | 0 - Basic Info |
| `assignee` | `string` | `Alice`, `Bob`, `Charlie`, `Diana`, `Eve`, or empty | No | 0 - Basic Info |
| `category` | `string` | `infrastructure`, `security`, `bugfix`, `observability`, `performance` | Yes | 1 - Details |
| `description` | `string` | free text, can be empty | No | 1 - Details |
| `tags` | `string[]` | subset of: `urgent`, `frontend`, `backend`, `devops`, `security`, `performance` | No | 1 - Details |
| `dueDate` | `string` | ISO date string or empty | No | 2 - Settings |
| `estimatedHours` | `number` | `0` – `1000` | No (validates >= 0) | 2 - Settings |
| `isPublic` | `boolean` | `true` or `false` | No | 2 - Settings |

**Defaults (loaded scenario):** title=`"Upgrade database connection pooling"`, priority=`"critical"`, assignee=`"Alice"`, category=`"infrastructure"`, description=`"Migrate from HikariCP 5.x to 6.x..."`, dueDate=`"2026-06-15T00:00:00Z"`, estimatedHours=`8`, isPublic=`true`, tags=`["backend", "devops"]`

## Validation Rules

| Field | Rule |
|-------|------|
| `title` | Required — must not be empty (trimmed) |
| `priority` | Required |
| `category` | Required |
| `estimatedHours` | Must be >= 0 |

On validation failure, the form resets to Step 0 and error messages appear below each invalid field. On success, a `Modal.success` dialog confirms creation.

## Route Map

| Route | Page Component | Module | Tab Label |
|-------|---------------|--------|-----------|
| `/task/create` | `TaskCreatePage` | Task Center | "Create Task" |
| `/skill/create-task` | `SkillTaskCreatePage` | Skill Library | "Task Creator" |

Both routes use the same `TaskCreateForm` component and the same `TaskFormValues` interface. Only the page wrapper and `data-testid` prefixes differ.

## Selector Inventory

### Page-Level Selectors (route-specific)

| Element | `/task/create` | `/skill/create-task` |
|---------|---------------|---------------------|
| Page root | `[data-testid="task-create-page"]` | `[data-testid="skill-task-create-page"]` |
| Scenario selector | `[data-testid="task-create-scenario-select"]` | `[data-testid="skill-task-create-scenario-select"]` |
| Loading container | `[data-testid="task-create-loading"]` | `[data-testid="skill-task-create-loading"]` |
| Error container | `[data-testid="task-create-error"]` | `[data-testid="skill-task-create-error"]` |
| Error retry link | `[data-testid="task-create-error-retry-link"]` | `[data-testid="skill-task-create-error-retry-link"]` |

### Form-Level Selectors (shared across both routes)

| Element | Selector | Ant Design Component |
|---------|----------|---------------------|
| Form root | `[data-testid="task-create-form"]` | Container div |
| Steps indicator | `[data-testid="form-steps"]` | `<Steps>` |
| Step 0 container | `[data-testid="step-basic-info"]` | Step panel |
| Title input | `[data-testid="input-title"]` | `<Input>` |
| Priority select | `[data-testid="input-priority"]` | `<Select>` |
| Assignee select | `[data-testid="input-assignee"]` | `<Select allowClear>` |
| Step 1 container | `[data-testid="step-details"]` | Step panel |
| Category select | `[data-testid="input-category"]` | `<Select>` |
| Description textarea | `[data-testid="input-description"]` | `<TextArea rows={4}>` |
| Tags multi-select | `[data-testid="input-tags"]` | `<Select mode="multiple">` |
| Step 2 container | `[data-testid="step-settings"]` | Step panel |
| Due Date picker | `[data-testid="input-due-date"]` | `<DatePicker>` |
| Estimated Hours | `[data-testid="input-estimated-hours"]` | `<InputNumber min={0} max={1000}>` |
| Public Task switch | `[data-testid="input-is-public"]` | `<Switch>` |
| Step 3 container | `[data-testid="step-review"]` | Read-only summary |
| Previous button | `[data-testid="btn-prev"]` | `<Button>` (steps 1-3) |
| Next button | `[data-testid="btn-next"]` | `<Button type="primary">` (steps 0-2) |
| Submit button | `[data-testid="btn-submit"]` | `<Button type="primary">` (step 3) |
| Preview card | `[data-testid="task-preview"]` | Right sidebar card |
| Preview empty | `[data-testid="task-preview-empty"]` | Empty placeholder |

## UI State Scenarios

The page has a scenario `<Select>` that controls the UI state. Five scenarios exist:

| Scenario | Behavior | How to Reach |
|----------|----------|-------------|
| `loaded` | Form with sample data pre-filled; all interactive | Default; select "Loaded" |
| `loading` | Skeleton placeholders; form not visible | Select "Loading" |
| `empty` | Form with all fields blank; no validation errors | Select "Empty" |
| `validation` | Form with all fields blank; validation errors shown on required fields | Select "Validation" |
| `error` | Error alert with retry link; form not visible | Select "Error" |

**Scenario transitions from source code:**
- Selecting `empty`: clears values to `emptyValues`, hides validation, resets to step 0
- Selecting `validation`: clears values to `emptyValues`, shows validation, resets to step 0
- Selecting `loaded` or from error retry: restores `sampleValues`, hides validation
- Selecting `loading`: shows skeleton
- Selecting `error`: shows error alert with "Retry" link

## Workflow

### 0. Ensure Authenticated

Navigate to `{base_url}/`. Verify the page shows module navigation (GlobalShell header with module tag). If redirected to `/login`, run `frontend-auth-login` first (credentials are in `frontend-skill-template/frontend-auth-login/references/credentials.json`).

**Output:** auth confirmation or skip.

### 1. Navigate to Route

Navigate to the target route using Playwright MCP:

```
browser_navigate → {base_url}/task/create  (default)
or → {base_url}/skill/create-task
```

Wait for the page root `data-testid` to appear. Verify the page title ("Create Task" or "Task Creator") is visible. If the page fails to load (404, blank), abort with `BLOCKED_BY_PAGE_FAILED_TO_LOAD`.

### 2. Handle UI State

Check the current value of the scenario selector. The default scenario is `loaded` (form pre-filled with sample data).

- **loaded**: Proceed to Step 3. Only change fields the user explicitly asks to change.
- **loading**: Change scenario to `loaded`, wait for form to render.
- **empty**: Proceed to Step 3. All fields are blank; fill all required fields.
- **validation**: Same as empty, but error messages are already visible. Errors clear as each field is filled.
- **error**: Click the "Retry" link or change scenario to `loaded`.

If the user specifies a particular scenario, set it before proceeding.

### 3. Fill Step 0 — Basic Info

Verify current step is 0 (first step highlighted in the Steps indicator).

Fields to fill:
- **Title** (`[data-testid="input-title"]`): Type the task title. Required.
- **Priority** (`[data-testid="input-priority"]`): Select from dropdown. Required. Options: critical, high, medium, low.
- **Assignee** (`[data-testid="input-assignee"]`): Select from dropdown. Optional — can be cleared with the clear icon.

Click `[data-testid="btn-next"]` to advance to Step 1.

### 4. Fill Step 1 — Details

Verify step 1 is active.

Fields to fill:
- **Category** (`[data-testid="input-category"]`): Select from dropdown. Required. Options: infrastructure, security, bugfix, observability, performance.
- **Description** (`[data-testid="input-description"]`): Type into textarea. Optional.
- **Tags** (`[data-testid="input-tags"]`): Multi-select. Click to open dropdown, select one or more tags. Options: urgent, frontend, backend, devops, security, performance.

Click `[data-testid="btn-next"]` to advance to Step 2.

### 5. Fill Step 2 — Settings

Verify step 2 is active.

Fields to fill:
- **Due Date** (`[data-testid="input-due-date"]`): Ant Design DatePicker. Type an ISO date or use the picker UI. Optional.
- **Estimated Hours** (`[data-testid="input-estimated-hours"]`): Number input (0-1000). Type a number. Optional but validates >= 0.
- **Public Task** (`[data-testid="input-is-public"]`): Toggle switch. Click to toggle. Optional, defaults to false in empty state.

Click `[data-testid="btn-next"]` to advance to Step 3.

### 6. Review and Submit

Verify step 3 (Review) is active. The review panel shows a read-only summary of all entered values.

Also check `[data-testid="task-preview"]` in the right sidebar — it shows a live preview card with the same data (color-coded priority tag, assignee, category, description).

If any values are incorrect:
- Click `[data-testid="btn-prev"]` to go back to the relevant step
- Fix the field
- Click Next to advance back to Review

When satisfied, click `[data-testid="btn-submit"]`.

### 7. Verify Success

The submit handler validates the form and calls `Modal.success` on success.

- If a success modal appears with title "Task Created" and content containing the task title → **Done.**
- If the form jumps back to Step 0 with red error messages → validation failed. Read the error text, fix the indicated fields, and advance through steps again to re-submit.

## Failure Handling

| Code | Symptom | Action |
|------|---------|--------|
| `BLOCKED_BY_NO_AUTH` | Redirected to `/login` | Run `frontend-auth-login` first, then retry navigation |
| `BLOCKED_BY_PAGE_FAILED_TO_LOAD` | 404 or blank page on navigation | Verify dev server is running (`npm run dev`); check the route exists in `src/app/router.tsx` |
| `BLOCKED_BY_ERROR_SCENARIO` | Page shows error alert with retry link | Click "Retry" link or switch scenario selector to `loaded` |
| `BLOCKED_BY_VALIDATION_ERRORS` | Submit jumps back to Step 0 with inline errors | Read error text per field, fill the invalid fields, advance through steps, re-submit |
| `BLOCKED_BY_NO_SCENARIO_SELECTOR` | Scenario selector not found on page | Page structure may have changed; run `frontend-e2e-explorer` for this route |
| `BLOCKED_BY_FORM_NOT_VISIBLE` | Skeleton still showing after navigation | Switch scenario to `loaded` and wait for form to render |
| `BLOCKED_BY_SELECTOR_MISMATCH` | Expected `data-testid` selector not found | Verify page structure with a snapshot; run `frontend-registry-stitch` for this route |
| `BLOCKED_BY_INVALID_FIELD_VALUE` | Value rejected by form field | Check the Parameter Interface table for allowed values; retry with a valid value |

For each blocker, include: what was attempted, what evidence exists (snapshot, console output), what is missing, and the next safe action.

## Context Budget Rules

- Do not capture full browser screenshots at every step. Take one snapshot after navigation, one at the review step, and one at success/failure confirmation.
- Do not paste raw DOM into the response. Use the selector inventory above for all element references.
- Only fill fields the user explicitly specifies. For fields not mentioned, use the loaded-scenario defaults if already pre-filled, or leave them blank in empty/validation scenarios (then fill only required fields).
- If the form is pre-filled (loaded scenario), do not clear fields the user hasn't asked to change.
- Reference knowledge maps by path — do not read them into context unless needed for diagnosis.
- Keep the output compact: a task creation summary listing the title, key fields, and final status.

## Output Format

```md
# Task Creation Report

## Route
- URL: {base_url}/task/create (or /skill/create-task)
- Scenario: loaded / empty / validation

## Fields Submitted
- Title: {value}
- Priority: {value}
- Category: {value}
- Assignee: {value}
- Estimated Hours: {value}
- Tags: {values}
- Public: {true/false}

## Steps Completed
0. Auth check — OK
1. Navigate to route — OK
2. Handle UI state — OK (scenario: {name})
3. Step 0: Basic Info — OK
4. Step 1: Details — OK
5. Step 2: Settings — OK
6. Step 3: Review — OK
7. Submit — OK, success modal confirmed

## Result
- Status: Created successfully
- Confirmation: Modal.success with title "Task Created"
```

## References

Knowledge maps and source files providing additional context. Load lazily — only when needed for diagnosis or verification.

- **Route Map**: `docs/02-harness/knowledge/frontend/route-map.md` — route `/task/create` and `/skill/create-task` definitions
- **Component Map**: `docs/02-harness/knowledge/frontend/component-map.md` — `TaskCreateForm` and `TaskPreview` entries
- **Element Registry**: `docs/02-harness/knowledge/frontend/element-registry.json` — stitched element entries for these routes
- **Module Config**: `src/shell/config/moduleConfig.tsx` — task and skill module tab/sidebar definitions
- **Selector Registry**: `src/testability/selectors.ts` — registered logical selectors
- **Mock Data**: `src/domains/task/data/mock-data.ts` — priority, category, status constants
- **Form Source**: `src/domains/task/components/TaskCreateForm.tsx` — `TaskFormValues` interface, 4-step definition
- **Page Sources**: `src/domains/task/pages/TaskCreatePage.tsx`, `src/domains/skill/pages/SkillTaskCreatePage.tsx`
- **Skill References**: `references/README.md` — detailed field reference, allowed values, validation logic, layout diagram
