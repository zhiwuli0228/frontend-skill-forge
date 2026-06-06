# MCP Exploration Session Template

Status: Draft

## Purpose

Template for recording MCP exploration sessions.

## Template

```markdown
# MCP Exploration Session

## Session Info

- **Session ID:** {sessionId}
- **Date:** {YYYY-MM-DD}
- **Time:** {HH:MM:SS}
- **Operator:** {agent/human}
- **Goal:** {exploration goal}

## Target

- **Route:** {route}
- **URL:** {url}
- **Expected Behavior:** {description}

## Observations

### Page Load

- **Load Time:** {ms}
- **Status:** {success/error}
- **Console Errors:** {list}

### UI Components

| Component | Selector | Status | Notes |
|-----------|----------|--------|-------|
| {name} | {selector} | {visible/hidden} | {notes} |

### Interactive Elements

| Element | Type | Selector | Action | Result |
|---------|------|----------|--------|--------|
| {name} | {type} | {selector} | {action} | {result} |

## Evidence Captured

| Type | Path | Description |
|------|------|-------------|
| screenshot | {path} | {description} |
| snapshot | {path} | {description} |
| trace | {path} | {description} |

## Selector Candidates

| Element | Primary Selector | Fallback | Stability |
|---------|-----------------|----------|-----------|
| {name} | {selector} | {fallback} | {high/medium/low} |

## Issues Found

- {issue description}

## Evolution Candidates

- {candidate description}

## Next Actions

- [ ] {action item}
```
