# Skill Evolution Maintainer — References

Supplementary material for `skill-evolution-maintainer`. Load only when needed.

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

### Example 2: RE-001 (rule candidate, accepted)

**Input:** RE-001 "Sidebar items must have unique `path` properties"
**Evidence:** FD-2026-06-07-001

**Expected Skill output:**
1. Read candidate: RE-001, pending
2. Read evidence: sidebar items with identical `path` caused silent navigation failure
3. Validate: no conflicts (no existing rule about sidebar paths)
4. Patch: add rule text inline
5. Verify: rule is actionable and doesn't conflict
6. Decision: accept (RE-001)
7. Queue: status → "accepted"

### Example 3: Skill candidate (deferred)

**Input:** Skill candidate "Promote scenario selector pattern to a Skill"
**Evidence:** 12 records from 1 route (/task/list)

**Expected Skill output:**
1. Read candidate: pending, evidence from 1 route
2. Read evidence: scenario selector pattern documented in component-discovery
3. Validate: only 1 route covered — "captured at least 3 times" criterion not met
4. Decision: defer (needs evidence from ≥2 more routes)
5. Queue: status → "deferred", reason: "only 1 route covered"

## Known Limitations

1. **Single-candidate processing.** Processes one candidate at a time. Batch processing is not supported.
2. **No automatic conflict detection.** Checks for conflicts manually by reading existing rules/knowledge.
3. **No skill-level changes.** Skill-level changes (modifying Skill procedures themselves) require human review.
4. **No rollback.** If a patch causes issues, the Skill does not automatically revert. Use git to revert manually.

## Cross-References

- **Uses:** `docs/08-frontend-agent/evidence/` (evidence records)
- **Uses:** `docs/08-frontend-agent/evolution/` (queues, templates)
- **Uses:** `docs/02-harness/knowledge/frontend/` (knowledge maps)
- **Uses:** `docs/02-harness/rules/` (rules)
- **Produces:** minimal patch, decision record, updated queue
- **Related Skill:** `frontend-e2e-explorer` — for producing the evidence that feeds candidates
- **Related Skill:** `frontend-project-reader` — for understanding the codebase before evolving
