# Frontend Project Reader

Status: v1 (V4)
Version: 1.0.0

## Purpose

Help agents read and model a frontend codebase. Given a project root, produce a project understanding summary that any future agent can use to navigate the codebase, plan changes, and identify risks — without re-discovering the structure from scratch.

## When to Use

Invoke this Skill when:

- Starting work on an unfamiliar frontend project
- Planning a change that touches multiple modules
- Needing to understand the route structure, component hierarchy, or state flow
- Onboarding a new agent to the project
- Verifying that a knowledge map is up-to-date after a surface change

Do NOT use when:

- Making a trivial single-file fix (just read the file directly)
- The knowledge maps are known to be stale (re-discover first)

## Inputs

| Input | Source | Format | Required |
| --- | --- | --- | --- |
| Project root | filesystem | directory path | yes |
| Route map | `docs/02-harness/knowledge/frontend/route-map.md` | markdown table | yes |
| Component map | `docs/02-harness/knowledge/frontend/component-map.md` | markdown table | yes |
| Project map | `docs/02-harness/knowledge/frontend/project-map.md` | markdown tables | yes |
| State flow map | `docs/02-harness/knowledge/frontend/state-flow-map.md` | markdown sections | yes |
| API contract map | `docs/02-harness/knowledge/frontend/api-contract-map.md` | markdown tables | yes |
| E2E registry | `docs/08-frontend-agent/e2e-assets/registry.md` | markdown table | optional |

## Minimum Context Path

For most route-level understanding tasks, do not load every input above immediately.

Start with:

1. `route-map.md`
2. `component-map.md`
3. `project-map.md`

Only load:

4. `state-flow-map.md` if state behavior matters
5. `api-contract-map.md` if mock-data structure matters
6. `e2e-assets/registry.md` if coverage classification matters

## Procedure

### Step 1: Read the Knowledge Maps

**Goal:** Load the project's documented structure into memory.

**Action:**
1. Read `route-map.md` → extract the route table (path, module, page component, testids, e2e specs, sidebar path)
2. Read `component-map.md` → extract the component tables (page components, sub-components, shell components)
3. Read `project-map.md` → extract the module summary, dependency stack, branching strategy
4. Read `state-flow-map.md` → extract the 3 state sources and their consumers
5. Read `api-contract-map.md` → extract the mock data file catalog

**Output:** 5 parsed data structures in memory.

**Validation:** Each map has a "Status" field. If Status is "Draft", the map is empty — abort and ask the user to populate it first.

### Step 2: Cross-Reference Routes and Components

**Goal:** Verify that every route has a corresponding page component, and vice versa.

**Action:**
1. For each route in route-map, check that the `Page Component` column has a matching entry in component-map's "Page Components" table
2. For each page component in component-map, check that there is a corresponding route in route-map
3. Flag any mismatches as "route-component gap"

**Output:** Route-component consistency report (list of gaps, or "no gaps found").

**Validation:** In the V2 surface, there should be 0 gaps — all 22 page components have routes.

### Step 3: Assess E2E Coverage

**Goal:** Identify routes without e2e test coverage.

**Action:**
1. For each route in route-map, check the "E2E Spec" column
2. If the column is empty or says "_none_", flag the route as "uncovered"
3. If the e2e registry is available, cross-reference to get the test count and classification

**Output:** Coverage report: list of uncovered routes, and for covered routes, the test count and classification (smoke/regression).

**Validation:** In the V2 surface, only `/login` should be uncovered. All other routes have ≥1 e2e spec.

### Step 4: Identify Risk Areas

**Goal:** Find areas of the codebase that are high-risk for changes.

**Action:**
1. Routes with no e2e coverage → high risk (no regression safety net)
2. Components with multiple parent pages → medium risk (shared dependency)
3. State sources that are NOT documented in state-flow-map → medium risk (unknown behavior)
4. Mock data files with no `empty*` export → low risk (empty state untested)
5. Sidebar items that share a `path` with another item → high risk (V2.10 sidebar drift pattern)

**Output:** Risk areas report with severity and rationale.

**Validation:** In the V2 surface, the only high-risk area should be `/login` (no e2e coverage).

### Step 5: Produce Project Understanding Summary

**Goal:** Compile all findings into a single summary document.

**Action:**
1. Combine: route table, component table, module overview, state sources, mock data catalog, coverage report, risk areas
2. Format as a structured markdown document with sections: Overview, Routes, Components, State Flow, Data Layer, E2E Coverage, Risk Areas, Recommended Next Steps
3. Include a "Last Updated" date matching the most recent knowledge map update

**Output:** Project understanding summary (one markdown document).

**Validation:** The summary should be readable by a new agent in <5 minutes. It should contain enough information to plan a change without reading the source code.

## Outputs

| Output | Format | Destination |
| --- | --- | --- |
| Project understanding summary | markdown | `docs/08-frontend-agent/evidence/project-understanding-summary.md` (or inline) |
| Route-component consistency report | list | inline in summary |
| Coverage report | table | inline in summary |
| Risk areas report | list | inline in summary |

## Validation Examples

### Example 1: V2 Surface (V3 knowledge maps)

**Input:** V2 surface with V3 knowledge maps populated

**Expected output:**
- 22 page components, 0 route-component gaps
- 1 uncovered route (`/login`), 21 covered routes
- 0 high-risk areas (except `/login`)
- 5 modules, 6 state sources, 7 mock data files

**Actual V3 evidence:** The V3.1 knowledge maps document exactly this. Running the Skill should reproduce the same structure.

### Example 2: New Route Added

**Input:** A new route `/task/analytics` added to router.tsx, but no e2e test yet

**Expected output:**
- 23 page components, 0 gaps (assuming the component exists)
- 2 uncovered routes (`/login`, `/task/analytics`)
- 1 high-risk area (`/task/analytics` — no e2e coverage)
- Recommended next step: add e2e spec for `/task/analytics`

## Known Limitations

1. **Knowledge maps may be stale.** If the source code has changed since the maps were last updated, the Skill's output will be inaccurate. Always check the "Last Updated" date in each map.

2. **No source code reading.** This Skill reads knowledge maps, not source code. If a map is missing or stale, the Skill cannot compensate by reading the source. Use `grep` or `read` tools for ad-hoc source inspection.

3. **No runtime observation.** This Skill does not run the dev server or capture screenshots. For runtime behavior, use `frontend-e2e-explorer`.

4. **Single-project scope.** This Skill is designed for the frontend-skill-forge project structure. Adapting it to other projects requires updating the knowledge map format.

## Cross-References

- **Uses:** `docs/02-harness/knowledge/frontend/` (5 maps)
- **Uses:** `docs/08-frontend-agent/e2e-assets/registry.md` (optional)
- **Produces:** project understanding summary (feeds into `frontend-incremental-coder`)
- **Related Skill:** `frontend-e2e-explorer` (for runtime observation)
- **Related Skill:** `frontend-incremental-coder` (for making changes based on the summary)
