# Skill Creation Methodology: From UI Flow to Executable Skill

## Who This Is For

This guide is written for AI agents (and their human operators) who need to create a new skill by mapping an existing frontend UI flow into a `SKILL.md`. It uses the `create-task-skill` as a worked example but the methodology applies to any UI-to-skill mapping.

**Prerequisites for the agent:** access to the codebase, ability to read source files, and (if doing browser verification) Playwright MCP tools.

---

## Phase 1: Understand the Target Flow

### 1.1 Identify Entry Points

The first question to answer: **where does the user enter this flow?**

Look in two places simultaneously:

**A. Router** (`src/app/router.tsx`) — Find the route path(s) and page component(s):
```
/search for:  path: '<your-flow-keyword>'
→ extracts:  route path + page component name
```

**B. Module Config** (`src/shell/config/moduleConfig.tsx`) — Find the tab/sidebar label:
```
/search for:  the module key (e.g., 'task', 'skill')
→ extracts:  tab label, sidebar filters, default route
```

**Worked example — create-task-skill:**
- Router gave us two routes: `/task/create` → `TaskCreatePage` and `/skill/create-task` → `SkillTaskCreatePage`
- Module config gave us: Task Center tab "Create Task", Skill Library tab "Task Creator"
- Discovery: same form component reused across two module shells

### 1.2 Launch Parallel Exploration

Spawn 3 Explore agents simultaneously. Each agent gets a specific search scope — never ask one agent to search everything.

**Agent 1 — Flow & Components:** Explore the domain directory for the flow.
```
Prompt: "Explore src/domains/<domain>/. Read all pages/ and components/ files.
        List every component, its props interface, and its data-testid selectors.
        Trace the user flow step by step."
```

**Agent 2 — Templates & Patterns:** Explore existing skills for format conventions.
```
Prompt: "Explore frontend-skill-template/ directory. Read 2-3 SKILL.md files.
        Report the exact YAML frontmatter format, section structure,
        and any recurring patterns in workflow steps and failure handling."
```

**Agent 3 — Mappings & Configs:** Explore the broader mapping infrastructure.
```
Prompt: "Explore all config files, mock data, selector registries, and
        element registries related to <domain>. Report every mapping
        pattern found: route→component, status→column, element→source."
```

**Why 3 agents:** Flow + Format + Mappings are independent concerns. Running them in parallel cuts exploration time by 2/3.

### 1.3 Read the Key Files Yourself

After agents report back, read the critical files directly:

1. **The page component** — understand state management, scenarios, event handlers
2. **The form/detail component** — extract every field, every selector, every validation rule
3. **The mock data** — understand data shapes, enums, default values
4. **One reference SKILL.md** — internalize the format (suggest `frontend-auth-login/SKILL.md` for action-type skills)

**Checklist — you should now know:**
- [ ] Every route that reaches this flow
- [ ] Every component involved and their props
- [ ] Every form field / interactive element
- [ ] Every `data-testid` selector
- [ ] Every UI state (loading, empty, error, edge cases)
- [ ] Every validation rule
- [ ] The exact format of a SKILL.md

---

## Phase 2: Build the Map

### 2.1 Extract the Data Model

Find the TypeScript interface that defines the form/data shape. Copy it exactly — this becomes your **Parameter Interface** table.

```typescript
// Source: src/domains/task/components/TaskCreateForm.tsx
export interface TaskFormValues {
  title: string;
  priority: string;
  // ... etc
}
```

For each field, determine:
- **Type** (from the interface)
- **Allowed values** (from mock-data enums, Select options arrays, or constants in the component)
- **Required/Optional** (from validation logic — grep for `errors.` assignments)
- **Which step/section** it appears in (from the JSX structure)

### 2.2 Build the Selector Inventory

Go through each component's JSX and extract every `data-testid` attribute. Group them into two categories:

**Page-level selectors** — unique to each route (page root, scenario selector, loading/error containers):
```
[data-testid="task-create-page"]
[data-testid="task-create-scenario-select"]
[data-testid="task-create-loading"]
[data-testid="task-create-error"]
[data-testid="task-create-error-retry-link"]
```

**Form-level selectors** — shared across routes (form root, step containers, inputs, buttons):
```
[data-testid="task-create-form"]
[data-testid="form-steps"]
[data-testid="step-basic-info"]
[data-testid="input-title"]
[data-testid="btn-next"]
[data-testid="btn-submit"]
```

**Rule:** If the same component is used on multiple routes, the form-level selectors are identical. Only page-level selectors differ (prefixed with the page name).

### 2.3 Map UI States

Find the scenario/state management in the page component. Look for:
- A `Scenario` type union
- A `useState<Scenario>` hook
- A `<Select>` that switches scenarios
- Conditional rendering based on scenario value

Document each state with:
- **What renders** (form, skeleton, alert, empty state)
- **How to enter it** (select "Loaded", select "Loading", etc.)
- **How to exit it** (select another option, click retry link)
- **What data is in the form** (sampleValues, emptyValues, etc.)

### 2.4 Extract Validation Rules

Find the validation function. It's typically called `validateForm` or inside `handleSubmit`. Document each rule:

```
title: required, non-empty (trimmed)
priority: required
category: required
estimatedHours: >= 0
```

Also note the **validation UX**: what happens when validation fails? (Form jumps to step 0? Inline errors appear? Modal?)

### 2.5 Reference Existing Maps

Every project with this architecture has knowledge maps. Note which ones are relevant:

| Map | Path | What It Provides |
|-----|------|-----------------|
| Route Map | `docs/02-harness/knowledge/frontend/route-map.md` | Route → page component, module |
| Component Map | `docs/02-harness/knowledge/frontend/component-map.md` | Component → file path, props |
| Element Registry | `docs/02-harness/knowledge/frontend/element-registry.json` | DOM element → source code mapping |
| Module Config | `src/shell/config/moduleConfig.tsx` | Module → tabs, sidebar |
| Selector Registry | `src/testability/selectors.ts` | Logical name → CSS selector |

**Do not inline these maps in the skill.** Reference them by path so the agent can load them lazily.

---

## Phase 3: Design the Skill

### 3.0 Sensitive Values: Use a Credentials File

**Never hardcode credentials (username, password, API keys, tokens) directly in SKILL.md workflow steps.** Even for demo/dev environments, storing credentials in a separate file has two benefits:

1. **Keeps prompts clean** — the user doesn't need to type `username=admin password=admin123` in every invocation
2. **Single source of truth** — when credentials change, update one file instead of every skill that references auth

**Pattern:**

Create `references/credentials.json`:
```json
{
  "base_url": "http://localhost:5173",
  "login_url": "/login",
  "credentials": {
    "username": "admin",
    "password": "admin123"
  },
  "post_login_redirect": "/"
}
```

In SKILL.md workflow steps, reference the file instead of inline values:
```markdown
### 3. Submit Credentials

Read credentials from `references/credentials.json`:
→ credentials.username, credentials.password

Fill [data-testid="login-username"] with <username from file>
Fill [data-testid="login-password"] with <password from file>
Click [data-testid="login-submit"]
```

In the Parameter Interface table, point to the file:
```markdown
| `username` | *(from `references/credentials.json`)* | `{{AUTH_USERNAME}}` |
| `password` | *(from `references/credentials.json`)* | `{{AUTH_PASSWORD}}` |
```

**Skills that reference auth should also point to the credentials file.** For example, `create-task-skill` step 0 says: "run `frontend-auth-login` first (credentials are in `frontend-skill-template/frontend-auth-login/references/credentials.json`)."

### 3.1 Choose the Skill Type

| Type | Use When | Example |
|------|----------|---------|
| `action` | Agent executes browser interactions (fill forms, click buttons, submit) | create-task-skill, frontend-auth-login |
| `exploration` | Agent observes and documents page behavior | frontend-e2e-explorer |
| `analysis` | Agent correlates browser elements to source code | frontend-registry-stitch |
| `implementation` | Agent writes or modifies source code | frontend-incremental-coder |
| `discovery` | Agent reads project structure and updates maps | frontend-project-reader |
| `planning` | Agent creates task/plan artifacts | frontend-task-creation |
| `precondition` | Agent ensures a prerequisite state before other skills | frontend-auth-login |

**Decision rule:** If the skill's primary output is a UI state change (form submitted, button clicked, page navigated), it's `action`.

### 3.2 Define Authority

| Authority | Meaning | When to Use |
|-----------|---------|-------------|
| `template` | Generic, must be adapted before use | The skill describes a pattern, not a specific project's UI |
| `project` | Ready to use in this specific project | Selectors, routes, and field values match the actual codebase |

`create-task-skill` is `authority: project` because its selectors (`[data-testid="input-title"]`) and routes (`/task/create`) are specific to the frontend-skill-forge codebase.

### 3.3 Design the Workflow

The workflow is the heart of the skill. Design it as numbered steps, each a discrete, verifiable action.

**Pattern for action-type skills:**

```
0. Prerequisite check   — auth, dev server, dependencies
1. Navigate             — browser_navigate to target route
2. Handle state         — read scenario selector, set correct state
3-N. Fill/interact      — one step per wizard step or form section
N+1. Review             — verify what was entered
N+2. Submit             — click submit/confirm
N+3. Verify             — confirm success (modal, redirect, toast)
```

**Rules for workflow steps:**
- Each step must be independently verifiable (the agent can snapshot and confirm)
- Use exact `data-testid` selectors — never rely on text content or CSS classes
- Include both the "happy path" and state-handling branches (loading, error, empty)
- The last step is always verification — never assume success

### 3.4 Anticipate Failure Modes

For each step in the workflow, ask: "What could go wrong here?" Create a `BLOCKED_BY_*` code.

**Pattern:**

| Step | What Could Fail | BLOCKED_BY Code |
|------|----------------|-----------------|
| Auth check | Not logged in | `BLOCKED_BY_NO_AUTH` |
| Navigate | 404, blank page | `BLOCKED_BY_PAGE_FAILED_TO_LOAD` |
| Handle state | Error scenario active | `BLOCKED_BY_ERROR_SCENARIO` |
| Fill fields | Selector not found | `BLOCKED_BY_SELECTOR_MISMATCH` |
| Fill fields | Value rejected | `BLOCKED_BY_INVALID_FIELD_VALUE` |
| Submit | Validation errors | `BLOCKED_BY_VALIDATION_ERRORS` |
| Any step | Form not rendered | `BLOCKED_BY_FORM_NOT_VISIBLE` |
| Any step | Scenario selector gone | `BLOCKED_BY_NO_SCENARIO_SELECTOR` |

For each code, define: symptom (what the agent sees), action (what the agent should do next).

### 3.5 Set Context Budget Rules

LLM context windows are finite. Establish rules to prevent waste:

1. **Limit snapshots**: Specify when to snapshot (after navigation, at review, at success) — not every step
2. **No raw DOM**: Reference the selector inventory instead of dumping HTML
3. **Lazy-load references**: Maps and reference files go in `references/`; only load when diagnosing a failure
4. **Compact output**: The output format should be a summary, not a transaction log

---

## Phase 4: Write the SKILL.md

### 4.1 File Structure

```
skill-name/
  SKILL.md              # REQUIRED — the executable skill
  references/           # OPTIONAL — lazy-loaded supporting material
    README.md           # Field reference, allowed values, diagrams
```

`SKILL.md` should be ~150-250 lines. If it's growing longer, move detail to `references/`.

### 4.2 YAML Frontmatter Template

```yaml
---
name: <kebab-case-skill-name>
description: <one-line — what and how. Include "via Playwright MCP" if it uses browser tools.>
compatibility: opencode
metadata:
  project: <project-name>
  skill_type: <action|exploration|analysis|implementation|discovery|planning|precondition|maintenance>
  authority: <template|project>
---
```

### 4.3 Section Order and Templates

Every SKILL.md follows this exact section order. Deviate only with a reason.

#### Purpose
One paragraph. State what, where, and the end result.

```markdown
## Purpose

<Verb> the <target UI> at `<route>`, <key actions>, and <end result>.
```

#### Use When / Do Not Use When
Bullet lists. Be specific about triggers and boundaries.

```markdown
## Use When

Use this Skill when:
- <specific user request or scenario>
- <another trigger>

Do not use this Skill when:
- <adjacent but different flow> — use <other skill> instead
- <missing prerequisite>
```

#### Required Inputs
Bullet list with defaults noted.

```markdown
## Required Inputs

- **<input name>** — <description>. Default: <value>.
```

#### Parameter Interface
A table for form fields. If there are many fields (>5), use a table.

```markdown
## Parameter Interface

| Parameter | Type | Allowed Values | Required | Step |
|-----------|------|---------------|----------|------|
| `fieldName` | `type` | `value1`, `value2` | Yes/No | N - Label |
```

#### Validation Rules
Compact table or list.

```markdown
## Validation Rules

| Field | Rule |
|-------|------|
| `fieldName` | Required — <detail> |
```

#### Route Map
If the same flow exists on multiple routes, show them.

```markdown
## Route Map

| Route | Page Component | Module | Tab Label |
|-------|---------------|--------|-----------|
| `/path` | `PageComponent` | Module Name | "Tab Label" |
```

#### Selector Inventory
The most important reference section. Group by page-level and form-level. Use the exact `data-testid` from source code.

```markdown
## Selector Inventory

### Page-Level Selectors

| Element | `/route-a` | `/route-b` |
|---------|-----------|-----------|
| Page root | `[data-testid="a-page"]` | `[data-testid="b-page"]` |

### Form-Level Selectors (shared)

| Element | Selector | Component |
|---------|----------|-----------|
| Form root | `[data-testid="form-name"]` | Container |
| Field input | `[data-testid="input-field"]` | `<Input>` |
```

#### UI State Scenarios
If the page has a scenario selector, document every state.

```markdown
## UI State Scenarios

| Scenario | Behavior | How to Reach |
|----------|----------|-------------|
| `loaded` | <description> | Default; select "Loaded" |
| `loading` | <description> | Select "Loading" |
```

#### Workflow
Numbered steps starting from 0. Each step: action + verification.

```markdown
## Workflow

### 0. <Prerequisite Check>

<What to check and how. If it fails, which BLOCKED_BY code to use.>

### 1. <Navigate>

Navigate to `{base_url}/path` using `browser_navigate`.
Verify <page root selector> is visible. If not, abort with `BLOCKED_BY_*`.

### 2-N. <Interact>

For each wizard step or form section:
- Verify current step is active
- List each field with its selector and how to interact
- Click the advance button with its selector

### N+1. <Review and Submit>

Verify review/summary. Click submit button.

### N+2. <Verify Success>

Check for success indicator (modal, redirect, toast).
If validation errors appear instead, describe the recovery path.
```

#### Failure Handling
Table. Every `BLOCKED_BY_*` code gets a row.

```markdown
## Failure Handling

| Code | Symptom | Action |
|------|---------|--------|
| `BLOCKED_BY_<NAME>` | <What the agent sees> | <What the agent should do> |
```

#### Context Budget Rules
5-7 rules about snapshot frequency, DOM handling, lazy loading.

```markdown
## Context Budget Rules

- Do not capture screenshots at every step. Snapshot at: <key moments>.
- Do not paste raw DOM. Use the selector inventory.
- <etc>
```

#### Output Format
A markdown template showing exactly what the agent should return.

```markdown
## Output Format

```md
# <Report Title>

## <Section>
- <field>: {value}

## Result
- Status: <success/failure>
```
```

#### References
Pointers to knowledge maps and source files. All prefixed with "Load lazily."

```markdown
## References

- **Route Map**: `docs/.../route-map.md` — <what it contains>
- **Source**: `src/domains/.../Component.tsx` — <what it defines>
- **Skill References**: `references/README.md` — <what's in it>
```

---

## Phase 5: Verify (Post-Writing Checklist)

Before declaring the skill complete, verify:

### Structural Verification
- [ ] YAML frontmatter has all 5 required fields (name, description, compatibility, metadata.project, metadata.skill_type, metadata.authority)
- [ ] Sections are in the standard order
- [ ] SKILL.md is under 300 lines (move overflow to references/)
- [ ] Every `data-testid` selector in the skill matches the actual source code (grep to confirm)

### Semantic Verification
- [ ] The workflow can be executed step-by-step by an agent that has never seen this UI
- [ ] Every failure mode in the workflow has a corresponding `BLOCKED_BY_*` code
- [ ] Every `BLOCKED_BY_*` code has a clear symptom and actionable next step
- [ ] The output format captures all information the user would want to see

### Integration Verification
- [ ] The skill is listed in `frontend-skill-template/README.md` catalog
- [ ] Cross-references to other skills (auth-login, e2e-explorer, etc.) are correct
- [ ] References to knowledge maps use paths that exist in the project

---

## Quick Reference: Agent Prompts for Each Phase

### Phase 1 Prompt Template (3 parallel Explore agents)

**Agent 1:**
```
Explore src/domains/<domain>/. Read all pages/*.tsx and components/*.tsx.
For each: list props interfaces, data-testid selectors, form fields,
conditional rendering branches, and event handlers. Report the full
user flow from page load to submit.
```

**Agent 2:**
```
Explore frontend-skill-template/. Read 2 SKILL.md files from different
skill types. Report: exact YAML frontmatter format, section ordering,
workflow step patterns, failure handling patterns, and how selectors
are documented. Focus on <action-type or whichever type matches> skills.
```

**Agent 3:**
```
Explore config files under src/shell/config/, data files under
src/domains/<domain>/data/, testability/selectors.ts, and the router.
Report every mapping: route→page, module→tab, selector→element,
and any enum/constant arrays used as field options.
```

### Phase 2 Prompt Template (1 Plan agent)

```
Design a skill named <skill-name> for the <flow-description>.
Context from exploration:
- Routes: <list>
- Components: <list with props>
- Form fields: <interface>
- Selectors: <data-testid inventory>
- UI states: <scenario list>
- Validation: <rules>

Required: parameter interface, selector inventory, workflow in numbered
steps, failure handling with BLOCKED_BY codes, output format.
Skill type: <action|exploration|etc>, authority: <template|project>.
Reference: existing skill at frontend-skill-template/<reference-skill>/SKILL.md
for format conventions.
Output: detailed implementation plan with exact section contents.
```

---

## Common Pitfalls

| Pitfall | Why It Happens | How to Avoid |
|---------|---------------|-------------|
| Selectors don't match source | Copied from snapshot instead of source code | Always grep `data-testid` in the component file to verify |
| Missing a UI state | Only explored the `loaded` scenario | Check the scenario `<Select>` — it lists all states |
| Workflow skips verification | Assumed submit always succeeds | Always add a "Verify Success" step after submit |
| Forgot validation rules | Only read the form JSX, not the submit handler | Read the full `handleSubmit` function — validation lives there |
| Wrong skill type | Guessed based on name instead of behavior | Ask: "Is the primary output a UI state change (action) or a document (planning/analysis)?" |
| SKILL.md too long | Inlined all reference material | Move field tables, diagrams, and allowed-values lists to `references/README.md` |
| Missing BLOCKED_BY codes | Only designed the happy path | For each workflow step, ask "what if this fails?" and add a code |
| Hardcoded credentials in SKILL.md | Copied login/password directly into workflow steps | Store credentials in `references/credentials.json`; reference the file path, never inline values |

---

## Appendix: create-task-skill Complete File Map

For reference, here is exactly what was created and where:

```
frontend-skill-template/create-task-skill/
  SKILL.md                          # ~250 lines, 8 workflow steps, 20+ selectors
  references/
    README.md                       # Field reference, allowed values, layout diagram
    skill-creation-methodology.md   # This document
```

**SKILL.md sections:** Purpose → Use When → Required Inputs → Parameter Interface (9-field table) → Validation Rules (4 rules) → Route Map (2 routes) → Selector Inventory (page-level + form-level) → UI State Scenarios (5 states) → Workflow (0-7 steps) → Failure Handling (8 codes) → Context Budget Rules (6 rules) → Output Format (template) → References (9 source/map pointers)

**Total creation time:** ~3 exploration agent rounds + 1 plan agent + 3 file writes = one session.
