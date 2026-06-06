# Smoke Test Contract

Status: Draft

## Purpose

Define the contract for smoke tests - minimal tests that verify basic functionality.

## Scope

All smoke tests in the E2E asset lifecycle.

## Rules

### 1. Smoke Test Definition

A smoke test validates:
- Page loads successfully
- Key elements are visible
- Basic interactions work
- No critical errors

### 2. Contract Requirements

Every smoke test must:
- Complete in under 30 seconds
- Have stable selectors
- Be deterministic (no flakiness)
- Cover one route or feature

### 3. Test Structure

```text
1. Navigate to route
2. Wait for page load
3. Verify key elements
4. Perform one interaction
5. Verify result
6. Capture evidence on failure
```

### 4. Pass Criteria

- All assertions pass
- No console errors
- No network failures
- Response time acceptable

### 5. Failure Handling

On failure:
- Capture screenshot
- Record console output
- Record network activity
- Create failure diagnosis

## Template

```markdown
# Smoke Test: {feature name}

## Test Info

- **Route:** {route}
- **Priority:** {high|medium|low}
- **Timeout:** 30s

## Preconditions

- {precondition}

## Steps

1. Navigate to {route}
2. Wait for {element} to be visible
3. Verify {element} contains {text}
4. Click {element}
5. Verify {result}

## Assertions

- [ ] Page loads
- [ ] Key elements visible
- [ ] Interaction works
- [ ] No errors

## Evidence on Failure

- Screenshot
- Console log
- Network log
```
