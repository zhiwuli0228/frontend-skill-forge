# Compact Page State Summary

Use this compact format after every Playwright MCP browser snapshot.

Do not paste raw DOM or full snapshot.

```md
# Page State Summary

## Goal

- Current UI goal:

## Location

- URL:
- Route:
- Page:
- Timestamp:

## App State

- Login:
- Loading:
- Empty:
- Permission:
- Error:

## Visible Regions

| Region | Purpose | Key Visible Elements |
|---|---|---|

## Available Actions

| Action | Element | Preconditions | Expected Result |
|---|---|---|---|

## Disabled Controls

| Control | Likely Reason | Required Condition |
|---|---|---|

## Temporary Refs

Refs are valid only for the current snapshot.

| Element | Ref | Use Once For |
|---|---|---|

## Evidence

- Screenshot:
- Snapshot:
- Trace:
- Console:
- Network:

## Next Safe Action

-
```

## Minimal JSON Shape

```json
{
  "goal": "",
  "location": {
    "url": "",
    "route": "",
    "page": "",
    "timestamp": ""
  },
  "appState": {
    "login": "",
    "loading": "",
    "empty": "",
    "permission": "",
    "error": ""
  },
  "visibleRegions": [],
  "availableActions": [],
  "disabledControls": [],
  "temporaryRefs": [],
  "evidence": {
    "screenshot": "",
    "snapshot": "",
    "trace": "",
    "console": "",
    "network": ""
  },
  "nextSafeAction": ""
}
```
