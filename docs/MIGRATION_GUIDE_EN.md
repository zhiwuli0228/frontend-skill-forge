# Frontend Skill Forge — Agent Migration Guide

## Overview

This guide is **optimized for AI agent execution**. Every file and directory receives an explicit action label (KEEP / DELETE / REPLACE / MODIFY). Follow the steps in order; each step lists exact paths, generation rules, and expected outcomes.

**Template source:** `frontend-skill-forge` (React 19 + Vite 8 + TypeScript 6 + Ant Design 6 + React Router 7)
**Target:** `{{TARGET_PROJECT_NAME}}`

---

## Migration Strategy

### Core Principle: Two-Layer Separation

The template divides cleanly into two layers. Understanding this boundary is the foundation of correct migration:

```
┌──────────────────────────────────────────────────────┐
│  TEMPLATE INFRASTRUCTURE (preserve)                  │
│                                                      │
│  src/shell/      Layout, navigation, module config   │
│  src/app/        App shell, providers, router pattern│
│  src/shared/     Shared UI components                │
│  src/testability/ Element registry, selectors, fixtures│
│  src/main.tsx    Entry point                         │
│  config files    Vite, TS, ESLint, Playwright        │
│  docs/01-08/     Architecture, harness, ops docs     │
│  .claude/, .codex/, .opencode/  AI harness config    │
│                                                      │
├──────────────────────────────────────────────────────┤
│  SIMULATED BUSINESS CODE (delete & replace)          │
│                                                      │
│  src/domains/{task,skill,workflow,insight,settings}/ │
│  src/domains/dashboard/                              │
│  src/domains/auth/          Mock auth → real auth    │
│  src/shell/config/moduleConfig.tsx  → your modules   │
│  src/app/router.tsx                → your routes     │
│  tests/e2e/, tests/fixtures/      → your tests       │
│  docs/00-project/, docs/05-domain/  → your docs      │
│  docs/09-change-records/           → your records    │
└──────────────────────────────────────────────────────┘
```

### Three-Phase Migration Approach

#### Phase 1: DISCOVERY — Read & Understand

Before modifying anything, read the template's key files to build a mental model:

1. Read `src/shell/config/moduleConfig.tsx` — understand the `ModuleConfig` type contract
2. Read `src/app/router.tsx` — understand the 3-level nesting pattern (AuthGuard → GlobalShell → ModuleLayout → Page)
3. Read `src/shell/layout/GlobalShell.tsx` — understand what it renders and what context it consumes
4. Read `src/shell/layout/ModuleLayout.tsx` — understand how it derives tabs/sidebar/breadcrumb from config
5. Read `src/domains/auth/context/useAuth.ts` — understand the `AuthContextValue` contract
6. Read one complete domain page (e.g., `src/domains/task/pages/TaskListPage.tsx`) — understand the scenario pattern
7. Read `src/testability/selectors.ts` — understand the selector entry format

These 7 files define **all contracts** your migrated code must satisfy. Everything else follows from them.

#### Phase 2: SCAFFOLD — Build the Skeleton

Work in strict dependency order. Each step produces output that the next step consumes:

```
moduleConfig.tsx  ──►  router.tsx  ──►  providers.tsx
       │                    │
       └────────────────────┼──►  domain/page components
                            │
                            └──►  selectors.ts  ──►  E2E tests + fixtures
```

1. Define `moduleConfig.tsx` first — all navigation components read from it
2. Write `router.tsx` next — it references module keys and page components
3. Create page stubs (returning `<PlaceholderPage>` initially) so the router compiles
4. Update `providers.tsx` — add Query/state management wrappers
5. Fill in page components — one by one, following the scenario pattern
6. Register selectors — after page components have their `data-testid` attributes
7. Write E2E tests — after selectors are registered

#### Phase 3: FILL — Replace Stubs with Real Implementation

For each module, iterate:
1. Create mock data in `data/mock-data.ts` (loaded + empty variants)
2. Build domain components with `data-testid` attributes
3. Replace page stubs with full scenario-driven pages
4. Wire up sidebar filter parameter handling (`useParams<{ filter?: string }>()`)
5. Register selectors in `SELECTOR_REGISTRY`
6. Write fixtures and E2E tests
7. Run `npm run build` and `npm run dev` to verify

### Risk Management

| Risk | Mitigation |
|------|------------|
| Build breaks after deleting domains | Run `npm run build` after each major step — catch import errors immediately |
| Shell components reference deleted auth code | `AuthGuard` and `GlobalShell` only import from `useAuth` — keep that hook's contract |
| ModuleLayout redirects to non-existent route | Always define `defaultRoute` before wiring the router |
| TypeScript `verbatimModuleSyntax` errors | After every file creation, check that type imports use `import type { X }` |

### Rollback Checkpoints

After each step below passes verification, create a git commit. If a later step fails, revert to the last checkpoint:

```bash
git add -A && git commit -m "migrate: step N — <description>"
```

---

## Template Variables

Replace these before starting:

| Variable | Example |
|----------|---------|
| `{{TARGET_PROJECT_NAME}}` | `my-order-system` |
| `{{APP_TITLE}}` | `Order Management System` |
| `{{MODULE_KEY_1}}`, `{{MODULE_KEY_2}}`, ... | `orders`, `inventory`, `customers` |
| `{{MODULE_LABEL_1}}`, `{{MODULE_LABEL_2}}`, ... | `Order Management`, `Inventory` |
| `{{DEFAULT_MODULE_KEY}}` | `orders` |
| `{{DEFAULT_ROUTE}}` | `/orders/list` |
| `{{ENTITY_1}}`, `{{ENTITY_2}}`, ... | `Order`, `InventoryItem`, `Customer` |

---

## Step 1: Discovery — Read Key Files

**Goal:** Understand all contracts before making changes.

### Files to READ (mandatory)

```
src/shell/config/moduleConfig.tsx       # ModuleConfig, TabItem, SidebarMenuItem types
src/app/router.tsx                       # 3-level route nesting pattern
src/shell/layout/GlobalShell.tsx         # Header + Drawer + Content structure
src/shell/layout/ModuleLayout.tsx        # Tab + Sider + Breadcrumb structure
src/domains/auth/context/useAuth.ts      # AuthContextValue contract
src/domains/task/pages/TaskListPage.tsx  # Scenario pattern reference
src/testability/selectors.ts             # SelectorEntry format
```

### Files to READ (recommended — understand the patterns)

```
src/shell/navigation/ModuleSwitcher.tsx      # How modules are rendered in drawer
src/shell/navigation/SidebarNavigation.tsx    # How sidebar menu items work
src/shell/navigation/TopTabNavigation.tsx     # How top tabs work
src/domains/task/components/TaskTable.tsx     # Domain component pattern
src/domains/task/data/mock-data.ts            # Mock data export pattern
src/app/App.tsx                               # Provider wrapping order
src/app/providers.tsx                         # Current provider list
src/shared/ui/PlaceholderPage.tsx             # Page stub helper
tests/e2e/smoke.spec.ts                       # E2E test pattern
tests/helpers/fixture-loader.ts               # Fixture loading utility
```

### Action

Read each file above. Take notes on:
- Type contracts that must be preserved
- Import paths that your code will need to match
- `data-testid` naming conventions
- The exact shape of mock data exports

---

## Step 2: Initialize Project

### Files to MODIFY

| Action | Path | Instructions |
|--------|------|--------------|
| MODIFY | `package.json` | Set `name` to `"{{TARGET_PROJECT_NAME}}"`. Update `description`. Add/remove dependencies as needed. |
| MODIFY | `index.html` | Change `<title>` to `"{{APP_TITLE}}"`. |

### Verification
```bash
npm install
npm run build  # must pass on unmodified template code
```

---

## Step 3: Clean Simulated Business Code

### Files to DELETE

```
src/domains/task/
src/domains/skill/
src/domains/workflow/
src/domains/insight/
src/domains/settings/
src/domains/dashboard/
tests/e2e/*
tests/fixtures/tasks/
tests/fixtures/skills/
tests/fixtures/workflows/
tests/fixtures/insights/
src/assets/hero.png
```

### Files to TEMPORARILY STUB

After deleting the domains above, `router.tsx` will have broken imports. Remove all domain page imports from `router.tsx` and replace the route tree with a minimal stub:

```tsx
import { createBrowserRouter } from 'react-router'
import { Outlet } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <div data-testid="login-stub">Login (stub)</div>,
  },
  {
    path: '/',
    element: <div data-testid="root-stub">Root (stub) <Outlet /></div>,
    children: [
      { index: true, element: <div>Home (stub)</div> },
    ],
  },
])
```

### Verification
```bash
npm run build  # must pass with stub router — proves shell code has zero domain dependencies
```

---

## Step 4: Define Module Configuration

`src/shell/config/moduleConfig.tsx` — **REPLACE** the `modules` object entirely.

### Type Contracts (KEEP EXACTLY AS-IS)

```ts
export interface TabItem {
  key: string        // route path, e.g. "/orders/list"
  label: string      // display label, e.g. "Order List"
}

export interface SidebarMenuItem {
  key: string
  label: string
  path?: string      // route path with optional filter param
  children?: SidebarMenuItem[]
}

export interface ModuleConfig {
  key: string              // URL segment, e.g. "orders"
  label: string            // display name, e.g. "Order Management"
  icon: ReactNode          // from @ant-design/icons
  defaultRoute: string     // e.g. "/orders/list"
  tabs: TabItem[]
  sidebarMenu: SidebarMenuItem[]
}
```

### Generation Rule

For each business module target, create one `ModuleConfig` entry:

```tsx
{{MODULE_KEY}}: {
  key: '{{MODULE_KEY}}',
  label: '{{MODULE_LABEL}}',
  icon: <{{ICON_COMPONENT}} />,  // pick from @ant-design/icons
  defaultRoute: '/{{MODULE_KEY}}/{{FIRST_TAB_PATH}}',
  tabs: [
    { key: '/{{MODULE_KEY}}/{{TAB_PATH_1}}', label: '{{TAB_LABEL_1}}' },
    { key: '/{{MODULE_KEY}}/{{TAB_PATH_2}}', label: '{{TAB_LABEL_2}}' },
    // ...
  ],
  sidebarMenu: [
    { key: 'all', label: 'All', path: '/{{MODULE_KEY}}/{{FIRST_TAB_PATH}}/all' },
    { key: '{{FILTER_KEY_1}}', label: '{{FILTER_LABEL_1}}', path: '/{{MODULE_KEY}}/{{FIRST_TAB_PATH}}/{{FILTER_KEY_1}}' },
    // ...
  ],
},
```

### Design Heuristics

- **tab count**: 2-5 per module. Fewer than 2 means no tabs needed; more than 5 suggests splitting into two modules.
- **sidebar vs tabs**: If a menu item navigates to a *different* page (different URL path), it is a **tab**. If it filters the *same* page (same URL path with `:filter?` param), it is a **sidebarMenuItem**.
- **sidebar `path` field**: MUST include the optional `:filter?` param route pattern so the parent page receives it. Example: `/orders/list/pending` where the route is `/orders/list/:filter?`.
- **icon selection**: Use `@ant-design/icons` components only. Reference: https://ant.design/components/icon.

### Keep these exports UNCHANGED

```tsx
export const MODULE_LABELS: Record<string, string> = ...
export const MODULE_ICONS: Record<string, ReactNode> = ...
export function getModuleConfig(key: string): ModuleConfig | undefined { ... }
```

These are consumed by `GlobalShell.tsx` (via `MODULE_LABELS`) and `ModuleLayout.tsx` (via `getModuleConfig`).

### Verification
```bash
npx tsc -b --noEmit  # verify moduleConfig compiles in isolation
```

---

## Step 5: Rewrite Router

`src/app/router.tsx` — **REPLACE** the stub with real routes.

### Structural Template (DO NOT CHANGE THIS PATTERN)

```tsx
import { createBrowserRouter, redirect } from 'react-router'
import { GlobalShell } from '../shell/layout/GlobalShell'
import ModuleLayout from '../shell/layout/ModuleLayout'
import { AuthGuard } from '../domains/auth/guards/AuthGuard'
import { LoginPage } from '../domains/auth/pages/LoginPage'
// Import your page components here (use PlaceholderPage as stubs initially)

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AuthGuard />,
    children: [{
      element: <GlobalShell />,
      children: [
        {
          index: true,
          loader: () => redirect('{{DEFAULT_ROUTE}}'),
        },
        // For each module in moduleConfig.tsx:
        {
          path: '{{MODULE_KEY}}',
          element: <ModuleLayout moduleKey="{{MODULE_KEY}}" />,
          children: [
            { index: true, loader: () => redirect('/{{MODULE_KEY}}/{{DEFAULT_TAB}}') },
            { path: '{{TAB_PATH_1}}/:filter?', element: <{{PAGE_COMPONENT_1}} /> },
            { path: '{{TAB_PATH_2}}', element: <{{PAGE_COMPONENT_2}} /> },
            // one child per tab in moduleConfig
          ],
        },
      ],
    }],
  },
])
```

### Rules (non-negotiable)

1. `AuthGuard` wraps everything except `/login`
2. `GlobalShell` wraps all authenticated routes
3. Each module route uses `<ModuleLayout moduleKey="..."/>` — the `moduleKey` MUST match a key in `moduleConfig.tsx`
4. Optional `:filter?` param ONLY on list/index routes that support sidebar filtering
5. `index: true` with `redirect` loader for bare module paths (`/orders` → `/orders/list`)
6. The root `index: true` redirects to the default module's default route

### Phase 2 Strategy: Use Page Stubs First

Create minimal page components that return `<PlaceholderPage>` so the router compiles:

```tsx
// src/domains/orders/pages/OrderListPage.tsx
import { PlaceholderPage } from '../../../shared/ui/PlaceholderPage'
export function OrderListPage() {
  return <PlaceholderPage title="Order List" description="Order list page (stub)" />
}
```

This decouples router wiring from page implementation — you can verify navigation works before building full pages.

### Verification
```bash
npm run build          # full build must pass
npm run dev            # start dev server
# Navigate to each module, verify:
# - Top tabs appear and navigate correctly
# - Sidebar menu items appear and update URL
# - Breadcrumb shows correct module > page
# - Module switcher drawer shows all modules
```

---

## Step 6: Replace Auth Logic

### Contract Preservation

`GlobalShell` and `AuthGuard` depend on the `useAuth()` hook returning this shape:

```ts
interface AuthContextValue {
  user: { username: string } | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}
```

**DO NOT** change the field names `isAuthenticated`, `login`, `logout` — they are consumed by GlobalShell.

### Files to Process

| File | Action | Instructions |
|------|--------|--------------|
| `src/domains/auth/context/useAuth.ts` | MODIFY | Update `AuthContextValue` to add fields (e.g., `token`, `role`, `permissions[]`). Keep existing fields. |
| `src/domains/auth/context/AuthContext.tsx` | MODIFY | Replace mock `login` (800ms setTimeout + credential check) with real API call. Keep the `AuthProvider` wrapper signature. |
| `src/domains/auth/data/auth-mock-data.ts` | DELETE | Remove mock credentials — real auth has no use for them. |
| `src/domains/auth/guards/AuthGuard.tsx` | KEEP | Reads `isAuthenticated` — no changes needed. Optionally add role-based redirect logic. |
| `src/domains/auth/pages/LoginPage.tsx` | REPLACE | Replace with your branded login page. Keep `data-testid` on form fields for E2E tests. |

### Verification
```bash
npm run dev
# - Visit / when not authenticated → redirected to /login
# - Login with valid credentials → redirected to default route
# - Login with invalid credentials → error message shown
# - Click logout in header dropdown → redirected to /login
# - Visit /login when already authenticated → redirected to default route
```

---

## Step 7: Update Providers

`src/app/providers.tsx` — **MODIFY** to add new global providers.

### Current state

```tsx
import type { ReactNode } from 'react'
import { AuthProvider } from '../domains/auth/context/AuthContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
```

### Common additions (choose as needed)

```tsx
import type { ReactNode } from 'react'
import { AuthProvider } from '../domains/auth/context/AuthContext'

// If using React Query for server state:
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
})

// If using a router-aware auth (e.g., keycloak-js):
// import { ReactKeycloakProvider } from '@react-keycloak/web'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AuthProvider>
  )
}
```

**Note:** `src/app/App.tsx` wraps `<RouterProvider>` inside `<ConfigProvider>` — update `ConfigProvider`'s `theme` prop there for Ant Design token customization. Do NOT restructure `App.tsx`.

### Verification
```bash
npm run build  # must pass
```

---

## Step 8: Create Domain Pages (Fill Phase)

For each module defined in `moduleConfig.tsx`, create the corresponding page and component files under `src/domains/{{MODULE_KEY}}/`.

### Directory structure per module

```
src/domains/{{MODULE_KEY}}/
├── components/                # Domain-specific components
│   ├── {{Entity}}Table.tsx     # Data table with row selection, batch actions
│   ├── {{Entity}}FilterBar.tsx # Filter controls (status, priority, category selects)
│   └── {{Entity}}DetailDrawer.tsx # Detail view drawer or modal
├── data/
│   └── mock-data.ts           # exports: {{entities}}[] and empty{{Entities}}[]
├── pages/
│   ├── {{Entity}}ListPage.tsx  # List/tabular view with scenario selector
│   ├── {{Entity}}CreatePage.tsx # Creation form page
│   └── ...                     # One page per tab in moduleConfig
└── hooks/                      # Domain-specific hooks (optional)
    └── use{{Entity}}.ts
```

### Page Component Pattern (follow exactly)

Each data-display page MUST follow this pattern. It is the single most important code convention in the template:

```tsx
import { useState } from 'react'
import { useParams } from 'react-router'
import { Typography, Select, Space, Alert, Skeleton } from 'antd'
// import { {{entities}}, empty{{Entities}}, type {{Entity}}Item } from '../data/mock-data'
// import { {{Entity}}Table, {{Entity}}FilterBar, {{Entity}}DetailDrawer } from '../components/...'

type Scenario = 'loaded' | 'loading' | 'empty' | 'error'

export function {{Entity}}ListPage() {
  const { filter } = useParams<{ filter?: string }>()
  const [scenario, setScenario] = useState<Scenario>('loaded')

  // Sidebar filter integration:
  // const baseItems = scenario === 'empty' ? empty{{Entities}} : {{entities}}
  // const filtered = useMemo(() => {
  //   let result = baseItems
  //   if (filter && filter !== 'all') result = result.filter(t => t.status === filter)
  //   return result
  // }, [baseItems, filter])

  const scenarioSelector = (
    <Space style={{ marginBottom: 16 }}>
      <Typography.Text>Scenario:</Typography.Text>
      <Select
        value={scenario}
        onChange={setScenario}
        options={[
          { value: 'loaded', label: 'Loaded' },
          { value: 'loading', label: 'Loading' },
          { value: 'empty', label: 'Empty' },
          { value: 'error', label: 'Error' },
        ]}
        data-testid="{{module-key}}-scenario-select"
      />
    </Space>
  )

  if (scenario === 'loading') {
    return (
      <div data-testid="{{module-key}}-loading">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    )
  }

  if (scenario === 'error') {
    return (
      <div data-testid="{{module-key}}-error">
        <Alert
          type="error"
          message="Failed to load {{entity}} list"
          showIcon
          action={
            <a onClick={() => setScenario('loaded')}
               data-testid="{{module-key}}-error-retry-link">
              Retry
            </a>
          }
        />
      </div>
    )
  }

  // scenario === 'loaded' or 'empty':
  return (
    <div data-testid="{{module-key}}-page">
      {scenarioSelector}
      {/* {{Entity}}FilterBar */}
      {/* sidebar filter indicator tag */}
      {/* {{Entity}}Table with empty state for scenario==='empty' */}
      {/* {{Entity}}DetailDrawer */}
    </div>
  )
}
```

### Naming Conventions

| Element | Format | Example |
|---------|--------|---------|
| Page component | `{{Entity}}{{Action}}Page` (PascalCase) | `OrderListPage`, `OrderCreatePage` |
| Domain component | `{{Entity}}{{Role}}` (PascalCase) | `OrderTable`, `OrderFilterBar` |
| `data-testid` | `{{module-key}}-{{role}}` (kebab-case) | `order-table`, `order-filter-bar` |
| Mock data (loaded) | `{{entities}}` (camelCase) | `orders`, `skillItems` |
| Mock data (empty) | `empty{{Entities}}` (camelCase) | `emptyOrders`, `emptySkillItems` |
| Route path | `/{{module-key}}/{{action}}` (kebab-case) | `/orders/list`, `/orders/create` |
| Type name | `{{Entity}}Item` (PascalCase) | `OrderItem`, `CustomerItem` |

### Incremental Verification

Build each module one at a time:
```bash
# After each module's page stubs are created:
npm run build

# After each module's full implementation:
npm run dev  # cycle all 4 scenarios, test sidebar filter, test top tabs
```

---

## Step 9: Update Selector Registry

`src/testability/selectors.ts` — **REPLACE** the `SELECTOR_REGISTRY` object.

### Remove entries

Delete all entries with prefixes matching deleted domains: `skill-list.`, `task-list.`, `workflow-list.`, `dashboard.`

### Add entries for each new page

For each interactive element in your pages, register:

```ts
'{{module-key}}.{{element-role}}': {
  id: '{{module-key}}.{{element-role}}',
  priority: 'testid',  // or 'role' for heading elements
  selector: 'data-testid={{data-testid-value}}',  // or 'role=heading[name=/pattern/i]'
  description: 'Human-readable description',
},
```

### Priority rules
- **`'role'`**: Use for page headings ONLY — `selector: 'role=heading[name=/pattern/i]'`
- **`'testid'`**: Use for ALL other elements — `selector: 'data-testid=value'`

### Minimum entries per list page
```
{{module-key}}.heading        (priority: role)
{{module-key}}.filter-bar     (priority: testid)
{{module-key}}.table          (priority: testid)
{{module-key}}.scenario-select (priority: testid)
{{module-key}}.loading        (priority: testid)
{{module-key}}.error          (priority: testid)
{{module-key}}.error-retry-link (priority: testid)
{{module-key}}.empty          (priority: testid) — if empty state has a testid
```

### Verification
```
npx tsc -b --noEmit  # selectors.ts compiles
```

---

## Step 10: Create E2E Tests and Fixtures

### Test Fixture format

`tests/fixtures/{{module-key}}/{{fixture-name}}.json`:

```json
{
  "scenarioId": "{{module-key}}-list-loaded",
  "page": "/{{module-key}}/list",
  "purpose": "Verify {{module-key}} list page renders correctly with data",
  "data": {
    "items": []
  },
  "expected": {
    "visibleTexts": ["heading text", "expected labels"],
    "roles": ["heading", "table", "button"],
    "actions": ["click", "navigate"]
  }
}
```

Note: `expected.visibleTexts`, `expected.roles`, and `expected.actions` are validated by `validateScenarioShape()` in `src/testability/fixture.ts`.

### E2E test structure

`tests/e2e/{{module-key}}-list-runtime.spec.ts`:

```ts
import { test, expect } from '@playwright/test'

test.describe('{{Module Label}} List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.fill('[data-testid="username"]', 'admin')
    await page.fill('[data-testid="password"]', 'admin123')
    await page.click('[data-testid="login-submit"]')
    await page.waitForURL('/**/list/**')
  })

  test('renders page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /{{pattern}}/i })).toBeVisible()
  })

  test('toggles through scenarios', async ({ page }) => {
    // Select "loading" → verify skeleton visible
    // Select "empty" → verify empty state visible
    // Select "error" → verify error alert + retry link
    // Select "loaded" → verify table/content visible
  })

  test('filters by sidebar menu item', async ({ page }) => {
    // Click sidebar menu item
    // Verify URL contains filter param
    // Verify filter indicator tag is visible
  })

  test('navigates via top tabs', async ({ page }) => {
    // Click each top tab
    // Verify URL changes
    // Verify breadcrumb updates
  })
})
```

### Playwright config

`playwright.config.ts` — **KEEP** but verify settings match your project:
- `webServer.command`: `npm run dev` (or your dev command)
- `webServer.port`: matches your Vite port (default `5173`)
- `testDir`: `tests/e2e`

### Verification
```bash
npx playwright test  # run all E2E tests
```

---

## Step 11: Documentation Localization

This is a critical step. The template ships with a rich documentation layer designed for AI-assisted development. Each subdirectory in `docs/` serves a distinct purpose and has different localization rules.

### Documentation Category Map

| Directory | Category | Action | Rationale |
|-----------|----------|--------|-----------|
| `docs/00-project/` | Project identity | **REGENERATE** | Template's project overview, glossary, roadmap are specific to "Frontend Skill Forge" |
| `docs/01-architecture/` | Architecture reference | **PRESERVE + UPDATE** | Layering, module boundary, route architecture patterns are universal — update references to specific module names |
| `docs/02-harness/` | AI harness governance | **PRESERVE** | Agent workflow, git governance, verification policy, skill lifecycle — language- and domain-agnostic |
| `docs/03-openspec/` | OpenSpec specs | **PRESERVE** | Spec management process is template infrastructure |
| `docs/04-development/` | Dev guidelines | **PRESERVE + UPDATE** | Coding guide, testing guide, evidence rules — update toolchain details if changed |
| `docs/05-domain/` | Domain knowledge | **REGENERATE** | Template's domain docs describe simulated business logic |
| `docs/06-operations/` | Ops & release | **UPDATE** | Release notes and troubleshooting — update for your project |
| `docs/07-evidence/` | Verification evidence | **CLEAR + REBUILD** | Evidence is project-specific; archive old as reference, rebuild for new project |
| `docs/08-frontend-agent/` | Frontend AI harness | **PRESERVE** | MCP protocols, E2E assets, UI evidence schemas — part of template infrastructure |
| `docs/09-change-records/` | Version ledger | **RESET** | Archive template's records, start fresh for your project |
| `docs/README.md` | Docs index | **UPDATE** | Update section descriptions to reflect your project |
| `docs/MIGRATION_GUIDE_CN.md` | Migration guide (CN) | **DELETE or UPDATE** | Remove if not needed; update if you maintain a Chinese team |
| `docs/MIGRATION_GUIDE_EN.md` | Migration guide (EN) | **KEEP** | This guide itself — keep for future reference |

### Category: PRESERVE (read-only after migration)

These directories contain template infrastructure documentation. Do NOT modify content — only update cross-references if file paths change:

```
docs/02-harness/       # AI agent workflow, git governance, verification, skill lifecycle
docs/03-openspec/      # Spec management, superpower patterns
docs/08-frontend-agent/ # MCP protocols, UI evidence, E2E asset lifecycle, evolution
```

### Category: PRESERVE + UPDATE (keep structure, localize references)

These directories contain universal patterns with template-specific examples. Update:

| Directory | What to Update |
|-----------|---------------|
| `docs/01-architecture/` | In `architecture-guide.md`, `frontend-layering.md`: replace "task/skill/workflow" module examples with your module names. In `route-architecture.md`: update the route tree diagram. |
| `docs/04-development/` | In `coding-guide.md`: update module name references. In `local-development.md`: update port/config if changed. In `testing-guide.md`: update test examples with your module names. |

**Update rule**: Search each file for template-specific names (`task`, `skill`, `workflow`, `insight`, `settings`, `dashboard`, `Frontend Skill Forge`) and replace with your equivalents. Do NOT change structural content.

### Category: REGENERATE (create from scratch, using template as structural reference)

These directories must be rewritten for your project. Use the template versions as structural guides, not content sources.

#### `docs/00-project/` — Generation Rules

| File | Content Source | How to Generate |
|------|---------------|-----------------|
| `README.md` | Directory index | List the files in this directory with one-line descriptions |
| `project-overview.md` | `moduleConfig.tsx` + `package.json` | Describe: project name, tech stack, module list (from config), key features per module, architecture highlights |
| `glossary.md` | `moduleConfig.tsx` + domain entities | Define: each module term, each entity type, each status value, technical terms (shell, layout, scenario, selector) |
| `current-status.md` | git log + migration state | Current phase, completed steps, pending steps, known issues |
| `roadmap.md` | User-provided plan | Future phases, planned features, timeline. If unknown, write "TBD — define after migration" |

**Structural reference**: Read the template's `docs/00-project/project-overview.md` first. Note its sections (Overview, Tech Stack, Modules, Architecture). Replicate the section structure with your content.

#### `docs/05-domain/` — Generation Rules

The template has 3 domain docs: `e2e-exploration-domain.md`, `frontend-understanding-domain.md`, `incremental-coding-domain.md`. These describe the AI agent's approach to exploring, understanding, and coding against the simulated domains.

For your project, generate:

| File | Content |
|------|---------|
| `README.md` | Index of domain docs |
| `{{module-key}}-domain.md` | One per module: describe the domain model, entities, statuses, business rules, page inventory, component inventory |
| `e2e-exploration-domain.md` | Update: replace template module references with your modules. Describe how an AI agent should explore each page. |
| `frontend-understanding-domain.md` | Update: describe component tree, data flow, and state management for each module. |
| `incremental-coding-domain.md` | Update: describe coding patterns, mock data conventions, and test patterns per module. |

**Generation heuristic**: For each module, read its `mock-data.ts` and list all entity types, their fields, status values, and relationships. This becomes the domain model documentation.

#### `docs/09-change-records/` — Generation Rules

| Action | Path | Instructions |
|--------|------|--------------|
| ARCHIVE | `docs/09-change-records/` | Move all existing content to `docs/09-change-records/archive/template-migration/` |
| CREATE | `docs/09-change-records/current/` | Create `migration-record.md` documenting the migration: date, source template, target project, modules defined |
| CREATE | `docs/09-change-records/versions/` | Create `v0.1.0-migration.md` as the first version record |
| CREATE | `docs/09-change-records/baselines/` | Create a baseline snapshot of the post-migration project state |

#### `docs/06-operations/` — Update Rules

| File | Action | Instructions |
|------|--------|--------------|
| `README.md` | UPDATE | Update directory description |
| `release-notes.md` | REPLACE | Write initial release notes: "v0.1.0 — Initial migration from frontend-skill-forge template" |
| `troubleshooting.md` | UPDATE | Keep generic sections (build issues, lint issues), add project-specific issues as encountered |

#### `docs/07-evidence/` — Clear and Rebuild

| Action | Instructions |
|--------|--------------|
| ARCHIVE | Move all existing evidence to `docs/07-evidence/archive/template-reference/` |
| CREATE | `README.md` with the evidence directory structure for your project |
| REBUILD | After verification runs, populate with new screenshots, traces, reports |

### Documentation Generation Strategy

When generating new documentation for your project, follow this order:

1. **Read the template doc first** — understand its structure, section headings, and level of detail
2. **Extract the template's section outline** — preserve the heading hierarchy
3. **Fill with your content** — replace template-specific names, entities, modules
4. **Update cross-references** — if a doc references another doc, verify the path is still valid
5. **Verify consistency** — module names, entity names, and route paths must match `moduleConfig.tsx` and `router.tsx` exactly

### Cross-Reference Update Map

After renaming/deleting files, update these cross-references:

| File | References to Update |
|------|---------------------|
| `docs/README.md` | Update section descriptions, file counts, directory tree |
| `docs/00-project/project-overview.md` | Links to architecture docs, domain docs |
| `docs/01-architecture/architecture-guide.md` | Links to module config, route architecture |
| `docs/04-development/coding-guide.md` | Links to architecture docs, testing guide |
| `docs/04-development/testing-guide.md` | Links to selectors, fixture format |

### Verification
```bash
# Check no broken markdown links (relative paths):
find docs/ -name "*.md" -exec grep -oP '\[.*?\]\(\.\.?/[^)]+\)' {} + | while read link; do
  # verify the target file exists
done

# Verify all referenced files exist:
ls docs/00-project/ docs/01-architecture/ docs/04-development/ docs/05-domain/ docs/06-operations/
```

---

## Appendix A: Project Files — Complete Action Map

Legend: **K** = Keep as-is, **D** = Delete, **R** = Replace entirely, **M** = Modify (keep structure, change content)

| Path | Action | Notes |
|------|--------|-------|
| `.claude/` | K | AI harness config |
| `.codex/` | K | Codex skills |
| `.gitignore` | K | |
| `.opencode/` | K | OpenCode config |
| `artifacts/` | K | Clean up old artifacts |
| `dist/` | D | Will be regenerated on build |
| `docs/00-project/` | R | Regenerate for your project |
| `docs/01-architecture/` | M | Preserve structure, update module references |
| `docs/02-harness/` | K | AI harness governance |
| `docs/03-openspec/` | K | OpenSpec |
| `docs/04-development/` | M | Update module references, toolchain details |
| `docs/05-domain/` | R | Regenerate for your domains |
| `docs/06-operations/` | M | Update release notes, troubleshooting |
| `docs/07-evidence/` | R | Archive old, rebuild |
| `docs/08-frontend-agent/` | K | Frontend AI harness |
| `docs/09-change-records/` | R | Archive template records, start fresh |
| `docs/README.md` | M | Update index |
| `docs/MIGRATION_GUIDE_CN.md` | D or M | Delete or translate for your team |
| `docs/MIGRATION_GUIDE_EN.md` | K | This guide — keep for reference |
| `eslint.config.js` | K | |
| `frontend-skill-template/` | K | AI skill templates |
| `index.html` | M | Change `<title>` |
| `node_modules/` | D | Run `npm install` after |
| `openspec/` | M | Update specs for your project |
| `package-lock.json` | D | Regenerated on install |
| `package.json` | M | Update name, description, deps |
| `playwright.config.ts` | K | Verify port |
| `public/` | M | Replace favicon if desired |
| `scripts/` | K | |
| `src/adapters/` | K | Future API adapters |
| `src/app/App.tsx` | K | Keep structure |
| `src/app/providers.tsx` | M | Add new providers |
| `src/app/router.tsx` | R | Replace all routes |
| `src/assets/react.svg` | K | |
| `src/assets/vite.svg` | K | |
| `src/capabilities/` | K | |
| `src/domains/auth/` | M | Replace mock with real auth |
| `src/domains/task/` | D | Delete |
| `src/domains/skill/` | D | Delete |
| `src/domains/workflow/` | D | Delete |
| `src/domains/insight/` | D | Delete |
| `src/domains/settings/` | D | Delete |
| `src/domains/dashboard/` | D | Delete |
| `src/main.tsx` | K | |
| `src/shared/ui/PlaceholderPage.tsx` | K | |
| `src/shell/config/moduleConfig.tsx` | R | Replace modules object |
| `src/shell/layout/GlobalShell.tsx` | K | |
| `src/shell/layout/ModuleLayout.tsx` | K | |
| `src/shell/navigation/ModuleSwitcher.tsx` | K | |
| `src/shell/navigation/SidebarNavigation.tsx` | K | |
| `src/shell/navigation/TopTabNavigation.tsx` | K | |
| `src/testability/` | M | Update selectors, keep rest |
| `src/testability/selectors.ts` | R | Replace entries |
| `src/testability/fixture.ts` | K | |
| `src/testability/evidence.ts` | K | |
| `src/testability/element-registry/` | K | |
| `src/variants/` | K | |
| `tests/e2e/*` | D | Delete old, create new |
| `tests/fixtures/*` | D | Delete old, create new |
| `tests/helpers/fixture-loader.ts` | K | |
| `tsconfig.json` | K | |
| `tsconfig.app.json` | K | |
| `tsconfig.node.json` | K | |
| `vite.config.ts` | K | |

---

## Appendix B: Verification Checklist

Run after completing all steps:

```bash
# 1. Type-check
npm run build

# 2. Lint
npm run lint

# 3. Start dev server and manually verify:
#    - Login flow works (valid + invalid credentials)
#    - Module switcher drawer shows all modules, clicking navigates correctly
#    - Each module: top tabs navigate and update breadcrumb
#    - Each module: sidebar menu items filter and update URL
#    - Each list page: scenario selector cycles loaded/loading/empty/error
#    - User dropdown shows username, logout redirects to /login

# 4. E2E tests
npm run test:e2e

# 5. Documentation
#    - docs/README.md index is up to date
#    - No broken internal links in docs/
#    - All referenced modules/entities match moduleConfig.tsx
```

---

## Appendix C: Key Conventions (Non-Negotiable)

When writing new code, follow these rules:

1. **`verbatimModuleSyntax: true`** — type-only imports MUST use `import type { X }` syntax. Build breaks on bare type imports.
2. **No path aliases** — all imports use relative paths from the importing file.
3. **`data-testid` on all interactive elements** — Playwright tests depend on these. Format: `{{module-key}}-{{role}}` in kebab-case.
4. **Scenario pattern on all data pages** — every page that displays data must support `loaded | loading | empty | error` states with a scenario selector dropdown (`data-testid="{{module-key}}-scenario-select"`).
5. **No CSS files** — use Ant Design components and inline `style={{}}` only.
6. **No state management library** — use React `useState` / `useReducer` for page-local state. Add a library only when there is a demonstrated need (prop drilling deeper than 3 levels, shared state across unrelated routes).
7. **Mock data exports two variants** — `{{entities}}` (loaded) and `empty{{Entities}}` (empty), both as `const` arrays matching the same `{{Entity}}Item[]` type.
8. **One page component = one route** — each `path` in router gets exactly one page component. Do not reuse the same page component across multiple routes.

---

## Appendix D: Common Migration Scenarios

### Adding module-level state without a state library

If two pages within the same module need to share state (e.g., create form → list refresh), use URL state or lift state to `ModuleLayout`-level context:

```tsx
// src/domains/{{MODULE_KEY}}/context/{{ModuleKey}}Context.tsx
import { createContext, useContext, useState, type ReactNode } from 'react'

interface {{ModuleKey}}ContextValue {
  refreshTrigger: number
  triggerRefresh: () => void
}

const {{ModuleKey}}Context = createContext<{{ModuleKey}}ContextValue | null>(null)

export function {{ModuleKey}}Provider({ children }: { children: ReactNode }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  return (
    <{{ModuleKey}}Context.Provider value={{
      refreshTrigger,
      triggerRefresh: () => setRefreshTrigger(n => n + 1),
    }}>
      {children}
    </{{ModuleKey}}Context.Provider>
  )
}

export function use{{ModuleKey}}Context() {
  const ctx = useContext({{ModuleKey}}Context)
  if (!ctx) throw new Error('use{{ModuleKey}}Context must be used within {{ModuleKey}}Provider')
  return ctx
}
```

### Replacing scenario selectors with real data fetching

When connecting to a real backend:

1. Replace `Scenario` type with `QueryStatus`: `'idle' | 'pending' | 'success' | 'error'`
2. Replace `scenario` state with data-fetching hook (e.g., `useQuery` from React Query)
3. Map: `loading` → `isPending`, `loaded` → `isSuccess && data.length > 0`, `empty` → `isSuccess && data.length === 0`, `error` → `isError`
4. Remove the scenario selector `<Select>` from the rendered output
5. Keep the skeleton, error, and empty JSX branches — they now render based on query status instead of manual toggle

### Adding a module without top tabs

If a module has only one page, it still works with `ModuleLayout`:

```tsx
// moduleConfig.tsx
newModule: {
  key: 'newModule',
  label: 'Single Page Module',
  icon: <AppstoreOutlined />,
  defaultRoute: '/newModule/view',
  tabs: [
    { key: '/newModule/view', label: 'Overview' },  // single tab
  ],
  sidebarMenu: [],  // empty sidebar
}
```

The sidebar will render empty (no `Sider` visible since `SidebarNavigation` receives an empty array).

### Handling non-list pages (forms, editors)

Non-list pages do not need the scenario pattern. Example for a create form page:

```tsx
import { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router'

export function {{Entity}}CreatePage() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (values: Record<string, unknown>) => {
    setSubmitting(true)
    // API call here
    message.success('{{Entity}} created successfully')
    navigate('/{{module-key}}/list')
  }

  return (
    <div data-testid="{{module-key}}-create-page">
      <Form onFinish={handleSubmit} layout="vertical">
        {/* form fields */}
        <Button type="primary" htmlType="submit" loading={submitting}
                data-testid="{{module-key}}-create-submit">
          Create
        </Button>
      </Form>
    </div>
  )
}
```
