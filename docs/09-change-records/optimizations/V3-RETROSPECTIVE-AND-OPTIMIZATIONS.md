# V3 Retrospective and Optimizations

Date: 2026-06-07

## What Went Well

### 1. IR/SR bundle as a forcing function

Writing ONE planning document (the V3 IR/SR bundle) for the whole major version, then dispatching V3.1-V3.5 with a reduced gate set, was much less overhead than 5 separate IR/SR documents. The bundle captured the WHY (IR) and WHAT (SR) once; each minor version just needed a brief "proposal → tasks → impl → verify → release" cycle.

This is a refinement of the V2 pattern (D028-D030). V3 confirmed it scales.

### 2. Knowledge maps as a side-effect of writing

The 5 knowledge maps would have been useful even without the rest of V3. They are now the **single source of truth** for the V2 surface — any future agent can read them and understand the project without re-discovering it. The ~3000 lines of knowledge-map content is reusable indefinitely.

### 3. The V2.10 sidebar hotfix as a seed case

The V2.10 hotfix was already a known failure. V3.4 turned it into a formal failure-diagnosis record + 5 rule candidates + 1 knowledge candidate. This is a great example of "evidence carries forward" — the bug was a tax in V2, but a benefit in V3 because it produced concrete artifacts.

### 4. Scenario selector as a test pattern

Every page's 4-scenario selector means every page has 4× the test coverage. The 181 existing tests cover ~92 cases × 4 states = 368 state observations. This is a force multiplier that V2.6-V2.10 established and V3.3 evidence confirmed.

### 5. The e2e-artifacts fallback for MCP

When real Playwright MCP wasn't available, falling back to e2e test artifacts as the evidence source was a clean B-plan. The 181 passing tests provided deterministic, reproducible behavioral snapshots without needing a live browser. The approach is documented as a known limitation that V4 will address.

## What Didn't Go Well

### 1. Drift-demo spec was almost a test failure

The original `drift-diagnosis-demo.spec.ts` had an actively-running negative-control test that would have failed the suite. I caught it before running tests, but only because I noticed the design. A future agent writing a similar demo might not catch this.

**Lesson**: When writing a "demonstrate the failure pattern" spec, default to `test.fixme()` or `test.skip()`. The body documents the pattern; the suite stays green.

### 2. The "fallback to e2e artifacts" produces fake-looking evidence

The 12 evidence records are derived from e2e tests, not from a real browser session. They look like evidence but they are really "what the e2e tests verified." A future V4 re-run with real MCP might find discrepancies.

**Lesson**: Always document the evidence source explicitly. "Derived from e2e artifacts" is honest; "captured during MCP session" would be misleading.

### 3. V3 looks like "no real work happened"

V3 produced ~3500 lines of documentation and ~50 lines of code. To a casual observer, that's "mostly docs." The counter-argument is: the docs ARE the work. Without them, V4 (Skill v1) would have to re-discover the V2 surface.

**Lesson**: Communicate the value of documentation explicitly in retrospectives. Cite concrete use cases (e.g., "V4 will use these maps to train the project-reader skill").

### 4. The V2.10 hotfix retro-diagnosis is awkward

The V2.10 hotfix was already fixed when V3.4 started. Documenting it as a failure-diagnosis record is a bit like writing an incident report after the incident is over. The record is useful for future agents, but the "drift was caught" energy is missing.

**Lesson**: Better to discover drift in real-time and document as it happens. V3.4's approach works as a one-off but doesn't scale — for V4+, set up a "drift log" that records issues as they occur, not retroactively.

## Specific Patterns Worth Preserving

1. **IR/SR bundle per major version** (D028-D030) — confirmed it scales to V3's 5 minor versions
2. **Reduced gate set per minor version** — V3.1 had full 19-artifact chain; V3.2-V3.5 had 7-artifact chain
3. **Knowledge maps as canonical reference** — better than README sections because they're indexable and easy to find
4. **Failure-diagnosis as an evolution driver** — the V2.10 hotfix produced 5 rules + 1 knowledge from one failure
5. **Scenario selector** — V2.6-V2.10 pattern that V3.3 evidence validated

## Process Improvements to Try in V4

1. **Re-run V3.3 with real MCP.** Compare derived evidence vs real evidence to validate the fallback approach.
2. **Multi-route evidence.** V3.3 only covered `/task/list`. V4 should run similar sessions for at least 2 more routes (e.g., `/skill/list` and `/insight/overview`) to confirm patterns are project-wide.
3. **Real-time drift log.** When the next drift is discovered (it will happen), record it as it occurs, not retroactively.
4. **Rule enforcement.** Currently rules are documented in queues but not enforced. V4 could add a custom ESLint rule that catches `path` duplicates in moduleConfig.
5. **Knowledge map auto-update.** When the V2 surface changes, the maps should be updated. Currently this is manual. A future V5+ could add a script that generates a route-map.md from router.tsx.

## Open Items Deferred to V4/V5

| Item | Deferred To | Reason |
| --- | --- | --- |
| Real MCP browser tool integration | V4 | V3 fell back to e2e artifacts; V4 will re-run with real MCP |
| Skill v1 implementation | V4 | V3 produced the evidence V4 needs to validate the skill |
| AntD 6→7 deprecation migration | V5 | Not the focus of V3 |
| Code splitting | V5 | Not the focus of V3 |
| Multi-route evidence | V4 | V3.3 only covered 1 route |
| Test design for the 2.3MB bundle warning | V5 | Not the focus of V3 |

## Final Stats

- **Time on V3**: ~1 session of work
- **New files**: ~25 (5 knowledge maps + 2 e2e registry + 1 mcp session + 4 route snapshots + 4 component discoveries + 3 interaction traces + 1 evidence index + 1 failure diagnosis + 3 evolution queue updates + 1 issue ledger + V3 governance)
- **New e2e tests**: 1 new spec, 2 passing + 1 fixme-skipped
- **Knowledge maps**: 5 stubs → 5 full reference docs (~3000 lines)
- **E2E registry**: 0 → 25 entries
- **Evidence records**: 0 → 12
- **Evolution candidates**: 0 → 4 knowledge + 5 rule + 0 skill (1 skill deferred to V4)

V3 is a **force-multiplier version**: the artifacts it produced will be reused by V4 and V5, so the ROI compounds. The 181 existing tests don't need to change. The V2 surface doesn't need to change. V3 just adds a layer on top.
