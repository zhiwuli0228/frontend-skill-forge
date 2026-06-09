---
name: frontend-test-spec-generator
description: Given a code entry point (route, component path, or module+page), analyze
  frontend source code and generate executable E2E test specification documents in
  OpenSpec format. Produces spec.md, plan.md, and tasks.md ready for agent-driven
  Playwright E2E execution.
compatibility: opencode
metadata:
  project: frontend-skill-forge
  skill_type: analysis-and-generation
  authority: project
---

# Frontend Test Spec Generator

## Purpose

Convert a backend developer's feature reference (route / component path / module+page name) into three executable OpenSpec documents: `spec.md`, `plan.md`, and `tasks.md`. The output is structured so an agent equipped with Playwright MCP can immediately execute E2E verification without further code analysis.

## Use When

- A backend developer needs E2E verification for a frontend feature they do not deeply know
- Creating test-only OpenSpec changes (no implementation, only verification)
- Bootstrapping E2E coverage for a route with no existing spec
- Cross-module verification where multiple pages need coverage

Do not use when:

- The route already has complete E2E coverage (check route-map first)
- The change requires source code modifications (use `frontend-incremental-coder`)
- The task is pure exploration without spec generation (use `frontend-e2e-explorer`)

## Required Inputs

One of:

- Route path (`/skill/list/all`)
- Component file path (`src/domains/skill/pages/SkillListPage.tsx`)
- Module + page name (`skill`, `list`)

## Workflow

### Step 1: Resolve Entry Point

Resolve the user's input into a canonical target using the knowledge maps.

| Input Type | Resolution |
|---|---|
| Route path (`/skill/list/all`) | Look up row in `docs/02-harness/knowledge/frontend/route-map.md` → extract PageComponent, module, sub-features, existing E2E coverage |
| Component path (`src/domains/skill/pages/SkillListPage.tsx`) | Look up row in `docs/02-harness/knowledge/frontend/component-map.md` → extract parent page, data-testid root, key interactions |
| Module + page (`skill`, `list`) | Compose route → same as route path resolution |

If the entry point cannot be resolved, fail with `BLOCKED_BY_UNRESOLVED_ENTRY_POINT`.

**Context loaded**: route-map (matching row only), component-map (matching page + sub-component rows), `src/testability/selectors.ts` (entries matching module prefix).

### Step 2: Read Source Code

Read the page component file, up to 5 direct sub-components, and the mock data file.

**First, detect operation mode**:

1. `grep -c 'data-testid'` across page + sub-component files
2. If count > 0 → **IDEAL MODE**: extract testids per table below, use selector registry
3. If count == 0 → **LEGACY MODE**: see `references/legacy-anchor-strategy.md`; extract Ant Design component instances, placeholder/label/title props, button text, column definitions, heading text
4. If count == 0 AND no Ant Design (or other UI library) detected → fail with `BLOCKED_BY_ZERO_ANCHORS`

#### Ideal Mode Extraction (data-testid present)

| Extract | Method | Purpose |
|---|---|---|
| `data-testid` attributes | Regex `data-testid="([^"]+)"` / `data-testid={...}` | Selectable elements for E2E tests |
| Scenario states | `useState<Scenario>` with union type | Each state becomes a test scenario |
| Conditional renders | `if (scenario === 'X')` blocks | Defines what renders per state; drives GIVEN conditions |
| Interactive elements | `onClick`, `onChange`, `onSubmit`, `<Select>`, `<Button>`, `<Input>` | Each becomes a WHEN action |
| Route params | `useParams<{ filter?: string }>()` | URL-driven state for sidebar filter scenarios |
| State variables | `useState` declarations | Form fill targets, toggle targets |
| Cross-references | Identifiers matching `SELECTOR_REGISTRY` keys | Already have verified selectors; reference directly |

#### Legacy Mode Extraction (zero data-testid)

| Extract | Method | Selector Derivation |
|---|---|---|
| AntD imports | `import { (.*) } from 'antd'` | Which component→selector mappings to apply |
| Table columns | Find `const columns = [...]` | Extract `title` → `getByRole('columnheader', { name: /title/i })` |
| Button text | `>([^<]{2,30})</Button>` | `getByRole('button', { name: /text/i })` |
| Input placeholder | `placeholder="([^"]*)"` | `page.getByPlaceholder('$1')` |
| Form labels | `<Form.Item[^>]*label="([^"]*)"` | `page.getByLabel('$1')` |
| Modal/Drawer title | `title="([^"]*)"` on Modal/Drawer | `getByRole('dialog', { name: /title/i })` |
| Page heading | `<Typography.Title[^>]*>([^<]+)` | `getByRole('heading', { name: /text/i })` |
| Select options | `options={...}` arrays | Extract `label` values for dropdown option assertions |
| Tabs | `items={...}` or `<Tab.Pane tab="...">` | `getByRole('tab', { name: /label/i })` |
| Folder→route | `src/views/` or `src/pages/` listing | Derive module and page routes from directory names |

**Context budget**: Page file + mock data + up to 5 sub-components. In legacy mode, if sub-components lack Ant Design components, deprioritize them in favor of those with Ant Design usage.

### Step 3: Cross-Reference with Knowledge Maps

1. From `route-map.md`: route path, module, sidebar paths, existing E2E specs, MCP verification status
2. From `component-map.md`: component type, data-testid root, key interactions
3. From `moduleConfig.tsx` (via module key): tabs, sidebar menu items
4. From `selectors.ts`: which extracted testids have registry entries → use exact selector; unmatched → default `getByTestId()`

If route-map "Last Updated" is > 2 weeks behind source file git date, emit `BLOCKED_BY_STALE_KNOWLEDGE_MAP` warning.

### Step 4: Identify Testable Elements and Group into Scenarios

Build an **Element Table**:

```
| Element ID | Type | Selector | Interaction | States Visible | Registry |
|---|---|---|---|---|---|
| page-heading | heading | getByRole('heading',...) | (read-only) | all | skill-list.heading |
| scenario-select | select | getByTestId('skill-scenario-select') | onChange | all | skill-list.scenario-select |
| ... | ... | ... | ... | ... | ... |
```

Group into **scenario categories**:

| Category | Trigger | Scenarios |
|---|---|---|
| Page load / default state | Navigate to route | Heading + key regions visible |
| Scenario states | scenario selector | Loading skeleton, empty state, error + retry |
| Filter interactions | search/filter inputs | Narrow results, reset on "all" |
| View mode toggles | grid/list button | Grid visible, list visible |
| Detail interactions | card/row click | Modal/drawer opens, close returns |
| URL-driven state | `:filter?` param | Sidebar indicator visible, data filtered |
| Error recovery | retry link click | Returns to loaded state |

Skip categories that the page does not support (e.g., no scenario selector → skip scenario-state tests).

### Step 5: Generate spec.md

Output to `openspec/changes/test-<feature-slug>/specs/<feature-slug>/spec.md`.

Follow the Superspec template structure (`openspec/schemas/superspec/templates/specs/spec.md`):

```markdown
# Spec: E2E Verification for <PageName>

Status: Draft

## Purpose
Auto-generated test specification for <PageName> (<route>).

## Scope
- Capability: E2E verification of <module> <page> page behavior
- Target routes: <route> (variants: <sidebar paths>)
- Related components: <sub-component list>

## Functional Requirements

### Requirement: Page Initial Render
The system MUST render the <PageName> page with heading, filter bar, and data region.

#### Scenario: Default loaded state
- GIVEN the user navigates to <route>
- WHEN the page loads with scenario="loaded"
- THEN the heading <text> is visible
- AND the filter bar is visible (<selector>)
- AND the data region is visible (<selector>)

#### Scenario: Loading / Empty / Error states
...

### Requirement: Filter / Search Interaction
...

## End-To-End Verification Requirements
...

## Traceability
| Requirement | Planned E2E Spec | Selector | Evidence |
|---|---|---|---|
```

**Rules**:
- Reference exact selectors from registry when available; use `getByTestId()` as fallback
- Include all 4 scenario states if page has scenario selector
- Describe THEN in terms of observable browser behavior, not code state
- Add traceability table mapping each requirement to planned E2E spec + evidence type

### Step 6: Generate plan.md

Output to `openspec/changes/test-<feature-slug>/plan.md`.

Follow Superspec plan template (`openspec/schemas/superspec/templates/plan.md`):

- **Execution Sequence**: resolve → analyze → generate spec → write E2E tests → run tests → capture evidence
- **Skill Dispatch**: frontend-test-spec-generator (analysis) → frontend-incremental-coder (test writing) → frontend-e2e-explorer (execution)
- **MCP Plan**: optional browser_snapshot to confirm element visibility; `npm run test:e2e` for execution
- **Verification Plan**: E2E spec paths, browser flows per scenario, evidence capture paths, failure conditions

### Step 7: Generate tasks.md

Output to `openspec/changes/test-<feature-slug>/tasks.md`.

Follow Superspec tasks template (`openspec/schemas/superspec/templates/tasks.md`). Four sections:

1. **Discovery And Setup**: confirm route, page component, sub-components, existing coverage
2. **Test Implementation**: one task per scenario category (render, states, filters, toggle, detail, URL param, recovery)
3. **End-To-End Verification**: run tests, capture screenshots per state, capture HTML report
4. **Quality Gates**: lint, build, full test suite

Each task is a checkbox. Every implementation task maps to an E2E verification task.

## Failure Handling

| Code | Condition |
|---|---|
| `BLOCKED_BY_UNRESOLVED_ENTRY_POINT` | Cannot find route/component in maps |
| `BLOCKED_BY_STALE_KNOWLEDGE_MAP` | route-map or component-map outdated |
| `BLOCKED_BY_NO_DATA_TESTID` | Page has no data-testid attributes in Ideal Mode |
| `BLOCKED_BY_ZERO_ANCHORS` | Zero data-testid, no UI library (AntD/etc.), no semantic HTML — pure div/css |
| `BLOCKED_BY_EXISTING_COVERAGE` | Route already has complete E2E coverage |
| `BLOCKED_BY_CONTEXT_BUDGET` | Too many sub-components to read within budget |

## Context Budget Rules

- Load route-map row + component-map rows only for the target module
- Read page file + mock data + max 5 sub-components
- Do not load all knowledge maps
- Do not paste raw source code into output documents
- Keep generated spec/plan/tasks compact — reference existing templates, don't inline them

## Output Format

```md
# Code-to-Test-Spec Generation Report

## Input
- Entry point:
- Resolved target:

## Source Analysis Summary
- Page component:
- Sub-components used:
- Scenario states discovered:
- Interactive elements found (N):
- Selector registry matches (N):

## Generated Documents
- Change directory: openspec/changes/test-<slug>/
- spec.md: N requirements, M scenarios
- plan.md: N execution steps
- tasks.md: N checklist items

## Coverage Gap Notes
- Existing E2E coverage: <list or "none">
- Net new scenarios: N
```

## References

- `references/README.md` — reference index, usage guide, known limitations
- `references/code-to-scenario-heuristics.md` — React code patterns → GIVEN/WHEN/THEN mapping rules
- `references/legacy-anchor-strategy.md` — zero data-testid legacy project anchor strategy
- `references/output-examples/spec-example.md` — annotated spec.md example (Ideal Mode)
- `references/output-examples/plan-example.md` — annotated plan.md example
- `references/output-examples/tasks-example.md` — annotated tasks.md example
- `references/output-examples/legacy-spec-example.md` — annotated spec.md example (Legacy Mode, no data-testid)
