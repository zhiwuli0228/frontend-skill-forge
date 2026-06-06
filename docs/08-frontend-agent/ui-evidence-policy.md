# UI Evidence Policy

Status: Draft

## Purpose

Define evidence types, naming conventions, and retention rules for frontend UI evidence.

## Scope

All UI evidence collected through MCP exploration and testing.

## Rules

### 1. Evidence Types

| Type | Description | Format |
|------|-------------|--------|
| route-snapshot | Full page accessibility tree | JSON |
| page-screenshot | Visual capture of page | PNG |
| dom-observation | DOM structure observation | JSON |
| selector-candidate | Stable selector identification | JSON |
| interaction-trace | User interaction sequence | JSON |
| network-observation | Network request/response | JSON |
| console-observation | Console message capture | JSON |
| test-result | Test execution result | JSON |
| failure-diagnosis | Failure analysis | Markdown |
| human-feedback | User feedback record | Markdown |
| skill-evolution-decision | Evolution decision record | Markdown |

### 2. Required Metadata

Every evidence artifact must include:

```json
{
  "evidenceId": "string",
  "type": "string",
  "route": "string",
  "timestamp": "ISO-8601",
  "source": "string",
  "confidence": "number (0-1)",
  "tags": "array"
}
```

### 3. Storage Naming Convention

```text
{route}-{timestamp}-{type}.{ext}
```

Examples:
- `dashboard-20260606T143000-screenshot.png`
- `login-20260606T143000-dom-observation.json`

### 4. Relationship with docs/07-evidence

- `docs/07-evidence` stores cross-cutting verification evidence
- `docs/08-frontend-agent/evidence` stores frontend-specific UI evidence
- Frontend evidence may be promoted to `docs/07-evidence` for cross-cutting concerns

### 5. Valid Evidence Criteria

**Valid:**
- Captured from live application
- Includes required metadata
- Has reproducible capture steps
- Timestamped and named correctly

**Invalid:**
- Missing metadata
- No reproduction steps
- Single occurrence without confirmation
- Captured from mock/stub environment

### 6. Retention Rules

- Active evidence: Retained indefinitely
- Superseded evidence: Archived after 90 days
- Failed evidence: Retained for audit trail
- Human feedback: Retained indefinitely

## Outputs

- Evidence artifacts with proper metadata
- Evidence index entries
- Retention audit trail
