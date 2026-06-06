# UI Drift Diagnosis

Status: Draft

## Purpose

Define the process for diagnosing UI drift vs actual failures.

## Scope

All UI drift detection and diagnosis activities.

## Rules

### 1. Drift vs Failure

**UI Drift:**
- Visual layout changed
- Selectors changed
- Component structure changed
- Behavior preserved

**Actual Failure:**
- Behavior broken
- Error states introduced
- Data flow disrupted
- User journey blocked

### 2. Diagnosis Process

```text
1. Capture current state
2. Compare with baseline
3. Identify differences
4. Test functional behavior
5. Classify as drift or failure
6. Record diagnosis
7. Determine action
```

### 3. Comparison Points

- Page structure (accessibility tree)
- Visual appearance (screenshots)
- Selector resolution
- Network requests
- Console output
- Functional behavior

### 4. Diagnosis Actions

**For Drift:**
- Update baseline
- Update selectors
- Update E2E assets
- No Skill evolution needed

**For Failure:**
- Create failure diagnosis
- Queue Skill evolution
- Notify stakeholders
- Create fix ticket

### 5. Prevention

- Regular baseline updates
- Stable selector strategy
- Version-pinned dependencies
- Visual regression testing

## Outputs

- Drift diagnosis reports
- Updated baselines
- Evolution candidates
