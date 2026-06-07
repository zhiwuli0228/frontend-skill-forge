# Frontend E2E Explorer

Status: v1 (V4)
Version: 1.0.0

## Purpose

Help agents explore UI and create evidence-backed E2E assets. Given a route target, produce evidence records (route snapshots, component discoveries, interaction traces) that document the page's behavior — using MCP browser tools when available, or e2e test artifacts as fallback.

## When to Use

Invoke this Skill when:

- Documenting a newly implemented page
- Capturing evidence for a route that has no evidence records yet
- Validating that a page's behavior matches its documentation
- Preparing for a failure-diagnosis by capturing baseline snapshots
- Creating selector candidates for new e2e tests

Do NOT use when:

- The route already has complete evidence records (check the evidence index first)
- The page is being actively modified (finish the change first)
- MCP browser tools are unavailable AND no e2e tests exist for the route (cannot derive evidence)

## Inputs

| Input | Source | Format | Required |
| --- | --- | --- | --- |
| Route target | user or agent | URL path (e.g., `/task/list/all`) | yes |
| MCP / Playwright tools | tooling | browser automation | optional |
| Evidence templates | `docs/08-frontend-agent/evidence/` | markdown templates | yes |
| Selector policy | `docs/08-frontend-agent/mcp/selector-stability-guide.md` | priority rules | yes |
| Knowledge maps | `docs/02-harness/knowledge/frontend/` | 5 maps | yes |
| E2E registry | `docs/08-frontend-agent/e2e-assets/registry.md` | table | optional |

## Procedure

### Step 1: Check Existing Evidence

**Goal:** Avoid duplicating work.

**Action:**
1. Check `docs/08-frontend-agent/evidence/evidence-index/` for an index file for this route
2. If an index exists and is up-to-date, skip to Step 8 (validation)
3. If no index exists, proceed to Step 2

**Output:** Decision (proceed or skip).

**Validation:** If the index exists but the "Last Updated" date is older than the route's last code change, re-run the exploration.

### Step 2: Navigate to the Route

**Goal:** Load the page in a browser.

**Action:**
1. If MCP browser tools are available: use `page.goto(route)` to navigate
2. If MCP is not available: rely on the e2e test artifacts (the test already navigated to the route)
3. Capture the page load time and any console errors

**Output:** Page loaded, load time recorded.

**Validation:** If the page fails to load (404, error), abort and report the failure.

### Step 3: Capture Route Snapshots (4 scenarios)

**Goal:** Document the page in all 4 scenario states.

**Action:**
1. Capture the **loaded** state: what's visible, what data is shown, what interactive elements exist
2. Capture the **loading** state: switch scenario selector to "Loading", capture skeleton
3. Capture the **empty** state: switch scenario selector to "Empty", capture empty placeholder
4. Capture the **error** state: switch scenario selector to "Error", capture error alert + retry link

For each state, use the `ui-state-snapshot-template.md` format.

**Output:** 4 route snapshot records.

**Validation:** Each snapshot should include: URL, title, load state, visible components, form state, modal/drawer state, console state.

### Step 4: Discover Components (3-5 per route)

**Goal:** Document the key sub-components on the page.

**Action:**
1. Identify the page's main components from `component-map.md`
2. For each component, use the `component-discovery-template.md` format
3. Document: props interface, HTML structure, behavior states, interactions, selector candidates
4. Rate selector stability per `selector-stability-guide.md`

**Output:** 3-5 component discovery records.

**Validation:** Each record should have a primary selector and at least one fallback.

### Step 5: Capture Interaction Traces (2-3 per route)

**Goal:** Document the key user interactions.

**Action:**
1. Identify the page's main interactions from `component-map.md` (Key Interactions column)
2. For each interaction, use the `interaction-trace-template.md` format
3. Document: step-by-step actions, state changes, network activity, console output, errors
4. Verify the interaction completes successfully

**Output:** 2-3 interaction trace records.

**Validation:** Each trace should have ≥3 steps and document the before/after state.

### Step 6: Evaluate Selector Stability

**Goal:** Assess the quality of the selectors used in the evidence.

**Action:**
1. For each selector used in the evidence, rate its stability:
   - High: `data-testid`, ARIA unique
   - Medium: text content, CSS classes
   - Low: generated classes, indices, XPath
2. If any selector is "Low" stability, document a candidate replacement
3. Cross-reference with existing e2e tests to see if the selector is already in use

**Output:** Selector stability table (per component).

**Validation:** All primary selectors should be "High" stability. If any are "Medium" or "Low", flag for improvement.

### Step 7: Cross-Reference with E2E Tests

**Goal:** Link evidence to existing test coverage.

**Action:**
1. Check the e2e registry for specs covering this route
2. For each spec, note which evidence records it validates
3. If a spec exercises an interaction that's NOT in the evidence, add it to the "Next Actions" list

**Output:** E2E-to-evidence mapping.

**Validation:** Every e2e test for this route should have at least one corresponding evidence record.

### Step 8: Produce Evidence Index

**Goal:** Compile all evidence records into a route-level index.

**Action:**
1. Use the `evidence-index-template.md` format
2. List all records by type (route snapshots, component discoveries, interaction traces)
3. Include cross-references to knowledge maps and e2e tests
4. Calculate average confidence score

**Output:** Evidence index for the route.

**Validation:** The index should match the actual records produced. Total count should be accurate.

### Step 9: Update Knowledge Maps

**Goal:** Keep maps in sync with evidence.

**Action:**
1. If the evidence discovered new information (e.g., a component not in component-map), update the map
2. If the evidence confirmed existing documentation, update the "Last Updated" date
3. If the evidence found a discrepancy, flag it as a "drift" issue

**Output:** Updated knowledge maps (if needed).

**Validation:** The "Last Updated" date should match the evidence capture date.

## Outputs

| Output | Format | Destination |
| --- | --- | --- |
| MCP session record | markdown | `docs/08-frontend-agent/mcp/sessions/` |
| Route snapshots (4) | markdown | `docs/08-frontend-agent/evidence/route-snapshots/` |
| Component discoveries (3-5) | markdown | `docs/08-frontend-agent/evidence/component-discoveries/` |
| Interaction traces (2-3) | markdown | `docs/08-frontend-agent/evidence/interaction-traces/` |
| Evidence index | markdown | `docs/08-frontend-agent/evidence/evidence-index/` |
| Selector stability table | markdown | inline in session record |
| Updated knowledge maps | markdown | `docs/02-harness/knowledge/frontend/` |

## Validation Examples

### Example 1: /task/list/all (V3.3)

**Input:** Route target `/task/list/all`, e2e artifacts as fallback

**Expected output:**
- 1 MCP session record
- 4 route snapshots (loaded/loading/empty/error)
- 4 component discoveries (TaskTable, TaskFilterBar, TaskDetailDrawer, scenario selector)
- 3 interaction traces (row click, scenario empty, error retry)
- 1 evidence index

**Actual V3 evidence:** `docs/08-frontend-agent/mcp/sessions/2026-06-07-V3-task-list-exploration.md` and 12 evidence records. Running the Skill should reproduce the same set.

### Example 2: /skill/list/text (new route)

**Input:** Route target `/skill/list/text`, no existing evidence

**Expected output:**
- 4 route snapshots (loaded/loading/empty/error for the "text" category filter)
- 3 component discoveries (SkillGrid, SkillCard, SkillFilterBar)
- 2 interaction traces (card click → modal, category filter change)
- 1 evidence index

## Known Limitations

1. **MCP fallback.** If MCP browser tools are not available, the Skill derives evidence from e2e test artifacts. This produces valid but less authoritative evidence. Always document the source.

2. **Scenario selector required.** This Skill assumes every page has the 4-state scenario selector. Pages without it (LoginPage, DashboardPage) require manual exploration.

3. **No screenshot capture.** The Skill documents DOM structure and behavior, not visual appearance. For visual evidence, use MCP screenshot tools.

4. **Single-route scope.** This Skill explores one route at a time. For multi-route exploration (e.g., cross-module navigation), run the Skill multiple times.

## Cross-References

- **Uses:** `docs/08-frontend-agent/evidence/` (templates)
- **Uses:** `docs/08-frontend-agent/mcp/selector-stability-guide.md`
- **Uses:** `docs/02-harness/knowledge/frontend/` (5 maps)
- **Uses:** `docs/08-frontend-agent/e2e-assets/registry.md`
- **Produces:** evidence records (route snapshots, component discoveries, interaction traces)
- **Related Skill:** `frontend-project-reader` (for understanding the codebase before exploring)
- **Related Skill:** `skill-evolution-maintainer` (for evolving skills from the evidence)
