---
name: skill-evolution-maintainer
description: Evolve skills, rules, and knowledge safely — given evidence and a candidate, produce a minimal patch that passes verification and resolves the candidate.
compatibility: opencode
metadata:
  project: frontend-skill-forge
  skill_type: maintenance
  authority: project
---

# Skill Evolution Maintainer

## Purpose

Given evidence and a candidate, produce a minimal patch that passes verification, resolves the candidate, and archives the decision — without introducing conflicts or overfitting.

## Use When

Use this Skill when:

- A failure diagnosis identifies a recurring pattern that should become a rule
- Multiple evidence records confirm a knowledge gap that should be filled
- A human feedback entry proposes a skill improvement
- An evolution candidate in the queue needs to be processed

Do not use this Skill when:

- The evidence is from a single, unstable failure (wait for more evidence)
- The issue is environmental (not a code or documentation problem)
- The candidate is speculative (no concrete evidence supports it)
- The change would overfit to one page (needs to be project-wide)

## Required Inputs

- Evidence records from `docs/08-frontend-agent/evidence/`
- Evolution candidate from one of the 3 queues in `docs/08-frontend-agent/evolution/`
- Evolution decision record template
- For knowledge candidates: target knowledge maps from `docs/02-harness/knowledge/frontend/`
- For rule candidates: existing rules from `docs/02-harness/rules/`

## Workflow

### 1. Read the Candidate

Read the candidate from the appropriate queue (knowledge, rule, or skill). Note ID, description, evidence references, priority, and status. If status is already "accepted" or "rejected", skip — already processed.

### 2. Read the Evidence

Read each evidence record referenced by the candidate. Identify the consistent pattern. Check for conflicting evidence. If evidence is from a single unstable failure, the candidate is not ready.

### 3. Validate the Candidate

Check against rejection criteria:
- Evidence from one unstable failure only? → reject
- Issue is environmental? → reject
- Source change uncommitted? → reject
- Observation not reproducible? → reject
- Patch would overfit to one page? → reject
- Update is speculative? → reject

A "ready" candidate should have ≥2 evidence records, no conflicts, and a clear root cause.

### 4. Produce the Minimal Patch

- **Knowledge candidates**: Add or modify the specific section in the target knowledge map. Update "Last Updated" date. Do not restructure the entire map.
- **Rule candidates**: Write the rule text (actionable one-liner). Add enforcement mechanism. Do not create complex rule hierarchies.
- **Skill candidates**: Add or modify the specific procedure step. Add a validation example. Do not rewrite the entire Skill.

Patch should touch ≤1 file and ≤10 lines.

### 5. Verify the Patch

```bash
npm run lint    # 0 errors
npm run build   # clean
```

For knowledge map: verify internal consistency. For rule: verify no conflict with existing rules.

### 6. Record the Decision

Use the evolution decision record template. Fill all fields: decision ID, date, type, decision, candidate ID, description, evidence IDs, analysis (pattern, root cause, impact), review, verification, outcome.

### 7. Update the Queue

Change candidate status: "pending" → "accepted" / "rejected" / "deferred". Add decision record ID. If deferred, include reason.

### 8. Archive

Accepted → patch is already applied. Rejected → archive evidence; do not retry without new evidence. Deferred → document what additional evidence would be needed.

## Failure Handling

If blocked, use one of these failure codes:

- `BLOCKED_BY_INCOMPLETE_CANDIDATE` — candidate has no evidence references
- `BLOCKED_BY_CONFLICTING_EVIDENCE` — evidence records contradict each other
- `BLOCKED_BY_UNSTABLE_EVIDENCE` — only one unstable failure as evidence
- `BLOCKED_BY_RULE_CONFLICT` — proposed rule conflicts with existing rule
- `BLOCKED_BY_OVERSCOPE_PATCH` — patch exceeds minimal threshold (>10 lines)
- `BLOCKED_BY_HUMAN_REVIEW_REQUIRED` — skill-level change requires human sign-off

For each blocker, include: what was attempted, what evidence exists, what is missing, and the next safe action.

## Context Budget Rules

- Process one candidate at a time; batch processing is not supported
- Load only the evidence records referenced by the candidate
- Load only the target section of a knowledge map, not the entire map
- Keep decision records inline in the queue — do not create separate decision files
- Reference the evolution decision template; do not load it unless creating a decision

## Output Format

```md
# Evolution Decision

## Candidate
- ID, queue, status, description

## Evidence Summary
- Pattern, confidence, conflicts

## Validation
- Result (ready / needs-more-evidence / reject)

## Patch
- What changed, why, scope

## Verification
- Lint / build / consistency

## Outcome
- Decision (accept / reject / defer)
- Rationale
```

## References

- `references/README.md` — validation examples, known limitations, cross-references
