# Playwright MCP Operation Protocol

This protocol defines how an Agent must use Playwright MCP without causing context bloat.

## 1. Before MCP

Before calling Playwright MCP, the Agent must state:

```md
## MCP Operation Plan

- UI goal:
- Current known page:
- Why MCP is needed:
- Expected evidence:
- Max snapshot count for this step:
```

Default max snapshot count for a single step: `1`.

Use more only when:

- navigation changed the page;
- modal/drawer opened;
- submit failed;
- async loading completed;
- unexpected error appeared.

## 2. During MCP

The Agent may use MCP to:

- navigate;
- inspect current visible state;
- click a target element;
- fill a form;
- collect screenshot or trace;
- diagnose failure.

The Agent must not use MCP to:

- scan the entire site;
- repeatedly inspect the same unchanged page;
- collect full DOM as memory;
- find unrelated components;
- replace source-code reading with UI guessing.

## 3. After browser_snapshot

The Agent must immediately output:

```md
## Snapshot Handling

- Raw snapshot retained in conversation: No
- Summary generated: Yes
- Temporary refs extracted:
- Evidence path:
- Next safe action:
```

Then output a Compact Page State Summary.

## 4. Ref Lifecycle

A ref can be used only for the next operation after the snapshot.

A ref becomes invalid after:

- new snapshot;
- navigation;
- refresh;
- modal/drawer open or close;
- tab switch;
- async page rerender;
- data reload.

## 5. Snapshot Frequency

Forbidden:

```text
snapshot -> click -> snapshot -> click -> snapshot -> click
```

Allowed:

```text
snapshot -> summary -> click using current ref -> confirm by visible result or one targeted snapshot if state changed
```

## 6. Evidence Storage

Large evidence must be stored under:

```text
artifacts/playwright/
├── screenshots/
├── snapshots/
├── traces/
├── console/
├── network/
└── raw/
```

Evidence naming:

```text
YYYYMMDD-HHMMSS_<page>_<action>_<type>.<ext>
```

Example:

```text
20260609-213000_skill-list_initial_snapshot.json
20260609-213012_skill-list_select-row_screenshot.png
20260609-213020_task-create_submit_trace.zip
```

## 7. Stop Condition

Stop MCP exploration when one of these is true:

- required action is identified;
- required blocker is identified;
- expected evidence is collected;
- next step requires source-code reading;
- context budget is at risk.

## 8. Failure Output

If blocked, return:

```md
# MCP Blocker

## Failure Code

One of:

- BLOCKED_BY_LOGIN_STATE
- BLOCKED_BY_DISABLED_CONTROL
- BLOCKED_BY_DYNAMIC_SELECTOR
- BLOCKED_BY_CONTEXT_BUDGET
- BLOCKED_BY_MISSING_PAGE_MAP
- BLOCKED_BY_UNCLEAR_UI_STATE
- BLOCKED_BY_UNEXPECTED_ROUTE

## What Was Tried

## Evidence

## Missing Information

## Next Safe Action
```
