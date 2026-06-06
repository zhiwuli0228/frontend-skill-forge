# Evolution Decision Record Template

Status: Draft

## Purpose

Template for recording evolution decisions.

## Template

```markdown
# Evolution Decision Record

## Decision Info

- **Decision ID:** {decisionId}
- **Date:** {ISO-8601}
- **Type:** {skill|rule|knowledge}
- **Decision:** {accept|reject|defer}

## Candidate

- **Candidate ID:** {candidateId}
- **Description:** {description}
- **Evidence IDs:** {list}

## Analysis

### Pattern

{pattern identified}

### Root Cause

{root cause analysis}

### Impact

{impact assessment}

## Review

- **Reviewer:** {name}
- **Review Date:** {date}
- **Comments:** {comments}

## Verification

- **Test Added:** {yes|no}
- **Test Passed:** {yes|no}
- **Regression:** {yes|no}

## Decision

### Rationale

{decision rationale}

### Action

{action taken}

## Outcome

- **Skill Updated:** {yes|no}
- **Rule Updated:** {yes|no}
- **Knowledge Updated:** {yes|no}

## Archive

- **Archived:** {yes|no}
- **Archive Path:** {path}
```
