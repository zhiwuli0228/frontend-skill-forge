# Frontend Test Spec Generator — References

## Index

| File | Purpose |
|---|---|
| `code-to-scenario-heuristics.md` | React code pattern → GIVEN/WHEN/THEN scenario mapping rules (Ideal + Legacy) |
| `legacy-anchor-strategy.md` | Zero data-testid legacy project: Ant Design component → selector, folder → route deduction |
| `output-examples/spec-example.md` | Annotated example of generated spec.md (Ideal Mode, data-testid) |
| `output-examples/plan-example.md` | Annotated example of generated plan.md |
| `output-examples/tasks-example.md` | Annotated example of generated tasks.md |
| `output-examples/legacy-spec-example.md` | Annotated example of generated spec.md (Legacy Mode, zero data-testid) |

## Usage Guide

### For Backend Developers

You only need to provide one piece of information:

```
# Any of these work:
/skill/list/all
src/domains/skill/pages/SkillListPage.tsx
skill list page
```

The agent will resolve it, analyze the code, and produce three documents under `openspec/changes/test-<slug>/`.

### For Agents Executing This Skill

1. Read the 7-step workflow in `SKILL.md`
2. Use `code-to-scenario-heuristics.md` as the look-up table during Step 4 (element→scenario grouping)
3. Reference `output-examples/` when generating spec/plan/tasks to ensure correct format
4. Always check route-map for existing E2E coverage before generating
5. Respect context budget: page + mock data + 5 sub-components max

### Input Resolution Priority

1. If input starts with `/` → treat as route path, look up in route-map
2. If input contains `src/` → treat as component path, look up in component-map
3. Otherwise → treat as module+page description, compose route

## Known Limitations

- **Dynamic testids** (e.g., `skill-card-{id}`): Generated scenarios use prefix selectors (`[data-testid^="skill-card-"]`) but cannot assert specific card content without runtime data.
- **Pages without scenario selectors**: Cannot generate loading/empty/error state tests. The skill detects absence and skips those scenarios.
- **Deeply nested sub-components**: Only one level of sub-components is read. If a sub-component renders another sub-component, its internals are not analyzed.
- **Ant Design internals**: Ant Design components (Table, Tree, Form) may render complex DOM. Scenarios reference the outermost `data-testid` container; assertions on internal Ant Design structure use ARIA roles (e.g., `getByRole('dialog')`).
- **Cross-module navigation**: If a page has buttons that navigate to other modules (e.g., "Open in Workflow Editor"), the skill notes them but does not generate scenarios for the target page.
- **Stale maps**: If route-map or component-map is outdated, generated selectors may be wrong. The skill checks "Last Updated" dates and warns.

## Extension Points

After the initial run, you can:

1. Run `frontend-e2e-explorer` to capture live browser evidence for the generated spec
2. Run `frontend-incremental-coder` to write the actual Playwright test file
3. Promote discovered selectors to `src/testability/selectors.ts` registry
4. Add fixture JSON files under `tests/fixtures/` for data-driven test execution
