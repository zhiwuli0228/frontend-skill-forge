# Tasks: E2E Verification for SkillListPage

Status: Draft

## Purpose

Trackable checklist for executing E2E verification of SkillListPage at routes `/skill/list/all`, `/skill/list/text`, `/skill/list/image`, `/skill/list/data`, `/skill/list/tool`.

## Rules

- Every implementation task that affects user-visible behavior maps to at least one E2E verification task.
- Verification tasks reference the existing Playwright framework under `tests/e2e/`.
- A task is not complete without a recorded verification result.

## Task List

### 1. Discovery And Setup

- [ ] 1.1 Confirm target route: `/skill/list/:filter?` (variants: all, text, image, data, tool)
- [ ] 1.2 Confirm page component: `SkillListPage` at `src/domains/skill/pages/SkillListPage.tsx`
- [ ] 1.3 Confirm 5 sub-components: SkillFilterBar, SkillGrid, SkillList, SkillCard, SkillDetailModal
- [ ] 1.4 Verify route-map row #8 and component-map rows #7,#13–#17 are up-to-date (Last Updated: 2026-06-07)
- [ ] 1.5 Confirm 13 of 18 testids have selector registry entries (`skill-list.*`); 5 dynamic/unregistered (tags-filter, sort-by, view-mode, card-{id}, list-item-{id})
- [ ] 1.6 Confirm existing E2E coverage: `skill-list-runtime.spec.ts` (runtime baseline — 4 scenario states + basic interactions), `skill-list-fixture.spec.ts` (fixture-driven), `skill-list-ui-validation.spec.ts` (evidence-producing), `full-functional-verification.spec.ts` (cross-module), `sidebar-filter-navigation.spec.ts` (sidebar)

### 2. Test Implementation

- [ ] 2.1 Create E2E spec file: `tests/e2e/skill-list-verification.spec.ts`
- [ ] 2.2 Implement "Page Initial Render" tests:
  - [ ] 2.2.1 Loaded state: heading (`getByRole`), filter bar (`getByTestId('skill-filter-bar')`), grid (`getByTestId('skill-grid')`), scenario select shows "Loaded", at least 1 card (`[data-testid^="skill-card-"]`)
  - [ ] 2.2.2 Loading state: skeleton visible (`getByTestId('skill-loading')`), 8 skeleton cards, grid NOT visible
  - [ ] 2.2.3 Empty state: AntD Empty visible, no cards rendered
  - [ ] 2.2.4 Error state: alert visible (`getByTestId('skill-error')`), title "Skill library failed to load", retry link visible (`getByTestId('skill-error-retry-link')`)
  - [ ] 2.2.5 Error recovery: click retry → page returns to loaded, grid visible
- [ ] 2.3 Implement "Search Filter" tests:
  - [ ] 2.3.1 Type "sentiment" → only Sentiment Analyzer visible
  - [ ] 2.3.2 Clear search → all skills restored
- [ ] 2.4 Implement "Category Filter" tests:
  - [ ] 2.4.1 Select "Text" → only text-category cards visible, each has "text" tag
  - [ ] 2.4.2 Select "All" → all skills restored
- [ ] 2.5 Implement "Tags Filter" tests:
  - [ ] 2.5.1 Select "nlp" → only nlp-tagged skills visible
  - [ ] 2.5.2 Deselect "nlp" → all skills restored
- [ ] 2.6 Implement "Sort" tests:
  - [ ] 2.6.1 Sort by "Name" → alphabetical order
  - [ ] 2.6.2 Sort by "Category" → grouped by category
- [ ] 2.7 Implement "View Mode Toggle" tests:
  - [ ] 2.7.1 Grid (default) → click list btn → `getByTestId('skill-list-view')` visible, grid hidden
  - [ ] 2.7.2 List → click grid btn → `getByTestId('skill-grid')` visible, list hidden
  - [ ] 2.7.3 List items render: avatar, name, description, category tag, status tag, version
  - [ ] 2.7.4 Grid cards render: icon, name, description, category tag, status badge, version ribbon
- [ ] 2.8 Implement "Detail Modal" tests:
  - [ ] 2.8.1 Grid: click first card → modal opens (`getByTestId('skill-detail-modal')`), title matches skill name
  - [ ] 2.8.2 Modal shows 7 fields: Description, Category, Version, Status, Author, Downloads, Tags
  - [ ] 2.8.3 Close modal (X button) → modal not visible, return to list
  - [ ] 2.8.4 List: click first list item → modal opens with same behavior
- [ ] 2.9 Implement "URL Filter Parameter" tests:
  - [ ] 2.9.1 Navigate `/skill/list/text` → sidebar indicator visible (`getByTestId('sidebar-filter-indicator')`), shows "Sidebar filter: text" tag
  - [ ] 2.9.2 Only text-category skills displayed
  - [ ] 2.9.3 Navigate `/skill/list/all` → sidebar indicator NOT visible, all skills displayed
  - [ ] 2.9.4 User category override: nav `/skill/list/text` → manually select "Image" in category filter → image-category skills shown (user choice wins), sidebar indicator stays "text"

### 3. End-To-End Verification

- [ ] 3.1 Run `npm run test:e2e -- tests/e2e/skill-list-verification.spec.ts`
- [ ] 3.2 Verify all ~20 scenarios pass (0 failures)
- [ ] 3.3 Capture screenshot evidence for each distinct UI state:
  - [ ] 3.3.1 Loaded state — grid view (`skill-list-loaded-grid.png`)
  - [ ] 3.3.2 Loaded state — list view (`skill-list-loaded-list.png`)
  - [ ] 3.3.3 Loading state (`skill-list-loading.png`)
  - [ ] 3.3.4 Empty state (`skill-list-empty.png`)
  - [ ] 3.3.5 Error state (`skill-list-error.png`)
  - [ ] 3.3.6 Detail modal open (`skill-list-detail-modal.png`)
  - [ ] 3.3.7 URL filter indicator (`skill-list-sidebar-filter.png`)
- [ ] 3.4 Capture HTML report from `playwright-report/` → archive to `artifacts/validation/playwright-html/skill-list-verification/`

### 4. Quality Gates

- [ ] 4.1 Run `npm run lint` — confirm no new ESLint warnings introduced by test file
- [ ] 4.2 Run `npm run build` — confirm production build succeeds (test file excluded from build)
- [ ] 4.3 Run `npm run test:e2e` (full suite) — confirm no regressions in existing 35 specs / 181 tests
- [ ] 4.4 Update `verify.md` with actual command outputs per scenario, pass/fail conclusions, and evidence paths
