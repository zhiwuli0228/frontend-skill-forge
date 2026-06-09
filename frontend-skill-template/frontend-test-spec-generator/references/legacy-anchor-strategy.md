# Legacy Project Anchor Strategy

For projects with **zero `data-testid`** attributes — common in legacy React + Ant Design codebases where the only reliable entry points are folder names and component names.

## Core Principle

When `data-testid` is absent, selectors are **derived** from Ant Design component declarations rather than extracted from existing markup. The folder structure itself IS the frontend map.

## Anchor Priority (No data-testid)

Inherits from MCP Context Guard semantic anchor priority, with `data-testid` removed:

| Priority | Anchor | Source | Playwright Selector |
|---|---|---|---|
| 1 | route | folder name → URL | `page.goto('/user/list')` |
| 2 | page name | component file name | scenario title only (not a selector) |
| 3 | region | AntD Layout / Sider / Content | `page.locator('.ant-layout-content')` |
| 4 | role | AntD component ARIA role | `getByRole('table')`, `getByRole('dialog')` |
| 5 | accessible name | placeholder, title, label props | `getByRole('textbox', { name: /search/i })` |
| 6 | label text | Form.Item `label` prop | `page.getByLabel('Username')` |
| 7 | visible text | Button children, Typography text | `page.getByText('Create User')` |
| 8 | stable CSS | `.ant-*` class names | `page.locator('.ant-table-row')` |
| 9 | XPath | absolute last resort | `page.locator('//div[@class="..."]')` |

**Rule**: Always try priority 4 (role) before 7 (text) before 8 (CSS). Never jump to XPath unless all 8 priorities above have been exhausted.

## Ant Design Component → Selector Mapping

### Table

```tsx
<Table columns={columns} dataSource={data} />
```

| What to select | Selector |
|---|---|
| Table container | `getByRole('table')` |
| Table rows | `page.locator('.ant-table-row')` or `page.locator('.ant-table-tbody tr')` |
| Column headers | Extract from `columns[].title` → `getByRole('columnheader', { name: /title/i })` |
| Sort indicator | Click column header → check `.ant-table-column-sort` |
| Pagination | `page.locator('.ant-pagination')` — next btn: `getByRole('button', { name: /right/i })` |

### Form

```tsx
<Form onFinish={handleSubmit}>
  <Form.Item label="Username" name="username" rules={[{ required: true }]}>
    <Input placeholder="Enter username" />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">Create</Button>
  </Form.Item>
</Form>
```

| What to select | Selector |
|---|---|
| Form container | `getByRole('form')` |
| Labeled field | `page.getByLabel('Username')` — from `label` prop |
| Placeholder field | `page.getByPlaceholder('Enter username')` |
| Required indicator | `.ant-form-item-required` |
| Submit button | `getByRole('button', { name: /create/i })` |
| Validation error | `page.getByText('Please input')` or `.ant-form-item-explain-error` |

### Modal / Drawer

```tsx
<Modal title="User Detail" open={open} onCancel={onClose}>
  <Descriptions>...</Descriptions>
</Modal>
```

| What to select | Selector |
|---|---|
| Modal container | `getByRole('dialog')` |
| Modal by title | `getByRole('dialog', { name: /user detail/i })` |
| Close button | `getByRole('button', { name: /close/i })` or `.ant-modal-close` |
| Drawer | `getByRole('dialog')` or `.ant-drawer-body` |

### Button

```tsx
<Button type="primary" onClick={handleCreate}>Create User</Button>
<Button danger>Delete</Button>
```

| What to select | Selector |
|---|---|
| Primary action button | `getByRole('button', { name: /create user/i })` |
| Danger button | `getByRole('button', { name: /delete/i })` — assert `.ant-btn-danger` class |
| Icon-only button | `getByRole('button')` with icon — use sibling text or tooltip for disambiguation |
| Disabled button | `getByRole('button', { name: /.../ })` → assert `disabled` attribute |

### Input / Search

```tsx
<Input placeholder="Search users..." />
<Input.Search onSearch={handleSearch} placeholder="Keyword" />
<Input.TextArea rows={4} placeholder="Description" />
```

| What to select | Selector |
|---|---|
| Text input by placeholder | `page.getByPlaceholder('Search users...')` |
| Text input by role + name | `getByRole('textbox', { name: /search/i })` |
| Search input | `page.getByPlaceholder('Keyword')` — type + press Enter |
| Textarea | `getByRole('textbox', { name: /description/i })` |

### Select / Dropdown

```tsx
<Select placeholder="Choose category" options={categoryOptions} />
<Select mode="multiple" placeholder="Select tags" options={tagOptions} />
```

| What to select | Selector |
|---|---|
| Open select | `page.getByPlaceholder('Choose category').click()` or `page.locator('.ant-select').click()` |
| Select option | After opening: `page.getByText('Option Label').click()` or `page.locator('.ant-select-item-option').filter({ hasText: 'Label' })` |
| Multi-select tag removal | `.ant-select-selection-item .ant-select-selection-item-remove` |

### Typography / Heading

```tsx
<Typography.Title level={2}>User Management</Typography.Title>
```

| What to select | Selector |
|---|---|
| Page heading | `getByRole('heading', { name: /user management/i, level: 2 })` |

### Tabs

```tsx
<Tabs items={[{ key: 'list', label: 'List' }, { key: 'detail', label: 'Detail' }]} />
```

| What to select | Selector |
|---|---|
| Tab list | `getByRole('tablist')` |
| Tab by label | `getByRole('tab', { name: /list/i })` |
| Active tab | `getByRole('tab', { name: /list/i, selected: true })` |

### Breadcrumb

```tsx
<Breadcrumb items={[{ title: 'Home' }, { title: 'Users' }]} />
```

| What to select | Selector |
|---|---|
| Breadcrumb nav | `getByRole('navigation', { name: /breadcrumb/i })` |
| Breadcrumb item | `getByRole('link', { name: /users/i })` |

### Menu / Sidebar

```tsx
<Menu items={[{ key: 'users', label: 'User Management' }]} />
```

| What to select | Selector |
|---|---|
| Menu | `getByRole('menu')` |
| Menu item | `getByRole('menuitem', { name: /user management/i })` |

### Alert

```tsx
<Alert type="error" message="Load failed" description="Please try again." />
```

| What to select | Selector |
|---|---|
| Alert | `getByRole('alert')` |
| Alert text | `page.getByText('Load failed')` |

### Empty / Skeleton / Spin (no aria role)

| Component | Selector |
|---|---|
| Empty | `.ant-empty` or `page.getByText('No data')` |
| Skeleton | `.ant-skeleton` |
| Spin (loading) | `.ant-spin` or `.ant-spin-spinning` |

### Card

```tsx
<Card title="Overview" extra={<Button>More</Button>}>Content</Card>
```

| What to select | Selector |
|---|---|
| Card | `.ant-card` |
| Card by title | `page.locator('.ant-card').filter({ hasText: 'Overview' })` |
| Card action | `getByRole('button', { name: /more/i })` inside `.ant-card` |

### Tag

```tsx
<Tag color="green">Active</Tag>
```

| What to select | Selector |
|---|---|
| Tag | `page.getByText('Active')` — assert `.ant-tag` parent |
| Closable tag | `.ant-tag .ant-tag-close-icon` |

### Tree

```tsx
<Tree treeData={treeData} checkable />
```

| What to select | Selector |
|---|---|
| Tree | `getByRole('tree')` |
| Tree node | `getByRole('treeitem', { name: /node title/i })` |
| Checkbox in node | `.ant-tree-checkbox` inside tree node |

### DatePicker / RangePicker

```tsx
<DatePicker placeholder="Select date" />
<RangePicker placeholder={['Start', 'End']} />
```

| What to select | Selector |
|---|---|
| DatePicker | `page.getByPlaceholder('Select date')` |
| Calendar panel | `.ant-picker-dropdown` |
| Date cell | `.ant-picker-cell-inner` |

## Folder → Route Deduction Rules

When no `route-map.md` exists, derive the page map from folder structure:

```
src/views/                          # or src/pages/
  UserManagement/                   # → module = "user-management"
    index.tsx                        # → route /user-management (list/main page)
    CreateUser.tsx                   # → route /user-management/create
    UserDetail.tsx                   # → route /user-management/:id
    components/                      # → sub-components for this module
      UserTable.tsx
      UserForm.tsx
  OrderManagement/                  # → module = "order-management"
    index.tsx
    ...
src/components/                     # → shared sub-components
  CommonTable.tsx
  CommonModal.tsx
```

Deduction rules:
- `src/views/` or `src/pages/` — each subdirectory = one module (domain)
- `index.tsx` in module dir = the list/main page for that module
- Non-index `.tsx` files = sub-pages of that module
- `components/` subdir in module dir = module-level sub-components (read up to 5)
- `src/components/` = shared components (cross-module, lower priority for analysis)

Folder name → URL conversion:
- `UserManagement` → `/user-management` (PascalCase → kebab-case)
- `CreateUser` → `/create-user`
- `UserDetail` → `/:id` (detail pages usually have URL params)

## Source Extraction Rules (No data-testid)

When reading source code, do NOT grep for `data-testid`. Instead:

| Regex / Pattern | Extraction Target | Selector Derivation |
|---|---|---|
| `import { (.*) } from 'antd'` | AntD components in use | Which mapping rules to apply |
| `<Table[^>]*columns=\{([^}]+)\}` | Column variable name | Find `const columns = [...]` → extract `title` per column |
| `placeholder="([^"]*)"` | Placeholder text | `page.getByPlaceholder('$1')` |
| `<Form\.Item[^>]*label="([^"]*)"` | Form label | `page.getByLabel('$1')` |
| `<Modal[^>]*title="([^"]*)"` | Modal title | `getByRole('dialog', { name: /$1/i })` |
| `<Drawer[^>]*title="([^"]*)"` | Drawer title | `getByRole('dialog', { name: /$1/i })` |
| `>([^<]{2,30})</Button>` | Button text (2-30 chars) | `getByRole('button', { name: /$1/i })` |
| `<Typography\.Title[^>]*>([^<]+)` | Page heading | `getByRole('heading', { name: /$1/i })` |
| `<Tab\.Pane[^>]*tab="([^"]*)"` | Tab label | `getByRole('tab', { name: /$1/i })` |
| `<Breadcrumb\.Item[^>]*>([^<]+)` | Breadcrumb item | `getByRole('link', { name: /$1/i })` |
| `const columns\s*=\s*\[([\s\S]*?)\]` | Column definitions | Extract each `{ title: '...', dataIndex: '...', key: '...' }` |
| `options=\{?\[([\s\S]*?)\]\}?` | Select options | Extract each `{ value: '...', label: '...' }` |

## Operation Mode Detection

In Step 2 of SKILL.md, the agent determines the operation mode:

```
1. grep -c 'data-testid' across page + sub-component files
2. if count > 0:
     → IDEAL MODE — extract data-testid, use selector registry
3. if count == 0:
     a. grep 'from .antd.' or 'import { ... } from "antd"' to confirm Ant Design usage
     b. if AntD found → LEGACY MODE — use this document's mapping rules
     c. if no AntD → check for other UI libraries (Material UI, Chakra, etc.)
     d. if pure div/css (no UI library) → BLOCKED_BY_ZERO_ANCHORS
```

## BLOCKED_BY_ZERO_ANCHORS

This error fires when ALL of these are true:
- Zero `data-testid` in source
- No Ant Design (or other UI library with ARIA roles) detected
- No semantic HTML elements with roles (no `<button>`, `<table>`, `<form>`, etc.)
- Page is composed of `<div>` and `<span>` with CSS modules only

In this case, the only viable approach is to add `data-testid` to the source code first (which requires an implementation change, not just test generation).

## Selector Stability Notes

In legacy mode, all selectors carry a stability caveat:

- **Role-based selectors** (priority 4): Stable as long as Ant Design component type doesn't change
- **Text-based selectors** (priority 5-7): Stable unless UI text changes (i18n, renaming)
- **CSS class selectors** (priority 8): Stable for `.ant-*` classes (Ant Design internal); unstable for CSS module classes
- **XPath** (priority 9): Unstable — use only as temporary diagnostic, never in committed specs

Generated specs MUST annotate each selector with its stability level:
```markdown
- THEN the create button is visible (`getByRole('button', { name: /create user/i })`) [stable: role+text]
- AND the user table is visible (`page.locator('.ant-table-row')`) [stable: AntD CSS]
```
