# Rule Evolution Queue

Status: Active (V3.4)
Last Updated: 2026-06-07

## Purpose

Track pending Rule evolution candidates. A rule is a hard constraint that future agents (and humans) must follow. Rules live in `docs/02-harness/rules/`.

## Queue

| ID | Candidate | Evidence | Priority | Status | Date |
| --- | --- | --- | --- | --- | --- |
| RE-001 | Sidebar items must have unique `path` properties; merging them to the same URL is forbidden | FD-2026-06-07-001, V2.10 hotfix | high | accepted (V3.4) | 2026-06-07 |
| RE-002 | Every page must render the scenario selector (loaded/loading/empty/error) | CD-TL-004, 22/23 pages already comply | medium | pending | 2026-06-07 |
| RE-003 | Every testable element must have a `data-testid` attribute | All 23 spec files, 181 tests, 216 unique testids | high | accepted (de facto) | 2026-06-07 |
| RE-004 | E2E tests must assert on URL change when navigation is the goal | FD-2026-06-07-001 | high | pending | 2026-06-07 |
| RE-005 | Mock data interfaces must include all filter values referenced by sidebar items | V2.10 hotfix (task "archived" not in `TaskItem.status` originally) | high | pending | 2026-06-07 |

## Decision Records

### RE-001 (accepted 2026-06-07)

- **Candidate:** Sidebar items must have unique `path` properties.
- **Evidence:** FD-2026-06-07-001 — V2.10 sidebar hotfix root cause.
- **Decision:** Accept as a hard rule.
- **Rule text:**
  > Every `SidebarMenuItem` in `moduleConfig.tsx` must have a unique `path` property. Two sidebar items in the same module may not share the same `path`. The `key` field is a UI identifier; the `path` field is the URL. They are not interchangeable.
- **Action taken:** Documented in this queue. Future PRs that introduce duplicate `path` values must be rejected.
- **Enforcement:** Manual review at code review time. A future V4+ linter could check for this.
- **Outcome:** Rule accepted.

### RE-002 (pending)

- **Candidate:** Every page must render the scenario selector.
- **Evidence:** CD-TL-004 documents the 22/23 adoption; 1 page (LoginPage) legitimately doesn't because it's outside the GlobalShell. DashboardPage is the only inconsistency.
- **Decision:** Defer to V4. The pattern is established but not enforced; making it a rule requires promoting it from "common pattern" to "mandatory." V4 should re-evaluate.
- **Outcome:** TBD in V4.

### RE-003 (accepted de facto 2026-06-07)

- **Candidate:** Every testable element must have a `data-testid`.
- **Evidence:** All 23 e2e specs use `getByTestId` exclusively. 216 unique testids in the codebase.
- **Decision:** Already accepted in practice; this rule formalizes it.
- **Rule text:**
  > Every interactive element (button, input, select, link, clickable row) and every page-level container must have a `data-testid` attribute. Test specs must use `getByTestId` as the primary selector. `getByText` and `getByRole` are allowed as fallback when `data-testid` is unavailable or unstable.
- **Outcome:** Rule accepted.

### RE-004 (pending)

- **Candidate:** E2E tests must assert on URL change when navigation is the goal.
- **Evidence:** FD-2026-06-07-001 — 130+ e2e tests passed but the sidebar navigation was broken. The lesson is that "page loads" assertions don't catch navigation bugs.
- **Decision:** Accept.
- **Rule text:**
  > When an e2e test exercises a navigation (clicking a link, sidebar item, or tab), it must include an assertion that the URL changed. Pattern: `await page.waitForURL('**/expected-route');` or `expect(page).toHaveURL(/expected-route/);`.
- **Action taken:** The 13 new sidebar tests in `sidebar-filter-navigation.spec.ts` all use this pattern. Existing tests should be retrofitted in V4.
- **Outcome:** Accepted.

### RE-005 (pending)

- **Candidate:** Mock data interfaces must include all filter values referenced by sidebar items.
- **Evidence:** V2.10 hotfix — task sidebar had "Archived" but `TaskItem.status` didn't include 'archived'. Workflow sidebar had trigger/process/condition/output but workflows only have `status` (not `type`).
- **Decision:** Accept.
- **Rule text:**
  > When adding a new sidebar item, the corresponding data interface must include the field that the item filters on. If the field doesn't exist yet, add it before adding the sidebar item. If the field is added, populate at least 2-3 mock items with the new value to surface the change in tests.
- **Outcome:** Accepted.

## Process

1. Evidence triggers candidate
2. Candidate added to queue with `pending` status
3. Review for conflicts (does this rule conflict with an existing rule?)
4. Verification before acceptance (does the rule work in practice?)
5. Rule updated or rejected

## Rules

- Check for rule conflicts before acceptance
- Document rule scope changes
- Archive superseded rules
- Track all decisions in this file
- One decision record per candidate, kept inline

## Cross-References

- `docs/02-harness/rules/` — where the active rules live
- `docs/08-frontend-agent/evidence/failure-diagnoses/` — failure records that often trigger rule candidates
- `docs/08-frontend-agent/evolution/knowledge-evolution-queue.md` — sibling queue
- `docs/08-frontend-agent/evolution/skill-evolution-queue.md` — sibling queue (V4 territory)
