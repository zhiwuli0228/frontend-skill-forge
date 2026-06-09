# Frontend Incremental Coder — References

Supplementary material for `frontend-incremental-coder`. Load only when needed.

## Minimum Context Path

For small bounded changes, start with the minimum set:
1. Change request
2. Target `route-map.md` entry
3. Target `component-map.md` entry
4. Affected source file(s)
5. One latest validation/evidence record

Only load the rest of the knowledge maps if the change crosses state, data, or architectural boundaries.

## Validation Examples

### Example 1: V2.10 Sidebar Hotfix

**Input:** "Sidebar items don't work — they all point to the same URL"

**Expected Skill output:**
1. Parse: bug fix in task/skill/workflow/insight modules, affecting sidebar navigation
2. Boundary check: crosses router.tsx and moduleConfig.tsx (justified — bug fix)
3. Evidence: no existing evidence (this is the bug being fixed)
4. Change plan: update moduleConfig sidebar paths, add `:filter?` param to router, update 4 pages to read filter
5. Verification: all tests pass
6. Evidence update: create failure-diagnosis record, add rule RE-001
7. Decision: add entry

### Example 2: Adding a New Sidebar Filter

**Input:** "Add a 'priority' filter to the task sidebar"

**Expected Skill output:**
1. Parse: new feature in task module, affecting sidebar + TaskListPage
2. Boundary check: crosses moduleConfig.tsx (needs justification)
3. Evidence: task list has evidence records
4. Change plan: add sidebar items in moduleConfig, update TaskListPage to read the new filter, add mock data with priority values
5. Verification: all tests pass + new tests
6. Evidence update: update route-map, component-map, api-contract-map
7. Decision: add entry to decision ledger

## Known Limitations

1. **No multi-module changes.** This Skill handles single-module changes only. Multi-module changes require human orchestration.
2. **No real-time verification.** Runs `npm run test:e2e` at the end, not during each edit. For real-time feedback, use the dev server.
3. **No code generation.** Produces a plan and executes it step-by-step. Does not generate large code blocks from a description.
4. **Mock data only.** Assumes mock data (no real API). Changes that require backend integration are out of scope.

## Cross-References

- **Uses:** `docs/02-harness/knowledge/frontend/` (5 maps)
- **Uses:** `docs/08-frontend-agent/evidence/` (evidence records)
- **Uses:** `docs/01-architecture/module-boundary.md` (boundary rules)
- **Uses:** `docs/02-harness/rules/` (verification policy)
- **Related Skill:** `frontend-project-reader` — for understanding the codebase before making changes
- **Related Skill:** `frontend-e2e-explorer` — for verifying the change with runtime observation
