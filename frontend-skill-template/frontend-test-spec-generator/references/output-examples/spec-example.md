# Spec Example: SkillListPage

This is an annotated example of a generated `spec.md` for `SkillListPage` at route `/skill/list/:filter?`.

Source entry point: `/skill/list/all`

---

# Spec: E2E Verification for SkillListPage

Status: Draft

## Purpose

Auto-generated test specification for SkillListPage (`/skill/list/:filter?`).
Entry point: `/skill/list/all`.

## Scope

- Capability: E2E verification of skill list page behavior
- Target routes: `/skill/list/all`, `/skill/list/text`, `/skill/list/image`, `/skill/list/data`, `/skill/list/tool`
- Related components: SkillFilterBar, SkillGrid, SkillList, SkillCard, SkillDetailModal

## Functional Requirements

### Requirement: Page Initial Render

The system MUST render the SkillListPage with heading, filter bar, and skill grid on navigation.

#### Scenario: Default loaded state

- GIVEN the user navigates to `/skill/list/all`
- WHEN the page loads with scenario="loaded"
- THEN the heading "Skills" is visible (`getByRole('heading', { name: /skills/i })`)
- AND the filter bar is visible (`getByTestId('skill-filter-bar')`)
- AND the skill grid is visible (`getByTestId('skill-grid')`)
- AND at least one skill card is rendered (`[data-testid^="skill-card-"]`)

#### Scenario: Loading state

- GIVEN the user navigates to `/skill/list/all`
- WHEN the scenario is set to "loading"
- THEN the loading skeleton is visible (`getByTestId('skill-loading')`)
- AND the skill grid is NOT visible

#### Scenario: Empty state

- GIVEN the user navigates to `/skill/list/all`
- WHEN the scenario is set to "empty"
- THEN an empty placeholder is visible
- AND no skill cards are rendered

#### Scenario: Error state with retry

- GIVEN the user navigates to `/skill/list/all`
- WHEN the scenario is set to "error"
- THEN the error alert is visible (`getByTestId('skill-error')`)
- AND the retry link is visible (`getByTestId('skill-error-retry-link')`)
- WHEN the user clicks the retry link
- THEN the page returns to loaded state
- AND the skill grid is visible again

### Requirement: Search Filter

The system MUST filter displayed skills when the user types in the search input.

#### Scenario: Search narrows results

- GIVEN the user navigates to `/skill/list/all` with scenario="loaded"
- WHEN the user types "text" into the search input (`getByTestId('skill-search')`)
- THEN only skills whose name or description contains "text" are displayed

#### Scenario: Clear search restores all results

- GIVEN the user has typed a search term
- WHEN the user clears the search input
- THEN all skills are displayed

### Requirement: Category Filter

The system MUST filter skills by category when the user selects a category.

#### Scenario: Category filter narrows results

- GIVEN the user navigates to `/skill/list/all` with scenario="loaded"
- WHEN the user selects "Text" in the category filter (`getByTestId('skill-category-filter')`)
- THEN only text-category skills are displayed

#### Scenario: Reset to "All" restores all results

- GIVEN the user has selected a category filter
- WHEN the user selects "All" in the category filter
- THEN all skills are displayed regardless of category

### Requirement: View Mode Toggle

The system MUST switch between grid and list views.

#### Scenario: Switch from grid to list

- GIVEN the user is in grid view (default)
- WHEN the user clicks the list view button (`getByTestId('skill-list-btn')`)
- THEN the list view container is visible (`getByTestId('skill-list-view')`)
- AND the grid container is NOT visible

#### Scenario: Switch from list to grid

- GIVEN the user is in list view
- WHEN the user clicks the grid view button (`getByTestId('skill-grid-btn')`)
- THEN the grid container is visible (`getByTestId('skill-grid')`)
- AND the list view container is NOT visible

### Requirement: Skill Detail Modal

The system MUST show skill details in a modal when a skill card is clicked.

#### Scenario: Open detail modal

- GIVEN the user navigates to `/skill/list/all` with scenario="loaded"
- WHEN the user clicks the first skill card (`[data-testid^="skill-card-"].first()`)
- THEN the detail modal opens (`getByTestId('skill-detail-modal')`)
- AND the modal displays the skill name, description, and category

#### Scenario: Close detail modal

- GIVEN the detail modal is open
- WHEN the user closes the modal
- THEN the modal is no longer visible
- AND the user returns to the skill list

### Requirement: URL Filter Parameter

The system MUST reflect the URL `:filter` parameter in the sidebar and displayed data.

#### Scenario: URL filter drives sidebar indicator

- GIVEN the user navigates to `/skill/list/text`
- WHEN the page loads
- THEN the sidebar shows "Text" as the active filter
- AND displayed skills are text-category only

#### Scenario: "All" filter shows no indicator

- GIVEN the user navigates to `/skill/list/all`
- WHEN the page loads
- THEN the sidebar shows "All" as active
- AND all skills are displayed

## End-To-End Verification Requirements

- Every scenario maps to a Playwright E2E test in `tests/e2e/skill-list-verification.spec.ts`.
- Verification is incomplete if only unit tests exist.
- All scenarios use stable selectors: `data-testid` (primary) or `getByRole` (fallback).

## Traceability

| Requirement | Planned E2E Spec | Selector | Evidence |
|---|---|---|---|
| Page Initial Render | `tests/e2e/skill-list-verification.spec.ts` | `getByTestId('skill-grid')` | screenshot |
| Loading State | (same spec) | `getByTestId('skill-loading')` | screenshot |
| Empty State | (same spec) | AntD Empty component | screenshot |
| Error State + Retry | (same spec) | `getByTestId('skill-error')`, `getByTestId('skill-error-retry-link')` | screenshot |
| Search Filter | (same spec) | `getByTestId('skill-search')` | screenshot |
| Category Filter | (same spec) | `getByTestId('skill-category-filter')` | screenshot |
| View Mode Toggle | (same spec) | `getByTestId('skill-grid-btn')`, `getByTestId('skill-list-btn')` | screenshot |
| Skill Detail Modal | (same spec) | `[data-testid^="skill-card-"]`, `getByTestId('skill-detail-modal')` | screenshot |
| URL Filter Parameter | (same spec) | `getByTestId('sidebar-filter-indicator')` | screenshot |
