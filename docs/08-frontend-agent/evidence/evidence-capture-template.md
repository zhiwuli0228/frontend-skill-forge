# Evidence Capture Template

Status: Draft

## Purpose

Template for capturing UI evidence with required metadata.

## Template

```markdown
# UI Evidence Capture

## Metadata

- **Evidence ID:** {evidenceId}
- **Type:** {route-snapshot|page-screenshot|dom-observation|...}
- **Route:** {route}
- **Timestamp:** {ISO-8601}
- **Source:** {agent/human}
- **Confidence:** {0-1}
- **Tags:** {list}

## Context

- **Exploration Session:** {sessionId}
- **Goal:** {capture goal}
- **Trigger:** {what triggered capture}

## Content

### Data

{evidence data or reference to artifact}

### Artifact Path

{path to artifact file}

## Reproduction Steps

1. Navigate to {route}
2. {step 2}
3. {step 3}

## Validation

- [ ] Metadata complete
- [ ] Artifact exists
- [ ] Reproduction steps documented
- [ ] Confidence assessed

## Notes

- {additional notes}
```
