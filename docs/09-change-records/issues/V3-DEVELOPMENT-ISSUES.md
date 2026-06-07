# V3 Development Issues

Date: 2026-06-07

This file captures all development issues encountered during V3. It complements the per-failure diagnosis records in `docs/08-frontend-agent/evidence/failure-diagnoses/`.

## Issue Index

| ID | Title | Severity | Status | Resolved In |
| --- | --- | --- | --- | --- |
| V3-ISS-001 | MCP browser tool not available in V3 session | medium | workaround applied | V3.3 (e2e artifacts fallback) |
| V3-ISS-002 | Drift-demo spec initially had active negative control that would fail | low | resolved at design time | V3.4 (refactored to test.fixme) |
| V3-ISS-003 | Knowledge maps risk becoming stale on next surface change | medium | accepted as known | (V4+ will require map updates) |
| V3-ISS-004 | Rules are documented but not enforced (no linter, no CI check) | medium | accepted as known | (V4+ could add ESLint rule) |
| V3-ISS-005 | AntD 6 deprecation warnings carried forward from V2 | low | deferred | (V5 AntD 6→7 migration) |
| V3-ISS-006 | Bundle size warning (2.3MB) not addressed | low | deferred | (V5 code splitting) |
| V3-ISS-007 | WorkflowListPage toggle/status interaction is awkward | low | accepted as known | (would need real refactor in V5+) |
| V3-ISS-008 | Settings module sidebar uses `key` as path (inconsistent) | low | accepted (works correctly) | (V4+ could normalize) |

## Issue Details

### V3-ISS-001: MCP browser tool not available

- **Description:** The current session's tooling does not include Playwright MCP browser tools. V3.3 was supposed to use real MCP to capture DOM snapshots, but instead fell back to deriving evidence from the existing 181 e2e test artifacts.
- **Workaround:** V3.3 session record explicitly documents the fallback. Evidence records cite e2e tests as their source.
- **Follow-up:** V4 will re-run the V3.3 session with real MCP if available. Compare derived evidence vs real evidence.
- **Severity:** medium (the evidence is still valid, just less authoritative than real MCP)

### V3-ISS-002: Drift-demo spec design issue

- **Description:** The first version of `drift-diagnosis-demo.spec.ts` had an actively-running negative-control test that would have failed the suite. Caught during code review before running tests.
- **Resolution:** Refactored to use `test.fixme()` for the negative control. The body of the fixme documents the pattern; the suite stays green.
- **Lesson:** When writing a "demonstrate the failure" spec, default to `test.fixme()` or `test.skip()`. Run only positive controls.
- **Severity:** low (caught at design time, no production impact)

### V3-ISS-003: Knowledge maps risk becoming stale

- **Description:** The 5 knowledge maps document the V2 surface as of 2026-06-07. Any future change to `src/app/router.tsx`, `src/shell/config/moduleConfig.tsx`, or any domain page would make parts of the maps stale.
- **Mitigation:** V3.5 retro: "any future V* change must update the relevant knowledge map section." V4+ enforces this as a manual rule.
- **Future improvement:** A script that auto-generates `route-map.md` from `router.tsx` and `moduleConfig.tsx` (V5 territory).
- **Severity:** medium (high likelihood, high impact if stale)

### V3-ISS-004: Rules are documented but not enforced

- **Description:** The 5 rule candidates accepted in V3.4 (RE-001 through RE-005) are documented in `rule-evolution-queue.md` but not enforced by any tool. A future agent could violate RE-001 (sidebar items with same `path`) and no automated check would catch it.
- **Mitigation:** Code review at PR time (when this project moves to PR-based development).
- **Future improvement:** A custom ESLint rule that checks `moduleConfig.tsx` for duplicate `path` values. Could be added in V4.
- **Severity:** medium (the next violation is likely)

### V3-ISS-005: AntD 6 deprecation warnings

- **Description:** From V2.6-V2.10 retro: `Drawer width` (use `size`), `Alert message` (use `title`), `Space direction` (use `orientation`) — 3 deprecation warnings observed in console during e2e runs.
- **Deferral:** V5 AntD 6→7 migration will fix all 3 in one pass.
- **Severity:** low (warnings only, no functional impact)

### V3-ISS-006: Bundle size 2.3MB

- **Description:** Vite warns the bundle is > 500KB after minification. 2.3MB is large for a single-page app with this much functionality.
- **Deferral:** V5 code splitting. Possible approaches: lazy-load per-module, lazy-load heavy components (WorkflowEditor, SettingsParamsPage).
- **Severity:** low (initial load only, no functional impact)

### V3-ISS-007: WorkflowListPage toggle/status interaction

- **Description:** The toggle in the workflow list overrides the original `status` field to always be 'active' or 'inactive' (never 'draft'). This means filtering by 'draft' via URL filter may show inconsistent results.
- **Decision:** Accepted as known. The "draft" filter shows workflows with `lastRun === ''` and `status !== 'active'` as a heuristic.
- **Future improvement:** Real refactor would separate "enabled" (toggle) from "status" (active/inactive/draft).
- **Severity:** low (a minor inconsistency, not a bug)

### V3-ISS-008: Settings module sidebar uses `key` as path

- **Description:** The settings sidebar items have `key: '/settings/users'` (no separate `path` field). After V3.1's fix to moduleConfig, all 5 modules' sidebar items should have a `path` field. Settings uses `key` because the keys happen to match the paths.
- **Decision:** Accepted (works correctly because of the matching). Inconsistent with other modules' pattern.
- **Future improvement:** Normalize to use `path` field everywhere.
- **Severity:** low (cosmetic inconsistency)

## Resolution Tracking

- **V3-ISS-001:** workaround in V3.3; full resolution deferred to V4
- **V3-ISS-002:** resolved at design time (V3.4)
- **V3-ISS-003:** accepted; will be addressed organically in V4+
- **V3-ISS-004:** accepted; ESLint rule possible in V4
- **V3-ISS-005 through V3-ISS-008:** all deferred to V5

## Cross-References

- V2 retro: `docs/09-change-records/process/RETRO-V2.6-V2.10.md` (carries V3-ISS-005, V3-ISS-006, V3-ISS-007, V3-ISS-008)
- V2 hotfix ledger: `docs/09-change-records/issues/2026-06-07-V2-hotfix-ledger.md` (V3-ISS-002 root cause)
- Knowledge map conventions: `docs/02-harness/knowledge/frontend/` (V3-ISS-003 mitigation)
- Rule queue: `docs/08-frontend-agent/evolution/rule-evolution-queue.md` (V3-ISS-004)
