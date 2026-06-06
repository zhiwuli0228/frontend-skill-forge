# E2E Asset Lifecycle

Status: Draft

## Purpose

Define the lifecycle stages for E2E test assets from discovery to retirement.

## Scope

All E2E test assets managed by the frontend agent layer.

## Rules

### 1. Lifecycle Stages

```text
Discovery
→ Smoke Contract
→ Regression Candidate
→ Stable Regression Asset
→ Drift Diagnosis
→ Retirement
```

### 2. Discovery Stage

- Triggered by MCP exploration
- Produces route discovery record
- Identifies interactive elements
- Captures initial evidence

### 3. Smoke Contract Stage

- Defines minimal test contract
- Validates page loads
- Checks key elements present
- Verifies basic interactions

### 4. Regression Candidate Stage

- Expanded from smoke contract
- Covers critical user flows
- Includes edge cases
- Validated against multiple runs

### 5. Stable Regression Asset Stage

- Proven reliability over time
- Stable selectors identified
- Part of CI/CD pipeline
- Monitored for flakiness

### 6. Drift Diagnosis Stage

- Triggered by test failures
- Compares current vs baseline
- Classifies as failure or drift
- Produces diagnosis report

### 7. Retirement Stage

- Triggered when:
  - Feature removed
  - Test consistently flaky
  - Replaced by better test
- Archive with retirement reason

### 8. MCP Evidence to Test Generation

```text
MCP Exploration
→ Route Discovery
→ Component Discovery
→ Interaction Trace
→ Test Script Generation
→ Smoke Contract
```

### 9. Failed Test to Evolution Candidate

```text
Test Failure
→ Drift Diagnosis
→ Root Cause Analysis
→ Evolution Candidate
→ Human Review
→ Skill / Rule Update
```

## Outputs

- E2E asset registry entries
- Test scripts
- Drift diagnosis reports
- Retirement records
