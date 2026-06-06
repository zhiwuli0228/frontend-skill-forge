# E2E Case Registry Template

Status: Draft

## Purpose

Template for registering E2E test cases.

## Template

```markdown
# E2E Case Registry

## Registry Info

- **Route:** {route}
- **Last Updated:** {ISO-8601}
- **Total Cases:** {count}

## Case List

| Case ID | Name | Type | Status | Priority | Last Run |
|---------|------|------|--------|----------|----------|
| {id} | {name} | {smoke|regression} | {active|retired} | {high|medium|low} | {date} |

## By Status

### Active Cases

| Case ID | Name | Type | Coverage |
|---------|------|------|----------|
| {id} | {name} | {type} | {percentage} |

### Retired Cases

| Case ID | Name | Retired Date | Reason |
|---------|------|--------------|--------|
| {id} | {name} | {date} | {reason} |

## Coverage Summary

- **Smoke Tests:** {count}
- **Regression Tests:** {count}
- **Total Coverage:** {percentage}

## Evidence References

| Case ID | Evidence IDs |
|---------|--------------|
| {id} | {list} |
```
