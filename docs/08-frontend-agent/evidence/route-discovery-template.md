# Route Discovery Template

Status: Draft

## Purpose

Template for recording discovered routes.

## Template

```markdown
# Route Discovery

## Route Info

- **Route:** {route}
- **URL Pattern:** {pattern}
- **Discovery Date:** {ISO-8601}
- **Discovery Method:** {mcp-exploration|manual|sitemap}

## Page Info

- **Title:** {page title}
- **Description:** {page description}
- **Authentication:** {required/optional/public}
- **Role:** {user role required}

## Components

| Component | Type | Location | Interactive |
|-----------|------|----------|-------------|
| {name} | {type} | {location} | {yes/no} |

## Key Elements

| Element | Purpose | Selector |
|---------|---------|----------|
| {name} | {purpose} | {selector} |

## E2E Asset Status

- **Smoke Test:** {exists/not-exists}
- **Regression Test:** {exists/not-exists}
- **Coverage:** {percentage}

## Evidence References

| Evidence ID | Type | Description |
|-------------|------|-------------|
| {id} | {type} | {description} |

## Notes

- {discovery notes}
```
