# E2E Fixture Contract

Last Updated: 2026-06-08
Status: Active
Priority: High

## Purpose

Define the mandatory structure for all E2E test fixture files in `tests/fixtures/`. This contract exists so frontend agents, humans, and automation can consume fixture data without per-file inspection.

## Scope

All JSON fixtures under `tests/fixtures/**/*.json` MUST follow this contract unless explicitly marked experimental in a sibling doc.

## Required Top-Level Fields

Every fixture file MUST contain the following top-level fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `scenarioId` | `string` | yes | Unique identifier for the scenario (kebab-case, e.g. `skill-list-loaded`) |
| `page` | `string` | yes | Route path the scenario targets (e.g. `/skill/list/all`) |
| `purpose` | `string` | yes | One-sentence Chinese or English description of what this scenario validates |
| `data` | `object` | yes | Domain payload the scenario needs to be replayable |
| `expected` | `object` | yes | Assertions the page must satisfy under this scenario |

## `expected` Sub-Fields

`expected` MUST contain at least `visibleTexts`, `roles`, and `actions`. Empty arrays are allowed only when the scenario is an error or empty state.

| Field | Type | Description |
|-------|------|-------------|
| `expected.visibleTexts` | `string[]` | Texts that must be visible on the rendered page |
| `expected.roles` | `string[]` | ARIA roles that must be present in the rendered DOM |
| `expected.actions` | `string[]` | Interactions the page must support (e.g. `search`, `category-filter`, `retry`) |

## Naming Convention

- File names use kebab-case and end in `.json`
- One `scenarioId` per file; if you need multiple variants, split them across files (e.g. `skill-list-empty.json`, `skill-list-error.json`)
- `scenarioId` MUST be globally unique across `tests/fixtures/`

## Selector Requirements

Tests that consume fixtures MUST follow the selector priority:

1. **Role-based selectors first** (`getByRole`, `getByText`, `getByLabel`)
2. **`data-testid` second** (`getByTestId`, `[data-testid^="..."]`)
3. CSS class selectors are NOT recommended unless the Ant Design primitive has no testid

## Data Determinism

- All `id` fields MUST be stable strings
- All `timestamp` fields MUST be fixed ISO-8601 strings (no `Date.now()` calls)
- All counts (pagination size, item totals) MUST be derivable from the `data` payload
- Scenario data MUST NOT depend on network calls or random sources

## Minimal Example

```json
{
  "scenarioId": "skill-list-basic",
  "page": "/skill/list/all",
  "purpose": "验证 Skill 列表页面基础渲染与筛选能力",
  "data": {
    "skills": [],
    "categories": ["all", "text", "image", "data", "tool"]
  },
  "expected": {
    "visibleTexts": ["Skills", "Search skills..."],
    "roles": ["heading", "textbox"],
    "actions": ["search", "category-filter"]
  }
}
```

## Relationship to Other Docs

- Use with `e2e-evidence-contract.md` for output artifacts
- Use with `src/testability/` helpers for loading and assertion utilities
- See `docs/02-harness/knowledge/frontend/route-map.md` for `page` path conventions
