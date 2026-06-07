# Design: Dashboard Runtime Baseline

Status: Draft ready for implementation handoff

## Purpose

Convert approved specs into a frontend implementation design with explicit verification design.

## Design Basis

- Linked proposal: `proposal.md`
- Linked specs: `specs/dashboard-runtime-baseline.md`
- Related architecture docs: `docs/01-architecture/frontend-skill-forge-architecture-blueprint.md`, `docs/09-change-records/baselines/V2/V2.2-DASHBOARD-RUNTIME-DESIGN.md`

## Affected Frontend Surfaces

| Surface | Type | Change |
| --- | --- | --- |
| `/dashboard` | page | replace placeholder with operations-style runtime surface |
| dashboard subregions | component/state | add metric cards, queue, feed, and detail surface |
| dashboard test coverage | test | replace smoke-only assumptions with richer route interaction checks |

## Technical Design

### UI And Interaction Design

- Component structure: split `DashboardPage` into page-level composition plus dashboard-local presentational components where needed
- State flow: local deterministic mock-state model should drive visible scenarios such as loaded, loading, empty, error, and filtered
- Error states: explicit error message region or alert presentation
- Loading states: skeletons, spinners, or placeholder content visible in main regions

### Data And Integration Design

- API or mock integration points: dashboard-local mock data modules only
- Local state changes: selected metric/filter state, selected detail item, scenario state toggle if exposed
- Routing changes: no new route required; interactions should remain on `/dashboard`

### File Boundary

- Files expected to change:
  - `src/domains/dashboard/pages/DashboardPage.tsx`
  - additional files under `src/domains/dashboard/`
  - `tests/e2e/` dashboard-focused specs
  - optional `src/shared/` or `src/testability/` helpers only when reuse is justified
- Files explicitly protected from change:
  - `src/domains/task/**`
  - `src/domains/auth/**`
  - unrelated shell/navigation code unless a minimal dashboard-specific adjustment is required

## Skill And MCP Execution Design

| Step | Skill | MCP / Tool | Expected Use |
| --- | --- | --- | --- |
| read | repo-reading workflow | CLI | gather dashboard, shell, and test context |
| explore | frontend exploration workflow | Playwright | inspect the implemented dashboard behavior |
| implement | frontend coding workflow | CLI / editor | build dashboard runtime surface |
| verify | frontend verification workflow | Playwright / CLI | execute build and dashboard E2E checks |

## Verification Design

### Mandatory Commands

- `npm run build`
- `npm run test:e2e`

### Mandatory E2E Coverage

- Affected route or user flow: `/dashboard`
- Expected happy-path scenario: dashboard loads with metric band and structured regions
- Expected failure or edge scenario: at least one empty or error scenario is assertable
- Evidence to capture: route assertions, interaction assertions, and non-happy-path assertions

### Non-Acceptable Verification

- Unit-only verification
- Statement of expected success without executed result
- Manual browser claim without captured evidence or command result

## Risks

| Risk | Impact | Control |
| --- | --- | --- |
| Cosmetic-only implementation | high | require cross-region interaction and non-happy-path states |
| Scope bleed into task modules | medium | keep file boundary narrow and reject unrelated domain changes |
| Hard-to-test local state | high | prefer deterministic mock state and accessible controls |
