# Retrospective: V2.6–V2.10 Multi-Module Implementation

Date: 2026-06-07
Scope: Implementation of 18 pages across 5 modules, plus the post-V2.10 sidebar hotfix

## What Went Well

### 1. Parallel subagent dispatch for page implementation

Once the patterns were established, each module's 4 pages could be implemented in parallel by background subagents. This compressed what would have been sequential days of work into single conversations. Total wall-clock for V2.6–V2.10: a few hours of mostly-waiting.

### 2. Superspec 19-artifact chain as a forcing function

Even when I knew the design, writing 19 artifacts per change (brainstorm → proposal → design → design-review → design-disposition → design-closure → plan → tasks → implementation → 5 review artifacts → verify → 3 review artifacts → acceptance-precheck → release) prevented corner-cutting. The "release.md" template in particular forced a clean exit summary each time, which made the aggregate summary trivial to write.

### 3. Standardizing on `data-testid` early paid off

By V2.7 we had a pattern: every interactive element gets a `data-testid`, the test file uses `getByTestId` exclusively. When bugs appeared (e.g., the insight-export form test matching 2 selects), the fix was a 1-line testid change, not a brittle CSS selector chase.

### 4. Scenario selector as a force multiplier

Every page supports 4 scenarios (loaded/loading/empty/error) via a top-of-page Select. This means each page can be tested in 4 states, doubling the test count for free. It also gave the user a "demo mode" — they could switch to "Loading" or "Error" to see what those states look like without breaking anything.

## What Didn't Go Well

### 1. The sidebar was wrong from V2.5 but only caught at V2.10

**Symptom**: User clicks sidebar item, nothing visible happens.
**Root cause**: All items pointed to the same URL (`/task/list` for every item in the task sidebar).
**Why it slipped through**: E2E tests verified that pages loaded, not that sidebar navigation worked. The 130 existing tests all passed despite the sidebar being a no-op.
**Cost**: 1 post-release hotfix round, 13 new tests, a non-trivial change to router + 4 pages.

**Lesson**: Test the *behavior the user is testing*. Page-load tests don't catch navigation bugs. We needed at least one test per sidebar module that "click item X → URL changes → page reflects filter".

### 2. Mock data wasn't aligned with sidebar item labels

The task sidebar had "Archived" but `TaskItem.status` didn't include 'archived'. Same for workflow sidebar (had `trigger/process/condition/output` but workflows don't have a `type` field, only `status`).
**Fix**: Added 'archived' to task data + 2 tasks; changed workflow sidebar from node types to status filters.

**Lesson**: The "configuration" layer (moduleConfig) and the "data" layer (mock data) need to be designed together. The sidebar items should be derived from the data, not the other way around — or at least validated against it.

### 3. `useEffect(() => setX(filter))` lint error caught a real anti-pattern

I initially wrote the skill page with a useEffect to sync the URL filter to internal state. The lint rule `react-hooks/set-state-in-effect` correctly flagged this. The fix was to derive `effectiveCategory` from both the URL and the user's manual filter rather than mirroring URL into state. This is the cleaner pattern.

**Lesson**: When the URL is the source of truth, treat internal state as a *supplement* to the URL, not a *mirror* of it. Reading `useParams` and combining with local state is simpler than syncing them.

### 4. Test selectors were too generic

`page.getByText('Empty', { exact: true })` was needed because Ant Design Select options are rendered in a portal; `page.getByTitle('Error', { exact: true })` was needed because table cells with `title="Error Alert Escalation"` matched the bare 'Error'. These bugs only surface at runtime, not at compile time.

**Lesson**: When in doubt, add `data-testid` to the specific element you want to test, rather than reaching for `getByText` / `getByTitle`. The new sidebar tests use `getByRole('menuitem', { name: 'X', exact: true })` which is robust but verbose — a custom testid like `data-testid="sidebar-item-in-progress"` would be more readable.

## Specific Bugs Worth Remembering

| Bug | Fix | Pattern |
| --- | --- | --- |
| `Drawer width` deprecation warning | Replace with `size` | Ant Design 6 → 7 prep |
| `Alert message` deprecation warning | Replace with `title` | Ant Design 6 → 7 prep |
| `Space direction` deprecation warning | Replace with `orientation` | Ant Design 6 → 7 prep |
| `getByTestId` doesn't support regex | Use `page.locator('[data-testid^="..."]')` | Playwright API |
| Strict mode violation on `.ant-select` | Use specific testid instead of class | Playwright API |
| Workflow `baseSchedules` unused variable | Remove (linter caught) | Strict TS config |
| Empty state mismatch (e.g., "no tasks" vs "no skills found") | Read the actual page text | Always check what's rendered |

## Process Improvements to Try Next Time

1. **Test navigation, not just loading.** For any menu/sidebar, write at least one test that asserts "clicking item X changes the URL AND the page content reflects it". The current 13 sidebar tests are exactly this — and they should have been written at V2.5, not V2.10.

2. **Design mock data first.** When defining a sidebar with filter items, the first step should be to ensure the data has the corresponding fields. The task "archived" status and workflow "trigger/process/condition/output" should have been caught at the design stage.

3. **Smaller commits per module.** Each module change was ~30-50 files. A long-lived branch with 5 modules in it is risky. Better: one PR per module, merged individually. (This is partly blocked by the fact that we're not using PRs in this exploration project, but the principle stands.)

4. **Don't add `useEffect` to sync URL into state.** Use derived values. This is enforced by the lint rule but I tripped on it once.

5. **The "scenario selector" pattern is worth exporting as a hook.** Currently every page reimplements `useState<Scenario>` + the same `<Space><Text>Scenario:</Text><Select>...` block. A `useScenarioState()` hook + `<ScenarioSelector scenario={scenario} onChange={setScenario} />` component would have saved ~100 lines and made the pattern more discoverable.

## Tooling Observations

- **Playwright with `auto-starting dev server`** (via `webServer` in config) is excellent — no manual `npm run dev` needed.
- **Ant Design 6** works well with React 19, but is in the middle of a deprecation cycle (width→size, message→title, direction→orientation). Pin the version for now.
- **React Router 7's `useParams`** is reactive — when the URL changes, the component re-renders. No need for `withRouter` HOC or `useLocation` + manual parsing.
- **Superspec artifact chain** adds ~30 minutes per change of overhead. Worth it for auditability, but it's the difference between 1-day and 2-day delivery on small changes.

## Final Stats

- **Time on V2.6–V2.10**: ~3 sessions of work (including 1 hotfix round)
- **Files created**: ~70 (pages, components, mock data, tests, docs)
- **Tests**: 0 → 181 (with 51 distinct top-level tests)
- **OpenSpec archived changes**: 9
- **Bug fixes post-implementation**: 1 (sidebar navigation)

The project is in a good state for a demo. Next logical step: code-splitting to bring bundle size down, then either a real backend integration or a second product vertical to validate the patterns transfer.
