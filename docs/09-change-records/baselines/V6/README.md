# V6 Baseline

Status: Active

## Purpose

V6 is the **MCP-Assisted Exploration** major version. It integrates practical Playwright MCP exploration workflow with real browser evidence, replacing the V3 fallback approach that derived evidence from e2e test artifacts.

## Main Outputs

| Type | File |
| --- | --- |
| V6 IR/SR bundle | [V6-IR-SR-PLANNING-BUNDLE.md](./V6-IR-SR-PLANNING-BUNDLE.md) |
| V6 release record | [../../releases/V6.md](../../releases/V6.md) |
| V6 aggregate summary | [../../summaries/V6-AGGREGATE-SUMMARY.md](../../summaries/V6-AGGREGATE-SUMMARY.md) |
| Decision ledger (V6 entries) | [../../current/DECISIONS.md](../../current/DECISIONS.md) |
| Phase 6 verification | [../../../07-evidence/phase-6-mcp-exploration-verification.md](../../../07-evidence/phase-6-mcp-exploration-verification.md) |

## V6 Exit Gate

- [x] At least 3 real MCP exploration sessions completed
- [x] Browser evidence captured (snapshots, screenshots, interaction traces)
- [x] Selector stability evaluation produced for each explored route
- [x] Drift diagnosis examples comparing real MCP vs V3 fallback evidence
- [x] Knowledge maps updated with MCP-sourced findings
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] `npm run test:e2e` passes
- [x] V6 governance artifacts complete
- [x] User accepts V6 as complete
