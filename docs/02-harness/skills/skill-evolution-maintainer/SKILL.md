# Skill Evolution Maintainer

Status: v1 (V4)
Version: 1.0.0

## Purpose

Help agents evolve Skill / Rule / Knowledge safely. Given evidence and a candidate, produce a minimal patch that passes verification, resolves the candidate, and archives the decision — without introducing conflicts or overfitting.

## When to Use

Invoke this Skill when:

- A failure diagnosis identifies a recurring pattern that should become a rule
- Multiple evidence records confirm a knowledge gap that should be filled
- A human feedback entry proposes a skill improvement
- An evolution candidate in the queue needs to be processed

Do NOT use when:

- The evidence is from a single, unstable failure (wait for more evidence)
- The issue is environmental (not a code or documentation problem)
- The candidate is speculative (no concrete evidence supports it)
- The change would overfit to one page (needs to be project-wide)

## Inputs

| Input | Source | Format | Required |
| --- | --- | --- | --- |
| Evidence records | `docs/08-frontend-agent/evidence/` | markdown records | yes |
| Failure diagnosis | `docs/08-frontend-agent/evidence/failure-diagnoses/` | markdown record | optional |
| Human feedback | `docs/08-frontend-agent/evolution/human-feedback-log.md` | log entries | optional |
| Evolution candidate | `docs/08-frontend-agent/evolution/` (one of the 3 queues) | queue entry | yes |
| Evolution decision record template | `docs/08-frontend-agent/evolution/evolution-decision-record-template.md` | template | yes |

## Procedure

### Step 1: Read the Candidate

**Goal:** Understand what the candidate is proposing.

**Action:**
1. Read the candidate from the appropriate queue (knowledge, rule, or skill)
2. Note the candidate ID, description, evidence references, priority, status
3. Check the status: if "accepted" or "rejected", skip (already processed)

**Output:** Candidate understood, status is "pending".

**Validation:** If the candidate has no evidence references, it's not ready for processing. Flag as "incomplete candidate."

### Step 2: Read the Evidence

**Goal:** Understand the evidence supporting the candidate.

**Action:**
1. Read each evidence record referenced by the candidate
2. For each record: note the type, route, confidence, key observations
3. Identify the pattern: what does the evidence consistently show?
4. Check for conflicting evidence: does any record contradict the pattern?

**Output:** Evidence summary (pattern + confidence + conflicts).

**Validation:** If there's conflicting evidence, the candidate needs more investigation. Do not proceed to acceptance.

### Step 3: Validate the Candidate

**Goal:** Ensure the candidate is ready for acceptance.

**Action:**
1. Check the "when not to evolve" criteria (from the queue README):
   - Is the evidence from one unstable failure only? → reject
   - Is the issue environmental? → reject
   - Is the source change uncommitted? → reject
   - Is the observation not reproducible? → reject
   - Would the patch overfit to one page? → reject
   - Is the update speculative? → reject
2. Check for conflicts with existing rules/knowledge
3. Check if the candidate has been reviewed by a human (for skill candidates)

**Output:** Validation result (ready, needs-more-evidence, or reject-with-reason).

**Validation:** A "ready" candidate should have ≥2 evidence records, no conflicts, and a clear root cause.

### Step 4: Produce the Minimal Patch

**Goal:** Make the smallest possible change that addresses the candidate.

**Action:**
For **knowledge candidates:**
1. Identify the knowledge map to update
2. Add or modify the specific section that addresses the gap
3. Update the "Last Updated" date
4. Do NOT restructure the entire map

For **rule candidates:**
1. Identify the rule file to create or update
2. Write the rule text (one sentence, actionable)
3. Add enforcement mechanism (manual review, linter, CI check)
4. Do NOT create complex rule hierarchies

For **skill candidates:**
1. Identify the Skill to update
2. Add or modify the specific procedure step
3. Add a validation example
4. Do NOT rewrite the entire Skill

**Output:** Modified file(s) with minimal changes.

**Validation:** The patch should touch ≤1 file and ≤10 lines. If it's larger, it's not minimal.

### Step 5: Verify the Patch

**Goal:** Ensure the patch does not break anything.

**Action:**
1. `npm run lint` → 0 errors
2. `npm run build` → clean
3. `npm run test:e2e` → existing tests still pass
4. If the patch is a knowledge map update, verify the map is internally consistent
5. If the patch is a rule, verify it doesn't conflict with existing rules

**Output:** Verification result (pass or fail).

**Validation:** If verification fails, revert the patch and investigate.

### Step 6: Record the Decision

**Goal:** Document the acceptance or rejection.

**Action:**
1. Use the `evolution-decision-record-template.md` format
2. Fill in: decision ID, date, type (knowledge/rule/skill), decision (accept/reject/defer)
3. Fill in: candidate ID, description, evidence IDs
4. Fill in: analysis (pattern, root cause, impact)
5. Fill in: review (reviewer, decision, rationale)
6. Fill in: verification (test added, test passed)
7. Fill in: outcome (knowledge/rule/skill updated yes/no)

**Output:** Decision record (markdown).

**Validation:** The decision record should be complete — all fields filled, no placeholders.

### Step 7: Update the Queue

**Goal:** Mark the candidate as processed.

**Action:**
1. Update the candidate's status in the queue:
   - "pending" → "accepted" or "rejected" or "deferred"
2. Add the decision record ID to the candidate's row
3. If "deferred", add the deferral reason

**Output:** Updated queue entry.

**Validation:** The queue should have no "pending" entries that have been processed.

### Step 8: Archive the Decision

**Goal:** Preserve the decision for future reference.

**Action:**
1. The decision record is already in the queue (inline)
2. If the decision is "accept" and the patch is a knowledge map update, the map is already updated
3. If the decision is "accept" and the patch is a rule, the rule file is already created/updated
4. If the decision is "reject", archive the evidence and do not retry without new evidence

**Output:** Decision archived.

**Validation:** A rejected candidate should not appear in the queue as "pending" again.

## Outputs

| Output | Format | Destination |
| --- | --- | --- |
| Minimal patch | source code or markdown | knowledge maps, rules, or Skills |
| Verification result | pass/fail | inline |
| Decision record | markdown | inline in the queue |
| Updated queue | markdown | `docs/08-frontend-agent/evolution/` |

## Validation Examples

### Example 1: KE-001 (knowledge candidate, accepted)

**Input:** KE-001 "Add sidebar item config pattern to knowledge maps"

**Evidence:** FD-2026-06-07-001 (V2.10 sidebar hotfix)

**Expected Skill output:**
1. Read candidate: KE-001, pending, evidence: FD-2026-06-07-001
2. Read evidence: sidebar items with identical `path` caused silent navigation failure
3. Validate: ≥2 evidence records (failure diagnosis + 13 e2e tests), no conflicts
4. Patch: add "Pattern: Optional :filter? Param" section to route-map.md
5. Verify: knowledge map is internally consistent
6. Decision: accept (KE-001)
7. Queue: status → "accepted"
8. Archive: decision record inline

**Actual V3 evidence:** KE-001 was accepted in V3.1. Running the Skill should reproduce the same acceptance.

### Example 2: RE-001 (rule candidate, accepted)

**Input:** RE-001 "Sidebar items must have unique `path` properties"

**Evidence:** FD-2026-06-07-001

**Expected Skill output:**
1. Read candidate: RE-001, pending, evidence: FD-2026-06-07-001
2. Read evidence: sidebar items with identical `path` caused silent navigation failure
3. Validate: no conflicts (no existing rule about sidebar paths)
4. Patch: add rule text to rule-evolution-queue.md (inline)
5. Verify: rule is actionable and doesn't conflict
6. Decision: accept (RE-001)
7. Queue: status → "accepted"
8. Archive: decision record inline

**Actual V3 evidence:** RE-001 was accepted in V3.4. Running the Skill should reproduce the same acceptance.

### Example 3: Skill candidate (deferred to V4)

**Input:** Skill candidate "Promote scenario selector pattern to a Skill"

**Evidence:** V3.3 session (12 records from /task/list)

**Expected Skill output:**
1. Read candidate: pending, evidence: 12 records from 1 route
2. Read evidence: scenario selector pattern documented in component-discovery CD-TL-004
3. Validate: only 1 route covered — "captured at least 3 times" criterion not met
4. Decision: defer (needs evidence from ≥2 more routes)
5. Queue: status → "deferred", reason: "only 1 route covered"
6. Archive: decision record inline with deferral reason

## Known Limitations

1. **Single-candidate processing.** This Skill processes one candidate at a time. Batch processing is not supported.

2. **No automatic conflict detection.** The Skill checks for conflicts manually (by reading existing rules/knowledge). A future V5+ could add automated conflict detection.

3. **No skill-level changes.** This Skill handles knowledge and rule changes. Skill-level changes (modifying the Skill procedures themselves) require human review.

4. **No rollback.** If a patch causes issues, the Skill does not automatically revert. The agent should manually revert using git.

## Cross-References

- **Uses:** `docs/08-frontend-agent/evidence/` (evidence records)
- **Uses:** `docs/08-frontend-agent/evolution/` (queues, templates)
- **Uses:** `docs/02-harness/knowledge/frontend/` (knowledge maps)
- **Uses:** `docs/02-harness/rules/` (rules)
- **Produces:** minimal patch, decision record, updated queue
- **Related Skill:** `frontend-e2e-explorer` (for producing the evidence that feeds candidates)
- **Related Skill:** `frontend-project-reader` (for understanding the codebase before evolving)
