# Evidence-to-Skill Promotion

Status: Draft

## Purpose

Define the process for promoting evidence to Skills.

## Scope

All evidence-to-Skill promotion activities.

## Rules

### 1. Promotion Criteria

Evidence can be promoted to Skill when:
- Captured at least 3 times
- Pattern is consistent
- Human review completed
- No conflicting evidence
- Root cause identified

### 2. Promotion Process

```text
1. Identify pattern in evidence
2. Create evolution candidate
3. Human review
4. Draft Skill update
5. Verify with test
6. Accept or reject
7. Archive decision
```

### 3. Promotion Template

```markdown
# Evidence-to-Skill Promotion

## Promotion Info

- **Promotion ID:** {id}
- **Date:** {ISO-8601}
- **Evidence IDs:** {list}

## Pattern Identified

{pattern description}

## Skill Update

{proposed skill update}

## Human Review

- **Reviewer:** {name}
- **Decision:** {accept|reject}
- **Rationale:** {rationale}

## Verification

- **Test Added:** {yes|no}
- **Test Passed:** {yes|no}

## Decision

{final decision}
```

### 4. Rejection Handling

When rejected:
- Record rejection reason
- Archive evidence
- Do not retry without new evidence
- Update evolution queue status
