# Frontend E2E Explorer — References

Supplementary material for `frontend-e2e-explorer`. Load only when needed.

## Recommended Reference Files

- `element-extraction-script.md` — browser_evaluate script for BrowserElement[] capture
- Add project-specific templates as needed

## Minimum Context Path

For single-route exploration, start with:
1. Target route
2. Relevant `route-map.md` entry
3. Relevant `component-map.md` entry
4. One latest route-level validation or evidence record
5. Selector stability guide

Do not load all frontend maps or all historical evidence unless the route documentation is stale or contradictory.

## Validation Examples

### Example 1: /task/list/all

**Input:** Route target `/task/list/all`, e2e artifacts as fallback

**Expected output:**
- 1 MCP session record
- 4 route snapshots (loaded/loading/empty/error)
- 4 component discoveries (TaskTable, TaskFilterBar, TaskDetailDrawer, scenario selector)
- 3 interaction traces (row click, scenario empty, error retry)
- 1 evidence index

### Example 2: /skill/list/text (new route)

**Input:** Route target `/skill/list/text`, no existing evidence

**Expected output:**
- 4 route snapshots (loaded/loading/empty/error for the "text" category filter)
- 3 component discoveries (SkillGrid, SkillCard, SkillFilterBar)
- 2 interaction traces (card click → modal, category filter change)
- 1 evidence index

## Known Limitations

1. **MCP fallback.** If MCP browser tools are not available, the Skill derives evidence from e2e test artifacts. This produces valid but less authoritative evidence. Always document the source.
2. **Scenario selector required.** This Skill assumes every page has the 4-state scenario selector. Pages without it (LoginPage, DashboardPage) require manual exploration.
3. **No screenshot capture.** The Skill documents DOM structure and behavior, not visual appearance. For visual evidence, use MCP screenshot tools.
4. **Single-route scope.** This Skill explores one route at a time. For multi-route exploration, run the Skill multiple times.

## Output Destinations

| Output | Destination |
|--------|-------------|
| MCP session record | `docs/08-frontend-agent/mcp/sessions/` |
| Route snapshots (4) | `docs/08-frontend-agent/evidence/route-snapshots/` |
| Component discoveries (3–5) | `docs/08-frontend-agent/evidence/component-discoveries/` |
| Interaction traces (2–3) | `docs/08-frontend-agent/evidence/interaction-traces/` |
| Evidence index | `docs/08-frontend-agent/evidence/evidence-index/` |
| Structured element snapshot (JSON) | `artifacts/browser-snapshots/<route-slug>.json` |

## Cross-References

- **Related Skill:** `frontend-project-reader` — for understanding the codebase before exploring
- **Related Skill:** `frontend-registry-stitch` — consumes browser snapshots from Step 3.5 to produce element registry
- **Related Skill:** `skill-evolution-maintainer` — for evolving skills from the evidence
