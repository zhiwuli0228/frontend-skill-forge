# Evidence-to-Skill Promotion

Status: Active (V3.4)
Last Updated: 2026-06-07

## Purpose

Define the process for promoting evidence to Skills. This is the project's mechanism for self-evolution: a Skill encodes a reusable procedure that an agent can follow when faced with a recurring situation.

## Scope

All evidence-to-Skill promotion activities. Each promotion is recorded using the Promotion Template at the end of this document.

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

---

## First Promotion (V3.4 Note)

**Status:** deferred to V4

**Reason:** V3 only produced evidence for one route (`/task/list`). The promotion criteria require "captured at least 3 times." V4 (Skill v1 implementation) will:

1. Run V3.3-style evidence sessions for 2 more routes (e.g., `/skill/list` and `/insight/overview`)
2. Confirm the pattern is consistent across multiple routes
3. Promote the "scenario selector" pattern to a Skill update

**Candidate pattern (to be evaluated in V4):**

> "When documenting or testing a frontend page, the agent should:
> 1. Capture the loaded state (verify real data renders)
> 2. Capture the loading state (verify skeleton appears)
> 3. Capture the empty state (verify empty placeholder)
> 4. Capture the error state (verify error alert + retry link)
> 5. Verify the scenario selector allows switching between all 4 states
> 6. Use `data-testid="<page-name>-scenario-select"` as the selector for the switcher
> 7. Use `data-testid="<page-name>-loading"`, `-error`, `-retry-link` for assertions"

This is too narrow to be a Skill by itself. A more meaningful Skill candidate will emerge in V4 after multiple page analyses converge on a shared procedure.

## V3.4-Promoted Evidence Summary

The V3.3 evidence session produced 12 records (4 route snapshots, 4 component discoveries, 3 interaction traces, 1 session record, 1 evidence index). These are the first operational evidence in the project. They have NOT yet been promoted to a Skill because:

1. Only 1 route has been covered
2. The pattern (scenario selector, data-testid discipline, sidebar-filter pattern) is consistent across the codebase but only formally documented in 1 route's evidence
3. V4 will run evidence sessions for 2+ more routes to confirm the pattern is project-wide

## V3.4-Promoted Knowledge (not Skill)

While the Skill is deferred to V4, V3.4 did promote 4 items to **knowledge** (see `knowledge-evolution-queue.md`):

- KE-001: Sidebar item config pattern (already in V3.1 knowledge maps)
- KE-002: Test behavior-the-user-tests anti-pattern
- KE-003: Derive state from URL pattern
- KE-004: AntD 6 deprecation inventory

## V3.4-Promoted Rules (not Skill)

V3.4 also promoted 5 items to **rules** (see `rule-evolution-queue.md`):

- RE-001: Sidebar items must have unique `path`
- RE-002: Every page must render scenario selector
- RE-003: Every testable element must have `data-testid`
- RE-004: E2E tests must assert on URL change for navigation
- RE-005: Mock data interfaces must include all filter values

These are rules, not skills, because they are hard constraints ("must do X") rather than procedures ("to do X, follow these steps"). The Skill territory is procedural knowledge.

## Next Step

V4 (Skill v1 implementation) will:

1. Convert `docs/02-harness/skills/frontend-project-reader/SKILL.md` from skeleton to v1
2. Use the V3 evidence as the validation set
3. Produce the first evidence-to-skill promotion record
4. Update this file with the first accepted promotion
