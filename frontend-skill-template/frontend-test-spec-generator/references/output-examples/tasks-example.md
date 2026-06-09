# Tasks Example: SkillListPage

This is an annotated example of a generated `tasks.md` for SkillListPage E2E verification.

---

# Tasks: E2E Verification for SkillListPage

Status: Draft

## Purpose

Trackable checklist for executing E2E verification of SkillListPage.

## Rules

- Every task that affects user-visible behavior maps to at least one E2E verification task.
- Verification tasks reference the existing Playwright framework under `tests/e2e/`.
- A task is not complete without a recorded verification result.

## Task List

### 1. Discovery And Setup

- [ ] 1.1 Confirm target route: `/skill/list/:filter?` (variants: all, text, image, data, tool)
- [ ] 1.2 Confirm page component: `SkillListPage` at `src/domains/skill/pages/SkillListPage.tsx`
- [ ] 1.3 Confirm sub-components: SkillFilterBar, SkillGrid, SkillList, SkillCard, SkillDetailModal
- [ ] 1.4 Verify route-map and component-map entries are up-to-date (Last Updated: 2026-06-07)
- [ ] 1.5 Confirm existing E2E coverage: `skill-list-runtime.spec.ts` (runtime baseline), `skill-list-fixture.spec.ts` (fixture-driven), `full-functional-verification.spec.ts` (cross-module)

### 2. Test Implementation

- [ ] 2.1 Create E2E spec file: `tests/e2e/skill-list-verification.spec.ts`
- [ ] 2.2 Implement "Page Initial Render" test:
  - [ ] Loaded state: heading + filter bar + grid visible
  - [ ] Loading state: skeleton visible, grid hidden
  - [ ] Empty state: empty placeholder visible
  - [ ] Error state: alert visible, retry link clickable, retry recovers to loaded
- [ ] 2.3 Implement "Search Filter" test: type keyword → results narrow → clear → results restore
- [ ] 2.4 Implement "Category Filter" test: select category → results narrow → select "All" → results restore
- [ ] 2.5 Implement "View Mode Toggle" test: grid→list switch + list→grid switch
- [ ] 2.6 Implement "Skill Detail Modal" test: card click opens modal → modal shows details → close returns to list
- [ ] 2.7 Implement "URL Filter Parameter" test: navigate `/skill/list/text` → sidebar shows "Text" → data is text-category

### 3. End-To-End Verification

- [ ] 3.1 Run `npm run test:e2e -- tests/e2e/skill-list-verification.spec.ts`
- [ ] 3.2 Verify all tests pass (0 failures across ~13 scenarios)
- [ ] 3.3 Capture screenshot evidence for each scenario state:
  - [ ] Loaded state (`skill-list-loaded.png`)
  - [ ] Loading state (`skill-list-loading.png`)
  - [ ] Empty state (`skill-list-empty.png`)
  - [ ] Error state (`skill-list-error.png`)
  - [ ] Detail modal open (`skill-list-detail-modal.png`)
  - [ ] List view mode (`skill-list-list-view.png`)
- [ ] 3.4 Capture HTML report from `playwright-report/`

### 4. Quality Gates

- [ ] 4.1 Run `npm run lint` — confirm no new warnings
- [ ] 4.2 Run `npm run build` — confirm production build succeeds
- [ ] 4.3 Run `npm run test:e2e` (full suite) — confirm no regressions in existing 35 specs
- [ ] 4.4 Update `verify.md` with actual command outputs and pass/fail conclusions
