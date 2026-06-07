# Tasks: Enhance Settings

Status: Complete

## Task List

### 1. Mock Data

- [x] 1.1 Create `src/domains/settings/data/settings-mock-data.ts` with UserItem, PermissionNode, SystemParam, LogEntry interfaces and mock data

### 2. Users Page

- [x] 2.1 Create `src/domains/settings/pages/SettingsUsersPage.tsx` with users table + add user modal
- [x] 2.2 Implement scenario selector and states

### 3. Permissions Page

- [x] 3.1 Create `src/domains/settings/pages/SettingsPermissionsPage.tsx` with permission tree
- [x] 3.2 Implement scenario selector and states

### 4. Params Page

- [x] 4.1 Create `src/domains/settings/pages/SettingsParamsPage.tsx` with system params form
- [x] 4.2 Implement scenario selector and states

### 5. Logs Page

- [x] 5.1 Create `src/domains/settings/pages/SettingsLogsPage.tsx` with logs table
- [x] 5.2 Implement scenario selector and states

### 6. Router Update

- [x] 6.1 Update router: replace PlaceholderPage for `/settings/permissions`
- [x] 6.2 Update router: replace PlaceholderPage for `/settings/params`
- [x] 6.3 Update router: replace PlaceholderPage for `/settings/logs`

### 7. E2E Tests

- [x] 7.1 Create `tests/e2e/settings-users-runtime.spec.ts`
- [x] 7.2 Create `tests/e2e/settings-permissions-runtime.spec.ts`
- [x] 7.3 Create `tests/e2e/settings-params-runtime.spec.ts`
- [x] 7.4 Create `tests/e2e/settings-logs-runtime.spec.ts`

### 8. Quality Gates

- [x] 8.1 Run `npm run lint`
- [x] 8.2 Run `npm run build`
- [x] 8.3 Run `npm run test:e2e`
