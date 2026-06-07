# Design: V4 Skill v1 Implementation

Status: Complete

## Skill Structure (common to all 4)

Each v1 Skill follows this structure:

```markdown
# {Skill Name}

Status: v1 (V4)
Version: 1.0.0

## Purpose

One-paragraph description of what this Skill does and why.

## When to Use

Concrete triggers: when should an agent invoke this Skill?

## Inputs

What the Skill reads. Each input has: name, source, format.

## Procedure

Step-by-step instructions. Each step has:
- Goal (what this step achieves)
- Action (what to do)
- Output (what to produce)
- Validation (how to verify the step succeeded)

## Outputs

What the Skill produces. Each output has: name, format, destination.

## Validation Examples

Concrete examples from V3 evidence: "Given input X, the Skill produces output Y, which matches artifact Z."

## Known Limitations

What the Skill cannot do, and when to escalate to a human.

## Cross-References

Links to related Skills, knowledge maps, evidence records, rules.
```

## Skill 1: frontend-project-reader v1

**Purpose:** Read and model a frontend codebase. Given a project root, produce a project understanding summary.

**Inputs:** source tree, route-map.md, component-map.md, project-map.md, state-flow-map.md, api-contract-map.md

**Procedure:**
1. Read `route-map.md` → extract all routes, modules, sidebar items
2. Read `component-map.md` → extract all components, props, testids
3. Read `project-map.md` → extract module structure, dependencies
4. Read `state-flow-map.md` → extract state sources, patterns
5. Read `api-contract-map.md` → extract mock data contracts
6. Cross-reference: for each route, verify the component exists; for each component, verify the route exists
7. Identify gaps: routes without e2e coverage, components without testids, state sources without documentation
8. Produce: project understanding summary (one document)

**Outputs:** Project understanding summary, route/component dependency map, risk areas, suggested evidence targets

**Validation:** Run against V2 surface → output should match V3.1 knowledge maps

## Skill 2: frontend-incremental-coder v1

**Purpose:** Make bounded frontend changes. Given a change request, produce a minimal change plan.

**Inputs:** change request, architecture boundary (from module-boundary.md), existing evidence, affected routes/components, verification policy

**Procedure:**
1. Parse the change request → identify affected module, routes, components
2. Read architecture boundary → check if the change crosses module boundaries
3. Read existing evidence → check if the affected area has evidence records
4. Read affected components → understand current state
5. Produce minimal change plan: which files to modify, what to change, what NOT to change
6. Execute the plan (scoped edits only)
7. Run verification: `npm run lint`, `npm run build`, `npm run test:e2e`
8. Update evidence if the change affects documented behavior
9. Record the change in the decision ledger if it crosses a boundary

**Outputs:** Minimal change plan, modified files, validation result, evidence update

**Validation:** Use V2.10 sidebar hotfix as the test case → the Skill should produce the same fix

## Skill 3: frontend-e2e-explorer v1

**Purpose:** Explore UI and create evidence-backed E2E assets. Given a route target, produce evidence records.

**Inputs:** route target, MCP/Playwright tools (or e2e artifacts as fallback), evidence templates, selector policy

**Procedure:**
1. Navigate to the route target
2. Capture page observation (structure, components, state)
3. Identify interactive elements (buttons, selects, links, rows)
4. Evaluate selector stability per selector-stability-guide.md
5. Perform interactions (click, type, select) and capture traces
6. Switch scenarios (loaded/loading/empty/error) and capture snapshots
7. Cross-reference with existing e2e tests
8. Produce evidence records using the templates
9. Update the evidence index

**Outputs:** Exploration session, UI evidence records, selector candidates, E2E asset candidates

**Validation:** Run against /task/list → output should match V3.3's 12 evidence records

## Skill 4: skill-evolution-maintainer v1

**Purpose:** Evolve Skill / Rule / Knowledge safely. Given evidence and a candidate, produce a minimal patch.

**Inputs:** evidence records, failure diagnosis, human feedback, evolution candidate

**Procedure:**
1. Read the evidence → identify the pattern
2. Read the failure diagnosis → understand root cause
3. Check the evolution queue → see if a candidate exists
4. Validate the candidate: is the evidence sufficient? is there a conflict?
5. Produce a minimal patch: one change to one file
6. Verify the patch: does it pass build? does it conflict with existing rules?
7. Record the decision using the evolution-decision-record template
8. Update the queue status
9. Archive the decision

**Outputs:** Minimal patch, verification result, archive report

**Validation:** Use V3.4's knowledge-evolution-queue (KE-001) as the test case → the Skill should produce the same acceptance decision

## File Locations

| Skill | File |
| --- | --- |
| frontend-project-reader | `docs/02-harness/skills/frontend-project-reader/SKILL.md` |
| frontend-incremental-coder | `docs/02-harness/skills/frontend-incremental-coder/SKILL.md` |
| frontend-e2e-explorer | `docs/02-harness/skills/frontend-e2e-explorer/SKILL.md` |
| skill-evolution-maintainer | `docs/02-harness/skills/skill-evolution-maintainer/SKILL.md` |
