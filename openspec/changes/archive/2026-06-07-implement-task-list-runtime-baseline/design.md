# Design: Task List Runtime Baseline

Status: Draft ready for implementation handoff

## Purpose

Convert approved specs into a frontend implementation design with explicit verification design.

## Design Basis

- Linked proposal: `proposal.md`
- Linked specs: `specs/task-list-runtime-baseline.md`
- Related architecture docs: `docs/01-architecture/frontend-skill-forge-architecture-blueprint.md`, current V2 docs in `docs/09-change-records/baselines/V2/`

## Affected Frontend Surfaces

| Surface | Type | Change |
| --- | --- | --- |
| `/task/list` | page | replace placeholder with dense task exploration surface |
| task list subregions | component/state | add filters, results, selection, and detail presentation |
| task list test coverage | test | replace smoke-only assumptions with richer route interaction checks |

## Technical Design

### UI And Interaction Design

- Component structure: split `TaskListPage` into page-level composition plus task-list-local presentational components where needed
- State flow: local deterministic mock-state model should drive visible scenarios such as loaded, loading, empty, error, and filtered/selected
- Error states: explicit error message region or alert presentation
- Loading states: skeletons, spinners, or placeholder content visible in main regions

### Data And Integration Design

- API or mock integration points: task-list-local mock data modules only
- Local state changes: filter selection, row selection, detail open state, scenario state toggle if exposed
- Routing changes: no new route required; interactions should remain on `/task/list`

### File Boundary

- Files expected to change:
  - `src/domains/task/pages/TaskListPage.tsx`
  - additional files under `src/domains/task/`
  - `tests/e2e/` task-list-focused specs
  - optional `src/shared/` or `src/testability/` helpers only when reuse is justified
- Files explicitly protected from change:
  - `src/domains/dashboard/**`
  - `src/domains/auth/**`
  - unrelated shell/navigation code unless a minimal task-list-specific adjustment is required

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

- Affected route or user flow: `/task/list`
- Expected happy-path scenario: task list loads with filters and detail interactions
- Expected failure or edge scenario: at least one empty or error scenario is assertable
- Evidence to capture: route assertions, interaction assertions, and non-happy-path assertions

### Non-Acceptable Verification

- Unit-only verification
- Statement of expected success without executed result
- Manual browser claim without captured evidence or command result

## Risks

| Risk | Impact | Control |
| --- | --- | --- |
| Cosmetic-only implementation | high | require filtering/selection/detail and non-happy-path states |
| Scope bleed into dashboard or task-create | medium | keep file boundary narrow |
| Hard-to-test local state | high | prefer deterministic mock state and accessible controls |
