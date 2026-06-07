# Acceptance Precheck Template

Status: Draft

## Inputs

- Proposal
- Specs
- Design
- Tasks
- Implementation outputs
- Verify artifact

## Reverse Traceability

| Confirmed Requirement | Delivered Mapping | Classification |
| --- | --- | --- |
| Requirement | Mapping | Implemented / Blocked / Needs user confirmation |

## Frontend Verification Gate

| Check | Result | Notes |
| --- | --- | --- |
| Playwright E2E exists for changed user-visible flow | Pass / Fail / Blocked | Notes |
| Verify artifact contains executed command results | Pass / Fail / Blocked | Notes |
| Verification is not unit-only | Pass / Fail / Blocked | Notes |

## Gate Decision

State whether acceptance precheck passed or remains blocked.
