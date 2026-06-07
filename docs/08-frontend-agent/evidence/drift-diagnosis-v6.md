# Drift Diagnosis — V6 Real MCP vs V3 Fallback

Date: 2026-06-07
Session: V6 MCP-Assisted Exploration
Comparison: V6 real Playwright MCP evidence vs V3 fallback (2026-06-07-V3-task-list-exploration)
Routes compared: `/task/list` (only route with V3 fallback data)

## Summary

The V3 fallback session derived evidence from e2e test artifacts and source code reading. The V6 session used real Playwright MCP browser tools. This diagnosis identifies where the V3 fallback was accurate, where it was incomplete, and where it diverged from reality.

## Findings

### Accurate in V3 Fallback

| Aspect | V3 Documented | V6 Observed | Match? |
|--------|--------------|-------------|--------|
| Page structure (banner + tabs + sidebar + content) | Yes | Yes | ✅ |
| 4 scenario states (Loaded/Loading/Empty/Error) | Yes | Yes (all 4 in dropdown) | ✅ |
| Sidebar filters (All/Open/In Progress/Completed/Archived) | Yes | Yes | ✅ |
| Table columns (Title, Status, Priority, Assignee, Category, Created) | Yes | Yes | ✅ |
| Row click opens drawer | Yes | Yes | ✅ |
| Drawer shows task details | Yes | Yes | ✅ |
| Pagination present | Yes | Yes (2 pages, 5/page) | ✅ |
| Scenario selector uses `data-testid` | Yes | Yes (`task-scenario-select`) | ✅ |

### Incomplete in V3 Fallback

| Aspect | V3 Status | V6 Finding | Gap |
|--------|-----------|------------|-----|
| Console errors | Not captured | 1 AntD deprecation (Button.Group) | V3 missed runtime warnings |
| Screenshots | Not available | 3 screenshots captured | V3 had no visual evidence |
| Empty state visual | Described from code | "No data" image + message observed | V3 lacked visual confirmation |
| Pagination details | Not documented | "Total 10 tasks", 2 pages, 5/page, Go-to input | V3 missed pagination specifics |
| Filter bar details | General description | Status/Priority/Category comboboxes with "All" defaults | V3 lacked filter field specifics |
| Sort indicators | Not documented | Sort icons present on Title, Priority, Created columns | V3 missed sort capability |

### Diverged from V3

No significant divergences found. The V3 fallback accurately represented the page structure and interactions. The primary gap was in detail richness, not accuracy.

## Routes Without V3 Comparison

The following routes have V6 real MCP sessions but no V3 fallback to compare:

| Route | V3 Session | V6 Session |
|-------|-----------|------------|
| `/skill/list` | None | ✅ 2026-06-07-V6-skill-list-exploration |
| `/workflow/editor` | None | ✅ 2026-06-07-V6-workflow-editor-exploration |

These routes are first-time explorations — no drift to diagnose, but they establish the baseline for future comparisons.

## Key Learnings

1. **V3 fallback was structurally accurate** — source code reading and e2e test analysis correctly represented the page layout and interactions
2. **V3 fallback lacked runtime evidence** — console errors, visual state, and dynamic behavior (pagination counts, filter defaults) were missing
3. **Real MCP adds authoritative confidence** — screenshots and live DOM snapshots provide verifiable evidence that code reading cannot
4. **V3 fallback missed interaction details** — the exact drawer dimensions (480px), pagination parameters, and filter default values were only captured through real browser interaction
5. **Selector stability assessment requires live DOM** — V3 could only estimate selector stability from source; V6 verified selectors against the actual rendered DOM

## Recommendation

Future evidence sessions should always prefer real MCP when available. The V3 fallback approach remains valid as a secondary method when MCP tools are unavailable, but it should be explicitly marked as "derived" evidence with lower confidence.
