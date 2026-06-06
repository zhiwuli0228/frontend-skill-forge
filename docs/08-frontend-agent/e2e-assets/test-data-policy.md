# Test Data Policy

Status: Draft

## Purpose

Define policies for managing test data in E2E tests.

## Scope

All test data used in E2E testing.

## Rules

### 1. Test Data Principles

- **Isolated:** Tests must not share mutable data
- **Deterministic:** Same data produces same results
- **Cleanable:** Data can be removed after test
- **Realistic:** Data resembles production

### 2. Data Types

**Static Data:**
- Configuration values
- Reference data
- Read-only test fixtures

**Dynamic Data:**
- User-created records
- Temporary state
- Test-specific data

### 3. Data Management

**Setup:**
- Create data before test
- Use unique identifiers
- Record creation in test

**Cleanup:**
- Delete data after test
- Handle failures gracefully
- Verify cleanup success

### 4. Data Storage

- Test fixtures in `tests/fixtures/`
- Dynamic data via API
- Secrets in environment variables
- Never commit sensitive data

### 5. Data Isolation

- Each test gets unique data
- No shared mutable state
- Parallel execution safe
- Cleanup guaranteed

## Template

```markdown
# Test Data: {test name}

## Data Requirements

| Data Type | Source | Cleanup |
|-----------|--------|---------|
| {type} | {source} | {method} |

## Setup

```javascript
// Setup code
```

## Cleanup

```javascript
// Cleanup code
```

## Fixtures

- {fixture path}
```
