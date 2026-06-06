# UI State Snapshot Template

Status: Draft

## Purpose

Template for capturing UI state at a specific moment.

## Template

```markdown
# UI State Snapshot

## Snapshot Info

- **Snapshot ID:** {snapshotId}
- **Route:** {route}
- **Timestamp:** {ISO-8601}
- **Trigger:** {what triggered snapshot}

## Page State

- **URL:** {url}
- **Title:** {title}
- **Load State:** {loading/loaded/error}

## Visible Components

| Component | State | Selector |
|-----------|-------|----------|
| {name} | {state} | {selector} |

## Form State

| Field | Value | Selector |
|-------|-------|----------|
| {name} | {value} | {selector} |

## Modal/Dialog State

- **Active:** {yes/no}
- **Title:** {title}
- **Content:** {summary}

## Toast/Notification State

| Message | Type | Duration |
|---------|------|----------|
| {message} | {success/error/info} | {duration} |

## Network State

- **Pending Requests:** {count}
- **Last Error:** {error}

## Console State

- **Errors:** {count}
- **Warnings:** {count}

## Artifacts

| Type | Path |
|------|------|
| screenshot | {path} |
| snapshot | {path} |
```
