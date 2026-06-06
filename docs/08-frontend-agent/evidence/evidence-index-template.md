# Evidence Index Template

Status: Draft

## Purpose

Template for indexing UI evidence artifacts.

## Template

```markdown
# UI Evidence Index

## Index Info

- **Route:** {route}
- **Last Updated:** {ISO-8601}
- **Evidence Count:** {count}

## Evidence List

| Evidence ID | Type | Timestamp | Confidence | Status |
|-------------|------|-----------|------------|--------|
| {id} | {type} | {timestamp} | {confidence} | {active/archived} |

## By Type

### Route Snapshots

| ID | Timestamp | Artifact |
|----|-----------|----------|
| {id} | {timestamp} | {path} |

### Screenshots

| ID | Timestamp | Artifact |
|----|-----------|----------|
| {id} | {timestamp} | {path} |

### DOM Observations

| ID | Timestamp | Artifact |
|----|-----------|----------|
| {id} | {timestamp} | {path} |

### Interaction Traces

| ID | Timestamp | Artifact |
|----|-----------|----------|
| {id} | {timestamp} | {path} |

### Failure Diagnoses

| ID | Timestamp | Artifact |
|----|-----------|----------|
| {id} | {timestamp} | {path} |

## Summary

- **Total Active:** {count}
- **Total Archived:** {count}
- **Average Confidence:** {avg}
```
