# Skill Evolution Queue

Status: Active (V7.2)

## Purpose

Track pending Skill evolution candidates. A Skill is a documented procedure that agents follow when performing a specific task. Skills live in `docs/04-skills/`.

## Queue

| ID | Candidate | Evidence | Priority | Status | Date |
|----|-----------|----------|----------|--------|------|
| SE-001 | Add "post-migration selector audit" step to frontend-e2e-explorer | V7 drift diagnosis (phase-7-drift-diagnosis.md) | high | accepted (V7.2) | 2026-06-07 |

## Decision Records

### SE-001 (accepted 2026-06-07)

- **Candidate:** Add post-migration selector audit step to `frontend-e2e-explorer` skill.
- **Evidence:** V7 drift diagnosis — AntD migration changed testids without updating e2e tests. The `frontend-e2e-explorer` skill procedure does not include a step to verify testid stability after library migrations.
- **Decision:** Accept. Add step 10 to the skill procedure.
- **Step text:**
  > After any library migration or component refactor that changes DOM structure, grep for changed `data-testid` values in `tests/e2e/` and verify all references are updated. A migration is incomplete if it breaks existing e2e selectors.
- **Action taken:** Skill procedure updated.
- **Outcome:** Skill updated.

## Process

1. Evidence triggers candidate
2. Candidate added to queue
3. Human review required
4. Verification before acceptance
5. Skill updated or rejected

## Rules

- Only verified evidence can produce candidates
- Human review mandatory for Skills
- Archive rejected candidates with reason
- Track all decisions in evolution-decision-record
