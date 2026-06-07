# E2E Evidence Contract

Last Updated: 2026-06-08
Status: Active
Priority: High

## Purpose

Define the mandatory evidence artifacts produced by every E2E test run. This contract ensures that test failures, flakes, and skill-evolution signals all leave a reviewable trail.

## Scope

All E2E test runs triggered by `npm run test:e2e` and any frontend agent diagnostic session.

## Required Evidence Per Run

Every E2E run MUST preserve all of the following artifact categories. If any category is missing, the run is **incomplete**.

| Artifact | Path | Format | Required |
|----------|------|--------|----------|
| Screenshots | `artifacts/validation/screenshots/` | PNG | yes |
| HTML report | `artifacts/validation/playwright-html/` | HTML | yes |
| Traces | `artifacts/validation/traces/` | `.zip` | best-effort |
| Console logs | `artifacts/validation/raw-logs/` | `.log` | yes |
| Network logs | `artifacts/validation/raw-logs/` | `.log` | recommended |
| DOM snapshot | `artifacts/validation/json/` | `.json` | recommended |
| Finding notes | `artifacts/validation/runs/<run-id>/finding.md` | Markdown | yes (on failure) |

## File Naming

```text
<run-id>-<page>-<state>-<index>.png
```

- `run-id` is the validation run identifier (e.g. `2026-06-08-e2e-run-01`)
- `page` is the route slug (e.g. `skill-list`, `task-list`, `task-templates`)
- `state` is the scenario state (`loaded`, `empty`, `error`, `loading`, `drawer-open`, `modal-open`)
- `index` is a zero-padded counter when multiple artifacts of the same type exist

## `finding.md` Convention

For every failing test or notable diagnostic, write a `finding.md` next to the run directory:

```md
# Finding: <test-name>

- Date: <ISO-8601>
- Scenario: <scenarioId from fixture>
- Page: <page>
- Result: pass | partial | fail | blocked
- Symptoms: short bullet list
- Probable cause: short paragraph or "unknown"
- Suggested next step: short paragraph
- Evidence paths: list of artifact paths
```

## Console and Network Logs

- Capture `console.error`, `console.warn`, and `console.info` for every page navigation
- Capture all `request`, `response`, and `requestfailed` events
- Use the Playwright MCP `browser_console_messages` and `browser_network_requests` tools
- Persist raw logs under `artifacts/validation/raw-logs/` with the run-id prefix

## DOM Snapshot

- Capture one `page.snapshot` per scenario state
- Save as `artifacts/validation/json/<run-id>-<page>-<state>.json`
- Include both the accessibility tree and any role-based selector hints

## Traces

- Traces are best-effort and depend on environment support
- If a trace cannot be generated, document the reason in `finding.md`
- Use the Playwright `--trace on` flag or MCP trace mode

## Evidence Priority

When reviewing a run, prefer this priority order:

1. Screenshots showing the actual rendered state
2. HTML report (test outcomes and durations)
3. Finding notes written by the operator
4. Console and network logs
5. DOM snapshots
6. Source code inspection

## Failure Policy

If a run cannot produce the required evidence:

```text
blocked: evidence missing for <category>
```

Do not silently downgrade the run. The contract is mandatory; missing evidence is itself a finding.

## Relationship to Other Docs

- Use with `e2e-fixture-contract.md` for input data structure
- Use with `playwright-mcp-policy.md` for MCP capture rules
- See `docs/08-frontend-agent/schemas/ui-evidence.schema.json` for the machine-readable shape
