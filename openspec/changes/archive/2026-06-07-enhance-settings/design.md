# Design: Enhance Settings

Status: Complete

## Components

### Mock Data (`settings-mock-data.ts`)
- `UserItem`: id, username, email, role, status, createdAt, lastLogin
- `PermissionNode`: key, title, children, description
- `SystemParam`: key, label, value, type, group, description
- `LogEntry`: id, timestamp, user, action, resource, status, ip

### Pages
1. `SettingsUsersPage` — Table + add modal + role/status management
2. `SettingsPermissionsPage` — Tree + role permission matrix
3. `SettingsParamsPage` — Grouped form with various input types
4. `SettingsLogsPage` — Filterable log table with export

### Patterns
- All pages use scenario selector (loaded/loading/empty/error)
- `data-testid` on all testable elements
- Ant Design Table, Tree, Form, Modal, Tag, Switch components
