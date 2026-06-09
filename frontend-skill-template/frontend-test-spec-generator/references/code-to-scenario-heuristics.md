# Code-to-Scenario Heuristics

React source code patterns → GIVEN/WHEN/THEN E2E scenario mapping rules.

## Scenario State Detection

### Pattern: Scenario Selector with Union Type

```tsx
const [scenario, setScenario] = useState<'loaded' | 'loading' | 'empty' | 'error'>('loaded')
```

**Generated scenarios** (one per state):

| State | GIVEN | WHEN | THEN |
|---|---|---|---|
| loaded | user navigates to route | scenario = "loaded" | heading + data region visible, filter bar visible |
| loading | user navigates to route | scenario = "loading" | loading skeleton visible, data region NOT visible |
| empty | user navigates to route | scenario = "empty" | empty placeholder visible, no data items rendered |
| error | user navigates to route | scenario = "error" | error alert visible, retry affordance visible |

**Detection**: Grep for `useState<` containing union type with `'loading'` or `'empty'` or `'error'`.

### Pattern: No Scenario Selector

If the page has no scenario selector, skip loading/empty/error state scenarios. Generate only what the code supports.

---

## Filter / Search Patterns

### Pattern: Search Input

```tsx
<Input.Search data-testid="skill-search" onSearch={handleSearch} />
```

**Generated scenario**:
- GIVEN user navigates to route with scenario="loaded"
- WHEN user types "keyword" into search input (`getByTestId('skill-search')`)
- THEN displayed results are filtered to items matching "keyword"

### Pattern: Select Dropdown Filter

```tsx
<Select data-testid="skill-category-filter" onChange={handleCategoryChange} options={[...]} />
```

**Generated scenario**:
- GIVEN user navigates to route with scenario="loaded"
- WHEN user selects "Text" in category filter (`getByTestId('skill-category-filter')`)
- THEN displayed results are filtered to text-category items

### Pattern: Multiple Filters Combined

If search + category + tags + sort exist, generate one scenario per filter + one "reset all" scenario.

---

## View Toggle Patterns

### Pattern: Grid/List Toggle

```tsx
const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
// ...
{viewMode === 'grid' ? <SkillGrid /> : <SkillList />}
```

**Generated scenarios**:
- GIVEN user is in grid view
- WHEN user clicks list button (`getByTestId('skill-list-btn')`)
- THEN list view container is visible (`getByTestId('skill-list-view')`)
- AND grid view container is NOT visible
- (And vice versa for grid button)

---

## Detail / Modal / Drawer Patterns

### Pattern: Card Click Opens Modal

```tsx
const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
// ...
<SkillCard data-testid={`skill-card-${skill.id}`} onClick={() => setSelectedSkill(skill)} />
<Modal data-testid="skill-detail-modal" open={!!selectedSkill} onClose={() => setSelectedSkill(null)}>
```

**Generated scenarios**:
- GIVEN user navigates to route with scenario="loaded"
- WHEN user clicks a skill card (`[data-testid^="skill-card-"].first()`)
- THEN detail modal is visible (`getByTestId('skill-detail-modal')`)
- AND modal contains skill name, description, category
- WHEN user closes the modal
- THEN modal is no longer visible
- AND user returns to list view

### Pattern: Row Click Opens Drawer

```tsx
<Table data-testid="task-table" onRow={(record) => ({ onClick: () => setSelectedTask(record) })} />
<Drawer data-testid="task-detail-drawer" open={!!selectedTask} onClose={...}>
```

**Generated scenarios**: Same structure as modal — open on click, content visible, close returns to list.

---

## URL Parameter Patterns

### Pattern: useParams with Filter

```tsx
const { filter } = useParams<{ filter?: string }>()
const [activeFilter, setActiveFilter] = useState<string>(filter || 'all')
```

**Generated scenarios**:
- GIVEN user navigates to `/skill/list/text`
- WHEN the page loads
- THEN sidebar filter indicator shows "text" is active
- AND displayed data is filtered to text-category items
- GIVEN user navigates to `/skill/list/all`
- WHEN the page loads
- THEN sidebar shows "all" as active (no filter indicator)
- AND all data is displayed

---

## Error Recovery Patterns

### Pattern: Retry Link in Error Boundary

```tsx
{scenario === 'error' && (
  <Alert data-testid="skill-error" type="error"
    message={<a data-testid="skill-error-retry-link" onClick={() => setScenario('loaded')}>Retry</a>}
  />
)}
```

**Generated scenarios**:
- GIVEN user navigates to route with scenario="error"
- WHEN user clicks retry link (`getByTestId('skill-error-retry-link')`)
- THEN page returns to loaded state
- AND data region is visible again

---

## Form Patterns

### Pattern: Multi-Step Form

```tsx
const [currentStep, setCurrentStep] = useState(0)
// Step 0: Basic Info, Step 1: Details, Step 2: Review
```

**Generated scenarios**:
- GIVEN user navigates to create page
- WHEN user fills step 0 fields and clicks "Next"
- THEN step 1 is visible
- (Repeat for each step transition)

### Pattern: Submit + Validation

```tsx
<Button data-testid="task-create-submit" onClick={handleSubmit}>Create Task</Button>
```

**Generated scenarios**:
- GIVEN user completes all required fields
- WHEN user clicks submit
- THEN success feedback is shown
- GIVEN user leaves required fields empty
- WHEN user clicks submit
- THEN validation errors are shown

---

## Conditional Rendering Patterns

### Pattern: Empty Results After Filter

```tsx
{filteredItems.length === 0 ? <Empty description="No results" /> : <DataGrid items={filteredItems} />}
```

**Generated scenarios**:
- GIVEN user applies a filter that matches no items
- WHEN the filter is applied
- THEN empty placeholder is visible
- AND "No results" message is shown

### Pattern: Permission / Role Gate

```tsx
{hasPermission('admin') && <Button data-testid="settings-users-add-button">Add User</Button>}
```

**Generated scenarios**:
- The scenario should note that the button visibility depends on auth state
- If mock data includes auth context, generate a scenario for admin vs non-admin

---

## Ant Design Specific Patterns

### Pattern: AntD Table

```tsx
<Table data-testid="task-table" dataSource={tasks} columns={columns} pagination={{ pageSize: 5 }} />
```

**Generated scenarios**:
- GIVEN user navigates to route with scenario="loaded"
- WHEN page renders
- THEN table is visible (`getByTestId('task-table')`)
- AND table contains N rows (`.ant-table-row`)
- AND pagination is visible (if data exceeds pageSize)

### Pattern: AntD Tree

```tsx
<Tree data-testid="settings-permissions-tree" treeData={permissionTree} checkable />
```

**Generated scenarios**:
- GIVEN user navigates to permissions page
- WHEN page renders
- THEN permission tree is visible
- WHEN user checks/unchecks a node
- THEN save button becomes enabled

### Pattern: AntD Form

```tsx
<Form data-testid="skill-config-form" onFinish={handleSave}>
  <Form.Item name="connection" rules={[{ required: true }]}>...</Form.Item>
</Form>
```

**Generated scenarios**:
- GIVEN user navigates to config page
- WHEN user fills form fields and clicks save
- THEN success message is shown
- GIVEN user leaves required fields empty
- WHEN user clicks save
- THEN validation error is shown

---

## Skeleton / Loading Patterns

### Pattern: AntD Skeleton

```tsx
import { Skeleton } from 'antd'
// ...
{scenario === 'loading' && <Skeleton data-testid="skill-loading" active paragraph={{ rows: 4 }} />}
```

**Generated scenarios**:
- GIVEN user navigates to route
- WHEN scenario is set to "loading"
- THEN skeleton placeholder is visible (`getByTestId('skill-loading')`)
- AND no data elements are rendered

---

## Pagination Patterns

### Pattern: AntD Table Pagination

Generated when `pagination` prop exists on `<Table>`:

- GIVEN user is on page 1
- WHEN user clicks next page
- THEN page 2 data is displayed
- AND pagination shows current page = 2

---

## Priority Order for Scenario Generation

1. Page load / initial render (always)
2. Scenario state switching (if scenario selector exists)
3. Primary data interaction (table row click / card click → detail)
4. Filter/search interactions (one per unique filter type)
5. View mode toggle (if multiple view modes exist)
6. URL parameter behavior (if useParams with filter)
7. Error recovery (if retry link exists)
8. Form submit + validation (if form with submit button)
9. Pagination (if Table with pagination)
10. Permission/role gates (if permission checks detected)

---

## Legacy Mode: Ant Design Component → Selector (Zero data-testid)

When the project has **no `data-testid` attributes**, all selectors are derived from Ant Design component declarations. See `legacy-anchor-strategy.md` for the full mapping. This section covers how the scenario generation heuristics change in legacy mode.

### Key Difference from Ideal Mode

```
Ideal:  getByTestId('skill-search')           ← data-testid present
Legacy: getByRole('textbox', { name: /search/i })  ← derived from placeholder/label
        page.getByPlaceholder('Search skills...')   ← extracted from props
        page.locator('.ant-input')                   ← CSS fallback
```

### Legacy: Table → Scenario Mapping

```tsx
// Source: no data-testid, only AntD Table
<Table columns={columns} dataSource={users} rowKey="id"
  onRow={(record) => ({ onClick: () => setSelected(record) })} />
```

**Generated scenarios (legacy selectors)**:
- GIVEN user navigates to route with data loaded
- WHEN page renders
- THEN table is visible (`getByRole('table')`)
- AND table has N rows (`page.locator('.ant-table-row')`)
- AND column headers show [titles from columns array]

**Row click scenario**:
- WHEN user clicks first row (`page.locator('.ant-table-row').first()`)
- THEN detail modal/drawer opens (`getByRole('dialog')`)

### Legacy: Form → Scenario Mapping

```tsx
// Source: no data-testid
<Form onFinish={handleSubmit}>
  <Form.Item label="Username" name="username" rules={[{ required: true }]}>
    <Input placeholder="Enter username" />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">Create User</Button>
  </Form.Item>
</Form>
```

**Generated scenarios (legacy selectors)**:
- GIVEN user navigates to create page
- WHEN page renders
- THEN form is visible (`getByRole('form')`)
- AND "Username" field is visible (`page.getByLabel('Username')`)
- AND submit button is visible (`getByRole('button', { name: /create user/i })`)

**Validation scenario**:
- GIVEN user leaves username empty
- WHEN user clicks "Create User" (`getByRole('button', { name: /create user/i })`)
- THEN validation error appears (`page.getByText('Please input')`) or (`.ant-form-item-explain-error`)

**Success scenario**:
- GIVEN user fills username (`page.getByLabel('Username').fill('testuser')`)
- WHEN user clicks "Create User"
- THEN success feedback appears

### Legacy: Modal/Drawer → Scenario Mapping

```tsx
// Source: no data-testid
<Modal title="User Detail" open={!!selected} onCancel={() => setSelected(null)}>
  <Descriptions column={1}>
    <Descriptions.Item label="Name">{selected?.name}</Descriptions.Item>
  </Descriptions>
</Modal>
```

**Generated scenarios (legacy selectors)**:
- GIVEN user clicks a row (`page.locator('.ant-table-row').first()`)
- WHEN the click triggers modal open
- THEN dialog is visible (`getByRole('dialog', { name: /user detail/i })`)
- AND dialog contains "Name" field with value

**Close scenario**:
- WHEN user clicks close (`getByRole('button', { name: /close/i })` or `.ant-modal-close`)
- THEN dialog is no longer visible

### Legacy: Select/Dropdown → Scenario Mapping

```tsx
// Source: no data-testid
<Select placeholder="Choose status" onChange={handleStatusChange}
  options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} />
```

**Generated scenarios (legacy selectors)**:
- GIVEN user navigates to page
- WHEN user opens select (`page.getByPlaceholder('Choose status').click()`)
- AND selects "Active" (`page.getByText('Active').click()`)
- THEN displayed data is filtered to active items

### Legacy: Selector Stability Annotation

Every legacy-mode scenario MUST annotate selector stability:

```markdown
- THEN the create button is visible
  (`getByRole('button', { name: /create user/i })`) [stable: role+text]
- AND the user table is visible
  (`page.locator('.ant-table-row')`) [stable: AntD CSS]
```

Stability levels:
- `[stable: role]` — ARIA role from Ant Design component
- `[stable: role+text]` — role + visible text, stable unless text changes
- `[stable: AntD CSS]` — `.ant-*` class, stable within same Ant Design major version
- `[fragile: text]` — text-only selector, may break on i18n or copy changes
- `[fragile: CSS module]` — CSS module class, likely to change on rebuild
- `[fragile: XPath]` — absolute path, diagnostic only
