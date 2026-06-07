# Design Template

Status: Draft

## Purpose

Convert approved specs into a frontend implementation design with explicit verification design.

## Design Basis

- Linked proposal:
- Linked specs:
- Related architecture docs:

## Affected Frontend Surfaces

| Surface | Type | Change |
| --- | --- | --- |
| `/route` | page/component/state/test | summary |

## Technical Design

### UI And Interaction Design

- Component structure:
- State flow:
- Error states:
- Loading states:

### Data And Integration Design

- API or mock integration points:
- Local state changes:
- Routing changes:

### File Boundary

- Files expected to change:
- Files explicitly protected from change:

## Skill And MCP Execution Design

| Step | Skill | MCP / Tool | Expected Use |
| --- | --- | --- | --- |
| read | skill name | repo reader / CLI | gather context |
| explore | skill name | Playwright MCP | inspect live UI |
| implement | skill name | CLI / editor | change code |
| verify | skill name | Playwright / CLI | execute checks |

## Verification Design

### Mandatory Commands

- `npm run lint`
- `npm run build`
- `npm run test:e2e`

### Mandatory E2E Coverage

- Affected route or user flow:
- Expected happy-path scenario:
- Expected failure or edge scenario:
- Evidence to capture:

### Non-Acceptable Verification

- Unit-only verification
- Statement of expected success without executed result
- Manual browser claim without captured evidence or command result

## Risks

| Risk | Impact | Control |
| --- | --- | --- |
| Risk | Impact | Control |
