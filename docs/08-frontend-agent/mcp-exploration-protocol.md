# MCP Exploration Protocol

Status: Draft

## Purpose

Define the standard loop for frontend MCP-based exploration using Playwright.

## Scope

All frontend exploration sessions using Playwright MCP must follow this protocol.

## Rules

### 1. Exploration Loop

```text
Prepare Route
→ Open Page
→ Observe UI
→ Capture Snapshot
→ Interact
→ Record Selector Evidence
→ Compare Expected Behavior
→ Diagnose Drift
→ Update E2E Asset
→ Queue Skill / Rule / Knowledge Evolution
```

### 2. When to Explore

- New route or page discovered
- UI component changed
- E2E test failure
- Human feedback received
- Scheduled exploration cycle
- Before creating new E2E assets

### 3. What to Capture

- Page URL and route
- Page title and key headings
- Visible UI components
- Interactive elements (buttons, inputs, links)
- Network requests triggered
- Console messages
- Screenshots for visual evidence

### 4. Evidence Naming Convention

```text
{route}-{timestamp}-{evidence-type}.{ext}
```

Examples:
- `dashboard-20260606-screenshot.png`
- `login-20260606-dom-observation.json`
- `settings-20260606-interaction-trace.json`

### 5. Selector Recording

- Prefer `data-testid` attributes
- Fall back to semantic selectors (role, label, text)
- Record CSS selectors as last resort
- Document selector stability confidence

### 6. Failure vs Drift Distinction

**Test Failure:** The application behavior changed unexpectedly.
**UI Drift:** The UI structure changed but behavior is correct.

Diagnosis steps:
1. Compare current snapshot with baseline
2. Check if selectors still resolve
3. Verify functional behavior
4. Classify as failure or drift

### 7. Evolution Decision

Before queuing a Skill / Rule / Knowledge update:
- Evidence must be captured at least twice
- Root cause must be identified
- Human review required for Skill changes
- Rule changes require evidence-to-skill promotion record

### 8. Over-Update Prevention

- Do not evolve Skills based on single evidence
- Require confirmation before modifying stable Skills
- Archive superseded versions
- Track evolution decision rationale

## Outputs

- Exploration session records
- UI evidence artifacts
- Selector stability reports
- Evolution candidates
