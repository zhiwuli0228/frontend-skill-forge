# Design: Enhance Skill Library

Status: Complete

## Data Model

```typescript
interface SkillItem {
  id: string;
  name: string;
  description: string;
  category: 'text' | 'image' | 'data' | 'tool';
  version: string;
  status: 'active' | 'inactive' | 'draft';
  icon: string;
  author: string;
  downloads: number;
  tags: string[];
}

interface SkillVersion {
  version: string;
  date: string;
  changes: string;
  status: 'current' | 'previous' | 'deprecated';
}

interface SkillConfig {
  skillId: string;
  connection: { endpoint: string; apiKey: string; timeout: number };
  parameters: Record<string, unknown>;
  permissions: string[];
}
```

## Component Hierarchy

### SkillListPage
```
SkillListPage
├── SkillFilterBar (search + category + view toggle)
├── SkillGrid / SkillList (conditional on view mode)
│   └── SkillCard × N
└── SkillDetailModal
```

### SkillMarketPage
```
SkillMarketPage
├── Featured section (Row + Col)
├── SkillGrid
│   └── SkillCard × N (with Install button)
└── SkillDetailModal
```

### SkillConfigPage
```
SkillConfigPage
├── Skill selector (Select)
├── SkillConfigForm
│   ├── Connection section
│   ├── Parameters section
│   └── Permissions section
└── JSON editor toggle
```

### SkillVersionsPage
```
SkillVersionsPage
├── Version info card
└── SkillVersionTable (Table with rollback action)
```

## Routes

Already defined in router.tsx:
- `/skill/list` → SkillListPage
- `/skill/market` → SkillMarketPage
- `/skill/config` → SkillConfigPage
- `/skill/versions` → SkillVersionsPage

## Data-testid Attributes

- `skill-list-page`, `skill-market-page`, `skill-config-page`, `skill-versions-page`
- `skill-filter-bar`, `skill-search`, `skill-category-filter`, `skill-view-toggle`
- `skill-grid`, `skill-list-view`, `skill-card-{id}`
- `skill-detail-modal`
- `skill-config-form`, `skill-json-editor`
- `skill-version-table`, `skill-rollback-btn-{version}`
- `skill-scenario-select`, `skill-loading`, `skill-error`, `skill-error-retry-link`
