# Page Observation Template

Status: Draft

## Purpose

Template for recording page-level observations during MCP exploration.

## Template

```markdown
# Page Observation

## Page Info

- **Route:** {route}
- **URL:** {url}
- **Title:** {page title}
- **Timestamp:** {ISO-8601}

## Structure

### Main Content

- **Heading:** {h1 text}
- **Sections:** {list of sections}
- **Navigation:** {nav elements}

### Layout

- **Type:** {grid/flex/other}
- **Responsive:** {yes/no}
- **Breakpoints:** {list}

## Components

| Component | Type | Location | Interactive |
|-----------|------|----------|-------------|
| {name} | {type} | {location} | {yes/no} |

## State

- **Loading State:** {visible/hidden}
- **Error State:** {visible/hidden}
- **Empty State:** {visible/hidden}

## Accessibility

- **ARIA Labels:** {present/missing}
- **Keyboard Navigation:** {working/broken}
- **Screen Reader:** {compatible/issues}

## Performance

- **Load Time:** {ms}
- **First Paint:** {ms}
- **Interactive:** {ms}

## Notes

- {observation notes}
```
