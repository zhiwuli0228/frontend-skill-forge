# V6 IR/SR Planning Bundle

## Intent Record (IR)

### Version Identity

- Version: V6
- Title: MCP-Assisted Exploration
- Phase: Architecture Blueprint Phase 6
- Status: Active

### Purpose

V3 produced the project's first MCP session record, but it used a fallback approach — evidence was derived from e2e test artifacts and page source reading, not from real browser interaction. V6 replaces this with real Playwright MCP browser exploration, establishing the project's first authoritative UI evidence.

### Motivation

The V3 fallback approach has a known limitation documented as V3-ISS-001: "MCP browser tool fallback (workaround applied; V4 will re-run with real MCP)." The Skills (particularly `frontend-e2e-explorer`) reference MCP browser tools as their primary exploration method. Without real MCP sessions, the Skills' validation examples are synthetic.

### Scope

In scope:
- Real Playwright MCP exploration sessions on 3+ routes
- Browser snapshot and screenshot evidence capture
- DOM inspection and interaction trace recording
- Selector stability evaluation with real browser data
- Drift diagnosis comparing real MCP evidence vs V3 fallback
- Knowledge map updates from MCP-sourced findings
- E2E registry cross-reference with MCP observations

Out of scope:
- New frontend pages or features (V5 scope)
- Self-evolution validation (Phase 7 scope)
- AntD migration or bundle optimization (deferred from V5)
- Real backend integration
- New Skill or Rule creation

### Risk

1. MCP browser tools may not be available in all execution environments — mitigation: document fallback protocol clearly
2. Selector stability may differ between e2e test context and live browser — mitigation: explicit comparison in drift diagnosis
3. Session records may become stale as pages evolve — mitigation: link sessions to commit hashes

### Success Criteria

1. At least 3 routes explored with real Playwright MCP tools
2. Each session produces: snapshot, screenshot, interaction trace, selector candidates
3. Drift diagnosis document comparing V3 fallback vs V6 real evidence
4. Knowledge maps updated with MCP-sourced corrections or additions
5. `frontend-e2e-explorer` skill re-validated with real MCP evidence

---

## Sub-Requirement Record (SR)

### SR-1: Real MCP Session Protocol

Establish a repeatable protocol for running Playwright MCP exploration sessions using the project's allowed browser tools (`browser_snapshot`, `browser_navigate`, `browser_click`, `browser_type`, `browser_take_screenshot`, `browser_console_messages`, `browser_network_requests`, `browser_wait_for`).

Output: MCP session records in `docs/08-frontend-agent/mcp/sessions/` following the existing schema and template.

### SR-2: Multi-Route Evidence Collection

Run the exploration protocol on at least 3 routes covering different interaction patterns:
- `/task/list` — table with filters, batch operations, pagination
- `/skill/list` — card grid with tags, search, sort
- `/workflow/editor` — visual node editor with drag-and-drop

Each route produces: 1 session record, 1+ screenshots, 4 route snapshots, 3-5 component discoveries, 2-3 interaction traces, 1 evidence index.

### SR-3: Selector Stability Evaluation

For each explored route, evaluate selector stability using real browser DOM inspection:
- Rate each selector as High/Medium/Low per `selector-stability-guide.md`
- Compare with V3 fallback selector candidates
- Document any selectors that changed or are missing in the live DOM

### SR-4: Drift Diagnosis

Compare V6 real MCP evidence against V3 fallback evidence:
- Identify components that changed, moved, or were removed
- Identify new components not present in V3 evidence
- Identify selector drift (testids renamed, structure changed)
- Produce a drift diagnosis document as a reusable example

### SR-5: Knowledge Map Updates

Update `docs/02-harness/knowledge/frontend/` maps with MCP-sourced findings:
- `route-map.md` — verify all routes are reachable and document any routing changes
- `component-map.md` — update component trees with real DOM evidence
- `state-flow-map.md` — verify state transitions with interaction traces

### SR-6: Skill Re-validation

Re-run the `frontend-e2e-explorer` skill procedure with real MCP tools on one route. Compare the output with the V3 validation example. Document improvements in evidence quality and completeness.

### V6 Minor Version Sequence

| Minor | Scope |
| --- | --- |
| V6.1 | MCP session protocol + first real session on `/task/list` |
| V6.2 | Sessions on `/skill/list` and `/workflow/editor` |
| V6.3 | Selector stability evaluation + drift diagnosis |
| V6.4 | Knowledge map updates + skill re-validation + verification report |
