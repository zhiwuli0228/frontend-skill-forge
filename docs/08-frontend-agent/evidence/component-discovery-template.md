# Component Discovery Template

Status: Draft

## Purpose

Template for recording discovered UI components.

## Template

```markdown
# Component Discovery

## Component Info

- **Name:** {component name}
- **Type:** {button|input|modal|card|...}
- **Route:** {route}
- **Discovery Date:** {ISO-8601}

## Structure

### HTML Structure

```html
{html snippet}
```

### Props/Attributes

| Attribute | Value | Purpose |
|-----------|-------|---------|
| {name} | {value} | {purpose} |

## Behavior

### States

| State | Description | Visual |
|-------|-------------|--------|
| default | {description} | {description} |
| hover | {description} | {description} |
| active | {description} | {description} |
| disabled | {description} | {description} |

### Interactions

| Action | Trigger | Result |
|--------|---------|--------|
| {action} | {trigger} | {result} |

## Selectors

| Purpose | Selector | Stability |
|---------|----------|-----------|
| primary | {selector} | {high/medium/low} |
| fallback | {selector} | {high/medium/low} |

## Evidence References

| Evidence ID | Type | Description |
|-------------|------|-------------|
| {id} | {type} | {description} |

## Notes

- {component notes}
```
