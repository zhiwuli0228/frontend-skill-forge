# MCP Exploration Session: /workflow/editor

Session ID: `2026-06-07-V6-workflow-editor-exploration`
Target: `/workflow/editor`
Goal: Real Playwright MCP exploration of workflow editor — capture node palette, visual graph, node selection, property editing
Operator: agent (claude-code)
Timestamp: 2026-06-07T11:39:05Z
Commit: 55083b1 (V5 Benchmark Demo Expansion)
Status: completed

## Exploration Method

Real Playwright MCP browser tools.
Tools used: `browser_navigate`, `browser_snapshot`, `browser_take_screenshot`, `browser_click`, `browser_console_messages`.

## Page Load

- Route: `/workflow/editor`
- Module: Workflow
- Page title: "frontend-skill-forge"
- Console errors: 2 (same AntD deprecation warnings as skill list)
- Page structure: banner → tablist (4 tabs) → sidebar (4 status items) → main content (palette + canvas + toolbar)

## UI Components Discovered

| # | Component | Location | Selector | Stability |
|---|-----------|----------|----------|-----------|
| 1 | EditorToolbar | Header | Save/Run buttons | High |
| 2 | ScenarioSelector | Below toolbar | Scenario combobox | High |
| 3 | NodePalette | Left panel | 4 node type items | High |
| 4 | WorkflowCanvas | Center panel | SVG/canvas with node graph | High |
| 5 | WorkflowNode | Canvas | Clickable node cards with type + label | High |
| 6 | NodePropertiesDialog | Overlay | `dialog "Node Properties"` | High |

## Interactive Elements

| # | Element | Action | Result | Selector |
|---|---------|--------|--------|----------|
| 1 | Save button | Available | Saves workflow | `button "save Save"` |
| 2 | Run button | Available | Runs workflow | `button "play-circle Run"` |
| 3 | Node (Webhook Trigger) | Click | Opens NodePropertiesDialog | `cursor=pointer` on node |
| 4 | Palette item (Trigger) | Available | Adds new trigger node | `cursor=pointer` on palette item |
| 5 | Delete Node button | Available | Removes selected node | `button "delete Delete Node"` |

## Route Snapshots

### Loaded State
- **Node Palette** (left): 4 node types — Trigger, Process, Condition, Output
- **Workflow Canvas** (center): Visual node graph with 6 nodes:
  - n1: TRIGGER — Webhook Trigger
  - n2: PROCESS — Validate Payload
  - n3: CONDITION — Is Valid?
  - n4: PROCESS — Transform Data
  - n5: OUTPUT — Send to Queue
  - n6: OUTPUT — Log Error
- **Toolbar** (top-right): Save + Run buttons
- **Sidebar** (left): All, Active, Inactive, Draft filter items

### Node Properties Dialog
- Opens on node click
- Title: "Node Properties"
- Fields:
  - Node ID: `n1` (disabled input)
  - Type: Trigger (combobox)
  - Label: "Webhook Trigger" (editable text input)
  - X Position: 50 (spinbutton)
  - Y Position: 200 (spinbutton)
- Delete Node button at bottom

## Selector Candidates

| Selector | Type | Stability | Notes |
|----------|------|-----------|-------|
| `button "save Save"` | ARIA label | High | Unique save button |
| `button "play-circle Run"` | ARIA label | High | Unique run button |
| `dialog "Node Properties"` | ARIA role + title | High | Modal dialog |
| `textbox` for Label | ARIA role | Medium | Multiple textboxes in dialog |
| `spinbutton` for position | ARIA role | Medium | Multiple spinbuttons |
| `button "delete Delete Node"` | ARIA label | High | Unique delete button |
| Node card (TRIGGER label) | HTML structure | Medium | Needs type+label combination |

## Issues Found

1. **AntD deprecation**: Same `Button.Group` and `Drawer.width` warnings
2. **Canvas rendering**: Node positions extend beyond visible viewport (nodes at x=1137, 1339 are off-screen to the right)
3. **No data-testid on nodes**: Node cards lack dedicated test attributes

## Evidence Captured

| Type | File |
|------|------|
| Screenshot: Loaded state | `workflow-editor-loaded.png` |
| Screenshot: Node selected | `workflow-editor-node-selected.png` |
| Snapshot: Loaded | `.playwright-mcp/page-2026-06-07T11-39-05-182Z.yml` |
| Snapshot: Node properties | `.playwright-mcp/page-2026-06-07T11-39-27-065Z.yml` |

## Comparison with V3

No V3 fallback session exists for `/workflow/editor`. This is the first exploration of this route.

## Next Actions

- Selector stability evaluation across all 3 routes
- Drift diagnosis comparing V6 real evidence vs V3 fallback
- Knowledge map updates
