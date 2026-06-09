# Legacy Spec Example: SkillListPage (Zero data-testid)

This is what a generated `spec.md` looks like when the project has **no `data-testid` attributes**. All selectors are derived from Ant Design component declarations using `legacy-anchor-strategy.md`.

Assume the project structure is:
```
src/views/
  SkillManagement/
    index.tsx                       # SkillListPage → route /skill-management
    components/
      SkillFilterBar.tsx
      SkillGrid.tsx
      SkillList.tsx
      SkillCard.tsx
      SkillDetailModal.tsx
```

---

# Spec: E2E Verification for SkillListPage

Status: Draft

## Purpose

Auto-generated test specification for SkillListPage (`/skill-management`).
Entry point: `src/views/SkillManagement/index.tsx` (component path).
**Operation mode: LEGACY** (zero data-testid in 6 files scanned).

## Scope

- Capability: E2E verification of skill list page — rendering, filtering, view toggle, detail inspection
- Target routes: `/skill-management`, `/skill-management?category=text`, `/skill-management?category=image`
- Related components: SkillFilterBar (search/category/tags/sort/view-toggle), SkillGrid (grid cards), SkillList (list items), SkillCard (card with icon/tags), SkillDetailModal (detail modal)
- UI library: Ant Design 5.x (Table, Select, Input, Button, Modal, Card, Tag, Empty, Skeleton, Alert, Typography, Space.Compact)

## Functional Requirements

### Requirement: Page Initial Render

The system MUST render the SkillListPage with heading, filter bar, and skill grid on navigation.

#### Scenario: Default loaded state

- GIVEN the user navigates to `/skill-management`
- WHEN the page loads with data available
- THEN the heading "Skills" is visible (`getByRole('heading', { name: /skills/i, level: 2 })`) [stable: role+text]
- AND the search input is visible (`page.getByPlaceholder('Search skills...')`) [stable: placeholder]
- AND the category dropdown is visible (`page.locator('.ant-select').filter({ hasText: /all/i })`) [stable: AntD CSS+text]
- AND the grid container renders cards (`page.locator('.ant-card')`) [stable: AntD CSS]
- AND at least one card is visible

#### Scenario: Loading state

- GIVEN the user navigates to `/skill-management`
- WHEN the page enters loading state
- THEN the skeleton placeholder is visible (`.ant-skeleton`) [stable: AntD CSS]

#### Scenario: Empty state

- GIVEN the user navigates to `/skill-management`
- WHEN no skills match the current filter
- THEN an empty placeholder is visible (`.ant-empty`) [stable: AntD CSS]
- AND "No skills found" message is displayed (`page.getByText('No skills found')`) [fragile: text]

#### Scenario: Error state with retry

- GIVEN the user navigates to `/skill-management`
- WHEN the page enters error state
- THEN the error alert is visible (`getByRole('alert')`) [stable: role]
- AND alert contains "Skill library failed to load" (`page.getByText('Skill library failed to load')`) [fragile: text]
- AND retry link is visible (`page.getByText('Retry')`) [fragile: text]

#### Scenario: Error recovery via retry

- GIVEN the page is in error state
- WHEN the user clicks the retry link
- THEN the page returns to loaded state
- AND card grid is visible again (`.ant-card`) [stable: AntD CSS]

### Requirement: Search Filter

The system MUST filter displayed skills when the user types in the search input.

#### Scenario: Search narrows results

- GIVEN the user navigates to `/skill-management` with data loaded
- WHEN the user types "sentiment" into the search input (`page.getByPlaceholder('Search skills...').fill('sentiment')`) [stable: placeholder]
- THEN only skills matching "sentiment" are displayed
- AND card count is reduced

#### Scenario: Clear search restores all results

- GIVEN the user has typed a search term
- WHEN the user clears the search input (`page.getByPlaceholder('Search skills...').clear()`)
- THEN all skills are displayed again

### Requirement: Category Filter

The system MUST filter skills by category (text/image/data/tool) when the user selects a category.

#### Scenario: Category filter narrows results

- GIVEN the user navigates to `/skill-management` with data loaded
- WHEN the user clicks the category select (`page.locator('.ant-select').filter({ hasText: /all/i }).click()`) [stable: AntD CSS+text]
- AND selects "Text" (`page.getByText('Text').click()`) [fragile: text]
- THEN only text-category skills are displayed
- AND each card shows a "text" tag (`page.locator('.ant-tag').filter({ hasText: 'text' })`) [stable: AntD CSS+text]

#### Scenario: Reset to "All" restores all results

- GIVEN the user has selected a category filter
- WHEN the user selects "All" in the category dropdown
- THEN all skills are displayed regardless of category

### Requirement: View Mode Toggle

The system MUST switch between grid view (default) and list view.

#### Scenario: Switch from grid to list

- GIVEN the user is in grid view (default, cards visible: `.ant-card`) [stable: AntD CSS]
- WHEN the user clicks the list view button (`getByRole('button', { name: /unordered list/i })`) [stable: role]
- THEN items render as a flat list (no `.ant-card` grid)
- AND each item shows name, description, category tag, status tag

#### Scenario: Switch from list to grid

- GIVEN the user is in list view
- WHEN the user clicks the grid view button (`getByRole('button', { name: /appstore/i })`) [stable: role]
- THEN cards are visible (`.ant-card`) [stable: AntD CSS]

### Requirement: Skill Detail Modal

The system MUST show skill details in a modal when a skill card is clicked.

#### Scenario: Open detail modal from card click

- GIVEN the user navigates to `/skill-management` with data loaded
- WHEN the user clicks the first skill card (`page.locator('.ant-card').first().click()`) [stable: AntD CSS]
- THEN a detail dialog opens (`getByRole('dialog')`) [stable: role]
- AND the dialog title matches the clicked card's name

#### Scenario: Modal content

- GIVEN the detail modal is open
- WHEN the modal renders
- THEN it displays Description, Category, Version, Status, Author, Downloads, Tags fields
- AND field labels use Ant Design Descriptions component (`.ant-descriptions`) [stable: AntD CSS]

#### Scenario: Close detail modal

- GIVEN the detail modal is open
- WHEN the user clicks the close button (`.ant-modal-close`) [stable: AntD CSS]
- THEN the modal is no longer visible
- AND the user returns to the skill list

### Requirement: Tags Filter (Multi-Select)

The system MUST filter skills when the user selects tags in the multi-select dropdown.

#### Scenario: Tag filter narrows results

- GIVEN the user navigates to `/skill-management` with data loaded
- WHEN the user opens the tags multi-select (`page.getByPlaceholder('Filter by tags').click()`) [stable: placeholder]
- AND selects "nlp" (`page.locator('.ant-select-item-option').filter({ hasText: 'nlp' }).click()`) [stable: AntD CSS+text]
- THEN only skills tagged with "nlp" are displayed

### Requirement: Sort

The system MUST reorder displayed skills when the user changes the sort option.

#### Scenario: Sort by name

- GIVEN the user navigates to `/skill-management` with data loaded
- WHEN the user selects "Name" in the sort dropdown (`page.locator('.ant-select').filter({ hasText: /name/i }).click()`) [stable: AntD CSS+text]
- THEN skills are displayed in alphabetical order by name

## End-To-End Verification Requirements

- Every scenario maps to a Playwright E2E test in `tests/e2e/skill-management-verification.spec.ts`.
- All selectors are derived from Ant Design component structure and props — zero reliance on `data-testid`.
- Selector stability is annotated per scenario: `[stable: role]`, `[stable: role+text]`, `[stable: AntD CSS]`, `[fragile: text]`.
- Fragile selectors (`[fragile: text]`) should be monitored for breakage when UI text changes (i18n, copy updates).
- If this project later adds `data-testid` attributes, regenerate the spec in Ideal Mode for improved stability.

## Traceability

| Requirement | Planned E2E Spec | Primary Selector | Stability | Evidence |
|---|---|---|---|---|
| Page Initial Render (loaded) | `tests/e2e/skill-management-verification.spec.ts` | `getByRole('heading', { name: /skills/i })` | stable: role+text | screenshot |
| Loading State | (same spec) | `.ant-skeleton` | stable: AntD CSS | screenshot |
| Empty State | (same spec) | `.ant-empty` | stable: AntD CSS | screenshot |
| Error State + Retry | (same spec) | `getByRole('alert')` | stable: role | screenshot |
| Search Filter | (same spec) | `page.getByPlaceholder('Search skills...')` | stable: placeholder | screenshot |
| Category Filter | (same spec) | `page.locator('.ant-select').filter({ hasText: /all/i })` | stable: AntD CSS+text | screenshot |
| View Mode Toggle | (same spec) | `getByRole('button', { name: /unordered list/i })` | stable: role | screenshot |
| Detail Modal | (same spec) | `getByRole('dialog')` | stable: role | screenshot |
| Tags Filter | (same spec) | `page.getByPlaceholder('Filter by tags')` | stable: placeholder | screenshot |
| Sort | (same spec) | `page.locator('.ant-select').filter({ hasText: /name/i })` | stable: AntD CSS+text | screenshot |

## Mode Comparison

| Dimension | Ideal Mode (data-testid) | Legacy Mode (this spec) |
|---|---|---|
| Selector source | `data-testid` attribute in source | Ant Design component props + ARIA role |
| Stability | High (testid rarely changes) | Mixed (role=high, text=fragile, CSS=medium) |
| i18n safety | Yes (testid is locale-independent) | Partial (placeholder/text selectors break on locale switch) |
| Requires source change | Yes (must add data-testid) | No (works with existing code) |
| Coverage of this page | 18 elements, 13 in registry | 12 elements, all AntD-derived |
