# Brainstorm: Enhance Settings

Status: Complete

## Context

The Settings module (`/settings/*`) currently has PlaceholderPage for all routes. Need to build out user management, permissions, system params, and operation logs pages.

## Target Routes

- `/settings/users` — User management with table
- `/settings/permissions` — Permission tree configuration
- `/settings/params` — System parameters form
- `/settings/logs` — Operation logs table

## UI Patterns

### User Management Page
- Table with username, email, role, status, actions
- Add user modal with form
- Enable/disable user toggle
- Role selector (admin/user/viewer)
- Scenario selector

### Permissions Page
- Tree structure showing permission hierarchy
- Role-based permission matrix (checkboxes)
- Save/reset buttons
- Scenario selector

### System Params Page
- Form sections for different config groups
- Input fields, selects, toggles for various params
- Save/reset buttons
- Scenario selector

### Operation Logs Page
- Table with timestamp, user, action, resource, status, IP
- Date range filter
- Action type filter
- Export button
- Scenario selector
