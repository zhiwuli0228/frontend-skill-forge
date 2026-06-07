# Skill Evolution Queue

Status: Active (V7.2)

## Purpose

Track pending Skill evolution candidates. A Skill is a documented procedure that agents follow when performing a specific task. Skills live in `docs/04-skills/`.

## Queue

| ID | Candidate | Evidence | Priority | Status | Date |
|----|-----------|----------|----------|--------|------|
| SE-001 | Add "post-migration selector audit" step to frontend-e2e-explorer | V7 drift diagnosis (phase-7-drift-diagnosis.md) | high | accepted (V7.2) | 2026-06-07 |
| SE-002 | Add explicit "MCP-first or record fallback" gate to complex UI validation Skills | `2026-06-07-context-upper-bound-run-04`, `end-to-end-skill-mcp-cross-module-validation-program.md` | high | pending | 2026-06-07 |
| SE-003 | Add cross-module handoff verification step to frontend-incremental-coder and frontend-e2e-explorer | `2026-06-07-context-upper-bound-run-04`, `2026-06-07-context-upper-bound-run-05` | high | pending | 2026-06-07 |
| SE-004 | Add a "route-pair upper bound" context step to cross-module validation Skills | `2026-06-07-cross-module-mcp-skill-run-01` | high | pending | 2026-06-07 |

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

## Pending Candidate Notes

### SE-002 (pending 2026-06-07)

- **Candidate:** Add an explicit MCP-first gate, plus mandatory fallback recording, to the complex UI validation workflow.
- **Evidence:** The repo now has strong Playwright-backed validation evidence, but MCP-first behavior is not yet consistently enforced at run time.
- **Why it matters:** Without this gate, an agent may still claim benchmark-grade validation while skipping the MCP exploration layer.
- **Review status:** pending human review.

### SE-003 (pending 2026-06-07)

- **Candidate:** Add a cross-module handoff verification step to `frontend-incremental-coder` and `frontend-e2e-explorer`.
- **Evidence:** `task -> workflow` handoff runs showed that cross-module work stays bounded, but only when route ownership, navigation, and destination runtime context are explicitly checked.
- **Why it matters:** Current Skills are stronger for single-route and single-module work than for inter-module handoff tasks.
- **Review status:** pending human review.

### SE-004 (pending 2026-06-07)

- **Candidate:** Add an explicit "route-pair upper bound" context step to cross-module validation Skills.
- **Evidence:** `2026-06-07-cross-module-mcp-skill-run-01` completed a `task -> workflow` runtime handoff with bounded context only because the run was constrained to one source route, one destination route, and one route-pair spec file.
- **Why it matters:** Without an explicit upper bound, cross-module tasks invite premature loading of full route maps, component maps, historical runs, and multiple Skill documents, which increases context-explosion risk.
- **Review status:** pending human review.
