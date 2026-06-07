# Brainstorm: Enhance Skill Library

Status: Complete

## Context

The Skill Library module (`/skill/*`) currently has only PlaceholderPage for all routes. Need to build out the skill list, market, config, and versions pages with complex UI patterns matching the task center quality.

## Target Routes

- `/skill/list` — Main skill list with card grid + list view toggle
- `/skill/market` — Skill marketplace with featured/recommended skills
- `/skill/config` — Skill configuration editor
- `/skill/versions` — Version management table

## UI Patterns

### Skill List Page
- Card grid view (default) + list view toggle
- Skill cards: icon, name, description, category tag, version, status badge
- Category filter sidebar (All/Text Processing/Image Generation/Data Analysis/Tool Invocation)
- Search input
- Scenario selector (loaded/loading/empty/error)

### Skill Market Page
- Featured skills carousel section
- Recommended skills grid
- Category tabs
- Install/uninstall buttons
- Scenario selector

### Skill Config Page
- Skill selector dropdown
- Config form with sections (Connection, Parameters, Permissions)
- JSON editor toggle
- Save/reset buttons
- Scenario selector

### Skill Versions Page
- Version history table (version, date, changes, status)
- Current version highlight
- Rollback button
- Scenario selector

## Component Architecture

```
src/domains/skill/
  data/
    skill-mock-data.ts
  components/
    SkillCard.tsx
    SkillGrid.tsx
    SkillList.tsx
    SkillFilterBar.tsx
    SkillDetailModal.tsx
    SkillConfigForm.tsx
    SkillVersionTable.tsx
  pages/
    SkillListPage.tsx
    SkillMarketPage.tsx
    SkillConfigPage.tsx
    SkillVersionsPage.tsx
```

## Design Decisions

1. Card grid as default view for skill list (visual appeal)
2. List view as alternative for dense information
3. Modal for skill details (consistent with template preview pattern)
4. Config editor with form + JSON toggle
5. Version table with rollback action
6. All pages follow scenario-driven pattern (loaded/loading/empty/error)
