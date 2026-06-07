# Tasks: Enhance Skill Library

Status: Ready for implementation

## Task List

### 1. Mock Data

- [x] 1.1 Create `src/domains/skill/data/skill-mock-data.ts` with `SkillItem` interface (id, name, description, category, version, status, icon, author, downloads, tags) and 20 mock skills across 4 categories (text, image, data, tool)
- [x] 1.2 Export `SkillVersion` interface and mock version history data
- [x] 1.3 Export `SkillConfig` interface and mock config data

### 2. Skill Components

- [x] 2.1 Create `src/domains/skill/components/SkillCard.tsx` with icon, name, description, category tag, version, status badge
- [x] 2.2 Create `src/domains/skill/components/SkillGrid.tsx` with Row+Col grid layout (span={6})
- [x] 2.3 Create `src/domains/skill/components/SkillList.tsx` with List view (avatar, title, description, actions)
- [x] 2.4 Create `src/domains/skill/components/SkillFilterBar.tsx` with Search + Category Select + view toggle (grid/list)
- [x] 2.5 Create `src/domains/skill/components/SkillDetailModal.tsx` with Modal showing skill details
- [x] 2.6 Add `data-testid` attributes: `skill-card-{id}`, `skill-grid`, `skill-list-view`, `skill-filter-bar`, `skill-search`, `skill-category-filter`, `skill-view-toggle`, `skill-detail-modal`

### 3. Skill List Page

- [x] 3.1 Create `src/domains/skill/pages/SkillListPage.tsx` composing SkillFilterBar + SkillGrid/SkillList + SkillDetailModal
- [x] 3.2 Implement search filter (case-insensitive name/description match)
- [x] 3.3 Implement category filter
- [x] 3.4 Implement view toggle (grid/list)
- [x] 3.5 Implement scenario selector (loaded/loading/empty/error)
- [x] 3.6 Implement loading state (Skeleton cards/list items)
- [x] 3.7 Implement error state (Alert with retry)
- [x] 3.8 Implement empty state (Empty component)

### 4. Skill Market Page

- [x] 4.1 Create `src/domains/skill/pages/SkillMarketPage.tsx` with featured section + recommended grid
- [x] 4.2 Implement featured skills row (3 cards, Col span={8})
- [x] 4.3 Implement recommended skills grid
- [x] 4.4 Implement install/uninstall toggle per card
- [x] 4.5 Implement scenario selector
- [x] 4.6 Implement loading/empty/error states

### 5. Skill Config Page

- [x] 5.1 Create `src/domains/skill/components/SkillConfigForm.tsx` with Form sections (Connection, Parameters, Permissions)
- [x] 5.2 Create `src/domains/skill/pages/SkillConfigPage.tsx` with skill selector + config form + JSON toggle
- [x] 5.3 Implement JSON editor (Input.TextArea with monospace)
- [x] 5.4 Implement save/reset buttons
- [x] 5.5 Implement scenario selector and states

### 6. Skill Versions Page

- [x] 6.1 Create `src/domains/skill/components/SkillVersionTable.tsx` with Table (version, date, changes, status, actions)
- [x] 6.2 Create `src/domains/skill/pages/SkillVersionsPage.tsx` with version info card + version table
- [x] 6.3 Implement rollback button per version row
- [x] 6.4 Implement current version highlight
- [x] 6.5 Implement scenario selector and states

### 7. Router Update

- [x] 7.1 Update `src/app/router.tsx`: replace `PlaceholderPage` for `/skill/list` with `SkillListPage`
- [x] 7.2 Update `src/app/router.tsx`: replace `PlaceholderPage` for `/skill/market` with `SkillMarketPage`
- [x] 7.3 Update `src/app/router.tsx`: replace `PlaceholderPage` for `/skill/config` with `SkillConfigPage`
- [x] 7.4 Update `src/app/router.tsx`: replace `PlaceholderPage` for `/skill/versions` with `SkillVersionsPage`

### 8. E2E Tests

- [x] 8.1 Create `tests/e2e/skill-list-runtime.spec.ts` with tests for: loaded grid, view toggle, category filter, search filter, modal, empty/loading/error states
- [x] 8.2 Create `tests/e2e/skill-market-runtime.spec.ts` with tests for: featured section, install toggle, empty/loading/error states
- [x] 8.3 Create `tests/e2e/skill-config-runtime.spec.ts` with tests for: form render, JSON toggle, save/reset, empty/loading/error states
- [x] 8.4 Create `tests/e2e/skill-versions-runtime.spec.ts` with tests for: version table, rollback, empty/loading/error states

### 9. Quality Gates

- [x] 9.1 Run `npm run lint`
- [x] 9.2 Run `npm run build`
- [x] 9.3 Run `npm run test:e2e`
