# Design: V3 First Evidence Loop

Status: Complete

## Knowledge Map Schemas

V3.1 defines and populates 5 knowledge maps. Each map uses a free-form markdown structure with embedded tables, since the existing templates do not specify field schemas.

### route-map.md
Per route: `| Path | Module | Page Component | Sub-Features | E2E Spec | Sidebar Path |`

### component-map.md
Per component: `| Path | Parent Page | Props Interface | Key Interactions | data-testid Root |`

### project-map.md
Per module: `| Module | Purpose | Routes | Mock Data | Sub-Components | E2E Specs | Sidebar Items |`

### state-flow-map.md
Three documented state sources, each with a table of consumers:
- Scenario selector (loaded/loading/empty/error)
- URL-derived filter (`useParams().filter`)
- Form-local state (multi-step, grouped, etc.)

### api-contract-map.md
Per mock-data file: `| File | Purpose | Exported Interfaces | Record Counts |`

## E2E Registry Schema (V3.2)

Single `registry.md` with:
- `## Active Specs` table: `| Spec File | Routes Covered | Tests | Classification | Priority | Last Run |`
- `## Coverage Summary`: smoke count, regression count, total coverage %
- `## Per-Route Coverage`: route → list of specs

## Evidence Record Schema (V3.3)

All records use the existing templates in `docs/08-frontend-agent/evidence/`. No new templates.

## Evolution Candidate Schema (V3.4)

Use `evolution-decision-record-template.md` for each candidate.

## Drift Demo Spec (V3.4)

Single test in `tests/e2e/drift-diagnosis-demo.spec.ts`. The spec intentionally:
1. Navigates to `/task/list/all`
2. Uses a stable `data-testid` to find the page root (positive control)
3. Tries an outdated selector (negative control) to demonstrate drift detection
4. Documents the expected failure pattern

This is the only new runtime code in V3. ~30 lines.

## V3 Closure Artifacts (V3.5)

Standard governance: baseline README, IR/SR bundle, iteration plan, per-minor-version gate files, aggregate summary, release record, retrospective, issues, decision ledger append.
