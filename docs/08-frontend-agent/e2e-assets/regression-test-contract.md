# Regression Test Contract

Status: Draft

## Purpose

Define the contract for regression tests - comprehensive tests that verify feature correctness.

## Scope

All regression tests in the E2E asset lifecycle.

## Rules

### 1. Regression Test Definition

A regression test validates:
- Complete user flows
- Edge cases
- Error handling
- State management
- Data integrity

### 2. Contract Requirements

Every regression test must:
- Cover a complete user journey
- Have stable selectors
- Be deterministic
- Include edge cases
- Have clear assertions

### 3. Test Structure

```text
1. Setup test data
2. Navigate to starting point
3. Execute user flow
4. Verify each step
5. Verify final state
6. Cleanup test data
```

### 4. Promotion from Smoke

A smoke test can become regression when:
- Run successfully 10+ times
- No flakiness observed
- Selectors proven stable
- Additional coverage added

### 5. Retirement Criteria

Retire regression test when:
- Feature removed
- Consistently flaky (>20% failure)
- Replaced by better test
- No longer relevant

## Template

```markdown
# Regression Test: {feature name}

## Test Info

- **Route:** {route}
- **Priority:** {high|medium|low}
- **Timeout:** {seconds}
- **Promoted From:** {smoke test id}

## Preconditions

- {precondition}

## Test Data

```json
{test data}
```

## Steps

1. {step 1}
2. {step 2}
3. {step 3}

## Assertions

- [ ] {assertion 1}
- [ ] {assertion 2}
- [ ] {assertion 3}

## Edge Cases

- {edge case 1}
- {edge case 2}

## Cleanup

- {cleanup step}

## Evidence on Failure

- Screenshot
- Console log
- Network log
- Test data state
```
