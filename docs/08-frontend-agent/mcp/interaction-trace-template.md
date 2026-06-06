# Interaction Trace Template

Status: Draft

## Purpose

Template for recording user interaction sequences.

## Template

```markdown
# Interaction Trace

## Trace Info

- **Trace ID:** {traceId}
- **Route:** {route}
- **Timestamp:** {ISO-8601}
- **Goal:** {interaction goal}

## Interaction Sequence

| Step | Action | Target | Selector | Result | Duration |
|------|--------|--------|----------|--------|----------|
| 1 | {click/type/hover} | {element} | {selector} | {success/error} | {ms} |

## State Changes

| Step | Before | After |
|------|--------|-------|
| 1 | {state} | {state} |

## Network Activity

| Step | Request | Status | Duration |
|------|---------|--------|----------|
| 1 | {url} | {status} | {ms} |

## Console Output

| Step | Level | Message |
|------|-------|---------|
| 1 | {error/warn/info} | {message} |

## Errors

- {error description}

## Observations

- {observation}

## Selector Stability

| Element | Selector | Worked | Notes |
|---------|----------|--------|-------|
| {name} | {selector} | {yes/no} | {notes} |
```
