---
name: frontend-e2e-explorer
description: Explore UI and create evidence-backed E2E assets — route snapshots, component discoveries, interaction traces, and structured browser element data for the registry pipeline.
compatibility: opencode
metadata:
  project: frontend-skill-forge
  skill_type: exploration
  authority: project
---

# Frontend E2E Explorer

## Purpose

Given a route target, produce evidence records (route snapshots, component discoveries, interaction traces) that document page behavior — using MCP browser tools when available, or e2e test artifacts as fallback. Also produce structured `BrowserElement[]` snapshots for the registry stitching pipeline.

## Use When

Use this Skill when:

- Documenting a newly implemented page
- Capturing evidence for a route that has no evidence records yet
- Validating that a page's behavior matches its documentation
- Preparing for failure-diagnosis by capturing baseline snapshots
- Creating selector candidates for new e2e tests

Do not use this Skill when:

- The route already has complete evidence records (check the evidence index first)
- The page is being actively modified (finish the change first)
- MCP browser tools are unavailable AND no e2e tests exist for the route

## Required Inputs

- Route target (URL path, e.g. `/task/list/all`)
- Evidence templates from `docs/08-frontend-agent/evidence/`
- Selector stability guide from `docs/08-frontend-agent/mcp/selector-stability-guide.md`
- Knowledge maps from `docs/02-harness/knowledge/frontend/` (route-map, component-map)
- MCP / Playwright browser tools (optional but preferred)

## Workflow

### 1. Check Existing Evidence

Check the evidence index for this route. If an index exists and is up-to-date (newer than the route's last code change), skip exploration. If the route needs fresh evidence, proceed.

### 2. Navigate to the Route

Navigate to the target route using MCP browser tools. Capture page load time and console errors. If the page fails to load (404), abort.

### 3. Capture Route Snapshots (4 States)

Document the page in all 4 scenario states using the scenario selector:
1. **Loaded** — visible data, interactive elements
2. **Loading** — skeleton/spinner
3. **Empty** — empty placeholder
4. **Error** — error alert + retry link

Use the `ui-state-snapshot-template.md` format for each state.

### 3.5. Extract Structured Element Data

Run `browser_evaluate` on the loaded state to produce `BrowserElement[]` data. Save as `artifacts/browser-snapshots/<route-slug>.json` — this is a side effect consumed by `frontend-registry-stitch`. See `references/element-extraction-script.md` for the extraction script.

### 4. Discover Components

Identify 3–5 key sub-components on the page. For each: document props interface, HTML structure, behavior states, interactions, and selector candidates. Rate selector stability per the selector stability guide.

### 5. Capture Interaction Traces

Document 2–3 key user interactions. For each: step-by-step actions, state changes, network activity, console output. Verify the interaction completes successfully.

### 6. Evaluate Selector Stability

Rate each selector used in the evidence (High/Medium/Low). All primary selectors should be "High" stability (`data-testid` or ARIA-unique). Flag any "Medium" or "Low" selectors for improvement.

### 7. Cross-Reference with E2E Tests

Check the e2e registry for specs covering this route. Link evidence to test coverage. Note gaps where a spec exercises an interaction not in the evidence.

### 8. Produce Evidence Index

Compile all evidence records into a route-level index using the evidence index template. List all records by type and include cross-references to knowledge maps and e2e tests.

### 9. Update Knowledge Maps

If evidence discovered new information (new components, changed behavior), update the relevant maps. If evidence confirmed existing documentation, update "Last Updated" dates.

## Failure Handling

If blocked, use one of these failure codes:

- `BLOCKED_BY_NO_MCP` — MCP browser tools unavailable and no e2e test artifacts exist for the route
- `BLOCKED_BY_PAGE_FAILED_TO_LOAD` — 404 or error on navigation
- `BLOCKED_BY_NO_SCENARIO_SELECTOR` — page lacks the 4-state scenario selector
- `BLOCKED_BY_DYNAMIC_CONTENT` — selectors are all runtime-generated with no static anchors
- `BLOCKED_BY_STALE_KNOWLEDGE_MAP` — knowledge maps are outdated; run `frontend-project-reader` first
- `BLOCKED_BY_LOW_ELEMENT_COUNT` — <10 interactive elements extracted; page likely failed to render

For each blocker, include: what was attempted, what evidence exists, what is missing, and the next safe action.

## Context Budget Rules

- Do not load all 5 knowledge maps at once — start with route-map + component-map
- Do not capture screenshots unless explicitly requested
- Convert browser snapshots into page state summaries — do not paste raw DOM
- Keep the extraction script in `references/`; reference it, don't inline it
- One route per invocation; for multi-route exploration, run multiple times

## Output Format

```md
# E2E Exploration Report

## Route

## Existing Evidence Summary

## Route Snapshots (4 states)

## Component Discoveries (3–5)

## Interaction Traces (2–3)

## Selector Stability Assessment

## E2E Coverage Cross-Reference

## Knowledge Map Updates Needed

## Next Actions
```

## References

- `references/README.md` — templates, validation examples, known limitations
- `references/element-extraction-script.md` — browser_evaluate script for structured element capture
