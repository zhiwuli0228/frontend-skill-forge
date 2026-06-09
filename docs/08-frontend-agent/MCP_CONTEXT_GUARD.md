# MCP Context Guard

This file is the mandatory short execution guard for Playwright MCP operations.

Use it before any browser-driven frontend exploration, E2E verification, UI debugging, or page-state inspection.

## Core Rule

Raw Playwright MCP output is evidence, not working context.

The working context must be a compact Page State Summary.

## Required Behavior

Before using Playwright MCP:

1. State the exact UI goal.
2. State why MCP is required.
3. State expected evidence.
4. Avoid free exploration.

After every browser snapshot:

1. Do not keep the raw snapshot in the conversation.
2. Convert it into Page State Summary.
3. Record raw evidence path if available.
4. Identify temporary refs for the next immediate action only.
5. Decide the next safe action.
6. Do not snapshot again unless page state changed.

## Forbidden Behavior

Do not:

- Paste raw DOM.
- Paste full accessibility tree.
- Paste full browser snapshot.
- Paste full console/network/trace output.
- Perform snapshot after every click.
- Reuse old refs after a new snapshot.
- Explore the whole page when the target action is already visible.
- Ask the model to remember all previous snapshots.

## Temporary Ref Rule

Playwright element refs are valid only for the current snapshot.

Allowed:

```text
Use ref=e123 only for the next click in the current snapshot.
```

Forbidden:

```text
Use ref=e123 as the stable selector for this button.
```

## Semantic Anchor Priority

For long-term mapping, use this order:

1. route
2. page name
3. region
4. role
5. accessible name
6. label
7. visible text
8. data-testid
9. stable CSS selector
10. XPath only as last resort

## Context Budget Rule

If the raw output is large, immediately compress it into:

- URL
- route
- page name
- login state
- visible regions
- available actions
- disabled controls
- temporary refs
- next safe action
- evidence path
