# Frontend Incremental Coder

Status: v1 (V4)
Version: 1.0.0

## Purpose

Help agents make bounded frontend changes. Given a change request, produce a minimal change plan that respects architecture boundaries, updates evidence, and passes verification — without introducing unintended side effects.

## When to Use

Invoke this Skill when:

- Implementing a new feature within an existing module
- Fixing a bug in a documented area
- Refactoring a component without changing its external behavior
- Adding a new route to an existing module
- Updating mock data to support new sidebar filter values

Do NOT use when:

- The change crosses module boundaries (escalate to human review first)
- The change requires a new module (use the architecture blueprint to plan)
- The change is purely documentation (just edit the docs directly)

## Inputs

| Input | Source | Format | Required |
| --- | --- | --- | --- |
| Change request | user or agent | text description | yes |
| Architecture boundary | `docs/01-architecture/module-boundary.md` | rules | yes |
| Existing evidence | `docs/08-frontend-agent/evidence/` | evidence records | yes |
| Affected routes/components | `docs/02-harness/knowledge/frontend/route-map.md`, `component-map.md` | tables | yes |
| Verification policy | `docs/02-harness/rules/` | rules | yes |
| Knowledge maps | `docs/02-harness/knowledge/frontend/` | 5 maps | yes |

## Minimum Context Path

For small bounded changes, start with the minimum set:

1. change request
2. target `route-map.md` entry
3. target `component-map.md` entry
4. affected source file(s)
5. one latest validation/evidence record if the route has recent runtime validation

Only load the rest of the knowledge maps if the change crosses state, data, or architectural boundaries.

## Procedure

### Step 1: Parse the Change Request

**Goal:** Understand what the change is asking for.

**Action:**
1. Identify the target module (task/skill/workflow/insight/settings)
2. Identify the target route(s) and component(s)
3. Classify the change type: new route, new component, bug fix, refactor, mock data update
4. Identify the expected output: new file, modified file, deleted file

**Output:** Change classification (module, type, affected files).

**Validation:** If the change affects ≥2 modules, pause and ask for human guidance.

### Step 2: Check Architecture Boundaries

**Goal:** Ensure the change does not violate module boundaries.

**Action:**
1. Read `module-boundary.md` → extract the boundary rules
2. Check if the change imports from another module's `pages/` or `components/`
3. Check if the change modifies `src/shell/config/moduleConfig.tsx` (sidebar changes need extra care)
4. Check if the change modifies `src/app/router.tsx` (route changes need extra care)

**Output:** Boundary check result (pass or violation with explanation).

**Validation:** The V2.10 sidebar hotfix (adding `:filter?` params) crossed the router boundary but was justified because it fixed a bug. Document the justification.

### Step 3: Read Existing Evidence

**Goal:** Understand the current state of the affected area.

**Action:**
1. Check if the affected route has evidence records in `docs/08-frontend-agent/evidence/`
2. Check if the affected component has a component-discovery record
3. Check if there are any failure-diagnosis records for the area
4. Check the e2e registry for existing test coverage

**Output:** Evidence summary (what's documented, what's not).

**Validation:** If the affected area has NO evidence records, flag as "undocumented area — extra caution needed."

### Step 4: Read Affected Components

**Goal:** Understand the current code before modifying it.

**Action:**
1. Read the affected page component(s) from `src/domains/<module>/pages/`
2. Read the affected sub-component(s) from `src/domains/<module>/components/`
3. Read the mock data file from `src/domains/<module>/data/`
4. Note the existing `data-testid` values (they must be preserved or intentionally changed)

**Output:** Current code understanding (structure, props, state, testids).

**Validation:** If a component has >200 lines, consider splitting the change into smaller steps.

### Step 5: Produce Minimal Change Plan

**Goal:** Define exactly what to change and what NOT to change.

**Action:**
1. List files to create (with purpose)
2. List files to modify (with specific changes)
3. List files NOT to touch (with rationale)
4. List new `data-testid` values to add (if any)
5. List existing `data-testid` values to preserve
6. List mock data changes (new fields, new items, updated items)

**Output:** Minimal change plan (structured document).

**Validation:** The plan should be achievable in <50 lines of code changes. If it's larger, break it into multiple changes.

### Step 6: Execute the Plan

**Goal:** Make the code changes.

**Action:**
1. Create new files (pages, components, mock data)
2. Modify existing files (scoped edits only)
3. Update `src/app/router.tsx` if adding a new route
4. Update `src/shell/config/moduleConfig.tsx` if adding sidebar items
5. Preserve all existing `data-testid` values (do not rename unless explicitly requested)

**Output:** Modified files.

**Validation:** After each edit, the file should still compile (`npm run build` should not fail).

### Step 7: Run Verification

**Goal:** Ensure the change does not break anything.

**Action:**
1. `npm run lint` → 0 errors
2. `npm run build` → clean
3. `npm run test:e2e` → existing tests still pass
4. If adding a new route, add a new e2e spec in `tests/e2e/`

**Output:** Verification result (pass or fail with details).

**Validation:** If any existing test fails, the change introduced a regression. Revert and investigate.

### Step 8: Update Evidence

**Goal:** Keep the evidence layer in sync with the code change.

**Action:**
1. If the change affects a documented route, update the route-map entry
2. If the change adds a new component, add it to the component-map
3. If the change modifies mock data, update the api-contract-map
4. If the change fixes a bug, create a failure-diagnosis record
5. If the change adds a new e2e test, update the e2e registry

**Output:** Updated knowledge maps and/or evidence records.

**Validation:** The "Last Updated" date in the affected maps should match the change date.

### Step 9: Record in Decision Ledger

**Goal:** Track the change for future reference.

**Action:**
1. If the change crosses an architecture boundary, add a decision entry to `docs/09-change-records/current/DECISIONS.md`
2. If the change is a bug fix, add an issue entry to `docs/09-change-records/issues/`
3. If the change is a new feature, it should be part of a major/minor version (use OpenSpec)

**Output:** Decision ledger entry (if applicable).

**Validation:** Every boundary-crossing change should have a decision entry.

## Outputs

| Output | Format | Destination |
| --- | --- | --- |
| Minimal change plan | structured text | inline (not persisted) |
| Modified files | source code | `src/` |
| Verification result | pass/fail | inline |
| Updated evidence | markdown | `docs/02-harness/knowledge/frontend/`, `docs/08-frontend-agent/evidence/` |
| Decision ledger entry | markdown | `docs/09-change-records/current/DECISIONS.md` |

## Validation Examples

### Example 1: V2.10 Sidebar Hotfix

**Input:** "Sidebar items don't work — they all point to the same URL"

**Expected Skill output:**
1. Parse: bug fix in task/skill/workflow/insight modules, affecting sidebar navigation
2. Boundary check: crosses router.tsx and moduleConfig.tsx (justified — bug fix)
3. Evidence: no existing evidence (this is the bug being fixed)
4. Change plan: update moduleConfig sidebar paths, add `:filter?` param to router, update 4 pages to read filter
5. Verification: 181/181 tests pass
6. Evidence update: create failure-diagnosis record, add rule RE-001
7. Decision: add D031 entry

**Actual V3 evidence:** The V2.10 hotfix is documented in `docs/09-change-records/issues/2026-06-07-V2-hotfix-ledger.md`. Running the Skill should reproduce the same fix.

### Example 2: Adding a New Sidebar Filter

**Input:** "Add a 'priority' filter to the task sidebar"

**Expected Skill output:**
1. Parse: new feature in task module, affecting sidebar + TaskListPage
2. Boundary check: crosses moduleConfig.tsx (needs justification)
3. Evidence: task list has evidence records (V3.3)
4. Change plan: add sidebar items in moduleConfig, update TaskListPage to read the new filter, add mock data with priority values
5. Verification: 181/181 + new tests
6. Evidence update: update route-map, component-map, api-contract-map
7. Decision: add entry to decision ledger

## Known Limitations

1. **No multi-module changes.** This Skill handles single-module changes only. Multi-module changes require human orchestration.

2. **No real-time verification.** This Skill runs `npm run test:e2e` at the end, not during each edit. For real-time feedback, use the dev server.

3. **No code generation.** This Skill produces a plan and executes it step-by-step. It does not generate large code blocks from a description.

4. **Mock data only.** This Skill assumes mock data (no real API). Changes that require backend integration are out of scope.

## Cross-References

- **Uses:** `docs/02-harness/knowledge/frontend/` (5 maps)
- **Uses:** `docs/08-frontend-agent/evidence/` (evidence records)
- **Uses:** `docs/01-architecture/module-boundary.md` (boundary rules)
- **Uses:** `docs/02-harness/rules/` (verification policy)
- **Produces:** modified files, updated evidence, decision ledger entries
- **Related Skill:** `frontend-project-reader` (for understanding the codebase before making changes)
- **Related Skill:** `frontend-e2e-explorer` (for verifying the change with runtime observation)
