# Failure Diagnosis Template

Status: Draft

## Purpose

Template for diagnosing UI failures.

## Template

```markdown
# Failure Diagnosis

## Diagnosis Info

- **Diagnosis ID:** {diagnosisId}
- **Date:** {ISO-8601}
- **Route:** {route}
- **Severity:** {critical/high/medium/low}

## Failure Description

- **Symptom:** {what happened}
- **Expected:** {expected behavior}
- **Actual:** {actual behavior}
- **Frequency:** {always/intermittent/rare}

## Evidence

| Evidence ID | Type | Description |
|-------------|------|-------------|
| {id} | {type} | {description} |

## Root Cause Analysis

### Hypotheses

| # | Hypothesis | Confidence | Evidence |
|---|-----------|------------|----------|
| 1 | {hypothesis} | {0-1} | {evidence} |

### Confirmed Cause

{confirmed cause description}

## Classification

- **Type:** {failure|drift}
- **Component:** {affected component}
- **Layer:** {frontend|backend|integration}

## Impact

- **User Impact:** {description}
- **Test Impact:** {description}
- **Business Impact:** {description}

## Recommended Action

- [ ] {action item 1}
- [ ] {action item 2}

## Evolution Candidate

- **Candidate:** {yes/no}
- **Type:** {skill|rule|knowledge}
- **Description:** {candidate description}

## Resolution

- **Resolved:** {yes/no}
- **Resolution Date:** {date}
- **Resolution Method:** {fix|workaround|accepted}
```
