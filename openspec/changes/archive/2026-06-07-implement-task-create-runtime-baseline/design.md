# Design: Task Create Runtime Baseline

Status: Draft ready for implementation handoff

## Purpose

Convert approved specs into a frontend implementation design with explicit
verification design.

## Design Basis

- Linked proposal: `proposal.md`
- Linked specs: `specs/task-create-runtime-baseline.md`
- Related architecture docs:
  `docs/01-architecture/frontend-skill-forge-architecture-blueprint.md`,
  current V2 docs in `docs/09-change-records/baselines/V2/`

## Affected Frontend Surfaces

| Surface | Type | Change |
| --- | --- | --- |
| `/task/create` | page | replace placeholder with structured task creation surface |
| task create subregions | component/state | add sections, validation feedback, and preview/review context |
| task create test coverage | test | replace smoke-only assumptions with richer route interaction checks |

## Technical Design

### UI And Interaction Design

- Component structure: split `TaskCreatePage` into page-level composition plus
  task-create-local presentational components where needed
- State flow: local deterministic mock-state model should drive visible
  scenarios such as loaded, loading, empty/default, error, validation, and
  previewed draft states
- Validation states: required fields should surface inline or summary feedback
- Preview states: a visible preview or review panel should reflect current form
  values without route changes
- Loading states: skeletons, spinners, or placeholder content visible in the
  main creation regions

### Data And Integration Design

- API or mock integration points: task-create-local mock data modules only
- Local state changes: step/section switch, preview toggle, field edits,
  validation errors, and draft resume logic
- Routing changes: no new route required; interactions should remain on
  `/task/create`

### File Boundary

- Files expected to change:
  - `src/domains/task/pages/TaskCreatePage.tsx`
  - additional files under `src/domains/task/`
  - `tests/e2e/` task-create-focused specs
  - optional `src/shared/` or `src/testability/` helpers only when reuse is
    justified
- Files explicitly protected from change:
  - `src/domains/dashboard/**`
  - `src/domains/task/pages/TaskListPage.tsx` unless a shared helper is
    necessary
  - `src/domains/auth/**`
  - unrelated shell/navigation code unless a minimal task-create-specific
    adjustment is required

## Skill And MCP Execution Design

| Step | Skill | MCP / Tool | Expected Use |
| --- | --- | --- | --- |
| read | repo-reading workflow | CLI | gather context |
| explore | frontend exploration workflow | Playwright | inspect live UI |
| implement | frontend coding workflow | CLI / editor | change code |
| verify | frontend verification workflow | Playwright / CLI | execute checks |

## Verification Design

### Mandatory Commands

- `npm run lint`
- `npm run build`
- `npm run test:e2e`

### Mandatory E2E Coverage

- Affected route or user flow: `/task/create`
- Expected happy-path scenario: task create loads with sections and preview
  interactions
- Expected failure or edge scenario: at least one validation or loading/error
  scenario is assertable
- Evidence to capture: route assertions, interaction assertions, and
  validation/preview assertions

### Non-Acceptable Verification

- Unit-only verification
- Statement of expected success without executed result
- Manual browser claim without captured evidence or command result

## Risks

| Risk | Impact | Control |
| --- | --- | --- |
| Cosmetic-only implementation | high | require validation plus preview/review behavior |
| Scope bleed into dashboard or task-list | medium | keep file boundary narrow |
| Hard-to-test local state | high | prefer deterministic mock state and accessible controls |
