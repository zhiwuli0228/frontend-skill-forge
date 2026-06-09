# Spec: E2E Verification for SkillListPage

Status: Draft

## Purpose

Auto-generated test specification for SkillListPage (`/skill/list/:filter?`).
Entry point: `/skill/list/all` (route path).

## Scope

- Capability: E2E verification of skill list page — rendering, filtering, view toggle, detail inspection, URL-driven state
- Target routes: `/skill/list/all`, `/skill/list/text`, `/skill/list/image`, `/skill/list/data`, `/skill/list/tool`
- Related components: SkillFilterBar (search/category/tags/sort/view-toggle), SkillGrid (grid cards), SkillList (list items), SkillCard (card with badge/icon/tags), SkillDetailModal (detail descriptions)

## Functional Requirements

### Requirement: Page Initial Render

The system MUST render the SkillListPage with heading, filter bar, scenario selector, and skill grid on navigation.

#### Scenario: Default loaded state

- GIVEN the user navigates to `/skill/list/all`
- WHEN the page loads with scenario="loaded"
- THEN the heading "Skills" is visible (`getByRole('heading', { name: /skills/i })`)
- AND the filter bar is visible (`getByTestId('skill-filter-bar')`)
- AND the scenario selector shows "Loaded" (`getByTestId('skill-scenario-select')`)
- AND the skill grid is visible (`getByTestId('skill-grid')`)
- AND at least one skill card is rendered (`[data-testid^="skill-card-"]`)
- AND the sidebar shows "All" as active filter

#### Scenario: Loading state

- GIVEN the user navigates to `/skill/list/all`
- WHEN the scenario is set to "loading" via `getByTestId('skill-scenario-select')`
- THEN the loading skeleton is visible (`getByTestId('skill-loading')`)
- AND 8 skeleton cards are rendered inside the skeleton
- AND the skill grid is NOT visible

#### Scenario: Empty state

- GIVEN the user navigates to `/skill/list/all`
- WHEN the scenario is set to "empty" via `getByTestId('skill-scenario-select')`
- THEN an Ant Design Empty component with "No skills found" is visible
- AND no skill cards are rendered

#### Scenario: Error state with retry

- GIVEN the user navigates to `/skill/list/all`
- WHEN the scenario is set to "error" via `getByTestId('skill-scenario-select')`
- THEN the error alert is visible (`getByTestId('skill-error')`)
- AND the alert title is "Skill library failed to load"
- AND the retry link is visible (`getByTestId('skill-error-retry-link')`)

#### Scenario: Error recovery via retry

- GIVEN the page is in error state
- WHEN the user clicks the retry link (`getByTestId('skill-error-retry-link')`)
- THEN the page transitions to loaded state
- AND the skill grid is visible again (`getByTestId('skill-grid')`)

### Requirement: Search Filter

The system MUST filter displayed skills when the user types in the search input, matching against skill name and description.

#### Scenario: Search narrows results

- GIVEN the user navigates to `/skill/list/all` with scenario="loaded"
- WHEN the user types "sentiment" into the search input (`getByTestId('skill-search')`)
- THEN only skills whose name or description contains "sentiment" are displayed
- AND at least 1 result is shown (Sentiment Analyzer)

#### Scenario: Clear search restores all results

- GIVEN the user has typed a search term that filtered results
- WHEN the user clears the search input
- THEN all skills are displayed again
- AND the grid shows the full skill count

### Requirement: Category Filter

The system MUST filter skills by category (text/image/data/tool) when the user selects a category from the dropdown.

#### Scenario: Category filter narrows results

- GIVEN the user navigates to `/skill/list/all` with scenario="loaded"
- WHEN the user selects "Text" in the category filter (`getByTestId('skill-category-filter')`)
- THEN only text-category skills are displayed
- AND each visible card has a "text" category tag

#### Scenario: Reset to "All" restores all results

- GIVEN the user has selected a specific category
- WHEN the user selects "All" in the category filter
- THEN all skills are displayed regardless of category

### Requirement: Tags Filter

The system MUST filter skills by tags (multi-select) when the user selects one or more tags.

#### Scenario: Tag filter narrows results

- GIVEN the user navigates to `/skill/list/all` with scenario="loaded"
- WHEN the user selects "nlp" in the tags filter (`getByTestId('skill-tags-filter')`)
- THEN only skills tagged with "nlp" are displayed
- AND at least 1 result is shown (Text Summarizer, Sentiment Analyzer, Keyword Extractor)

#### Scenario: Deselect tag restores results

- GIVEN the user has selected a tag filter
- WHEN the user deselects the tag
- THEN all skills are displayed again

### Requirement: Sort

The system MUST reorder displayed skills when the user changes the sort option.

#### Scenario: Sort by name (default)

- GIVEN the user navigates to `/skill/list/all` with scenario="loaded"
- WHEN sort is set to "Name" (`getByTestId('skill-sort-by')`)
- THEN skills are displayed in alphabetical order by name

#### Scenario: Sort by category

- GIVEN the user navigates to `/skill/list/all` with scenario="loaded"
- WHEN the user selects "Category" in the sort dropdown
- THEN skills are grouped by category

### Requirement: View Mode Toggle

The system MUST switch between grid view (default) and list view when the user clicks the toggle buttons.

#### Scenario: Switch from grid to list

- GIVEN the user is in grid view (default, `getByTestId('skill-grid')` visible)
- WHEN the user clicks the list view button (`getByTestId('skill-list-btn')`)
- THEN the list view container is visible (`getByTestId('skill-list-view')`)
- AND the grid container is NOT visible
- AND each item renders with avatar, name, description, category tag, status tag, version

#### Scenario: Switch from list to grid

- GIVEN the user is in list view
- WHEN the user clicks the grid view button (`getByTestId('skill-grid-btn')`)
- THEN the grid container is visible (`getByTestId('skill-grid')`)
- AND the list view container is NOT visible
- AND each card renders with icon, name, description, category tag, status badge, version ribbon

### Requirement: Skill Detail Modal

The system MUST show skill details in a modal when a skill card or list item is clicked.

#### Scenario: Open detail modal from grid card

- GIVEN the user navigates to `/skill/list/all` with scenario="loaded" in grid view
- WHEN the user clicks the first skill card (`[data-testid^="skill-card-"].first()`)
- THEN the detail modal opens (`getByTestId('skill-detail-modal')`)
- AND the modal title matches the clicked skill's name
- AND the modal displays Description, Category, Version, Status, Author, Downloads, and Tags fields

#### Scenario: Open detail modal from list item

- GIVEN the user is in list view
- WHEN the user clicks the first list item (`[data-testid^="skill-list-item-"].first()`)
- THEN the detail modal opens with the clicked skill's details

#### Scenario: Close detail modal

- GIVEN the detail modal is open
- WHEN the user closes the modal (click X or press Escape)
- THEN the modal is no longer visible
- AND the user returns to the skill list view

### Requirement: URL Filter Parameter

The system MUST reflect the URL `:filter` parameter in the sidebar indicator and displayed data. The sidebar filter overrides the user category filter only when no user category is manually selected.

#### Scenario: URL filter "text" drives sidebar indicator and filters data

- GIVEN the user navigates to `/skill/list/text`
- WHEN the page loads with scenario="loaded"
- THEN the sidebar filter indicator is visible (`getByTestId('sidebar-filter-indicator')`)
- AND the indicator shows "Sidebar filter: text" tag
- AND only text-category skills are displayed

#### Scenario: URL filter "all" shows no filter indicator

- GIVEN the user navigates to `/skill/list/all`
- WHEN the page loads with scenario="loaded"
- THEN the sidebar filter indicator is NOT visible
- AND all skills are displayed

#### Scenario: User category overrides sidebar filter

- GIVEN the user navigates to `/skill/list/text` (sidebar filter = text)
- WHEN the user manually selects "Image" in the category filter (`getByTestId('skill-category-filter')`)
- THEN the displayed skills are image-category only (user selection takes priority)
- AND the sidebar filter indicator still shows "text"

## End-To-End Verification Requirements

- Every scenario maps to a Playwright E2E test in `tests/e2e/skill-list-verification.spec.ts`.
- Verification is incomplete if only unit tests exist.
- All scenarios use stable selectors: `data-testid` (primary, 13 out of 18 elements have registry entries) or `getByRole` (fallback for heading).
- Existing E2E coverage from `skill-list-runtime.spec.ts` covers basic render and scenario states; this spec adds filter/sort/toggle/modal/URL-param verification.

## Traceability

| Requirement | Planned E2E Spec | Selector | Evidence |
|---|---|---|---|
| Page Initial Render (loaded) | `tests/e2e/skill-list-verification.spec.ts` | `getByTestId('skill-grid')` | screenshot |
| Loading State | (same spec) | `getByTestId('skill-loading')` | screenshot |
| Empty State | (same spec) | AntD Empty component | screenshot |
| Error State + Retry | (same spec) | `getByTestId('skill-error')`, `getByTestId('skill-error-retry-link')` | screenshot |
| Error Recovery | (same spec) | `getByTestId('skill-error-retry-link')` | screenshot |
| Search Filter | (same spec) | `getByTestId('skill-search')` | screenshot |
| Category Filter | (same spec) | `getByTestId('skill-category-filter')` | screenshot |
| Tags Filter | (same spec) | `getByTestId('skill-tags-filter')` | screenshot |
| Sort | (same spec) | `getByTestId('skill-sort-by')` | screenshot |
| View Mode Toggle | (same spec) | `getByTestId('skill-grid-btn')`, `getByTestId('skill-list-btn')` | screenshot |
| Detail Modal (grid) | (same spec) | `[data-testid^="skill-card-"]`, `getByTestId('skill-detail-modal')` | screenshot |
| Detail Modal (list) | (same spec) | `[data-testid^="skill-list-item-"]`, `getByTestId('skill-detail-modal')` | screenshot |
| URL Filter Parameter | (same spec) | `getByTestId('sidebar-filter-indicator')` | screenshot |
| User Category Override | (same spec) | `getByTestId('skill-category-filter')` | screenshot |
