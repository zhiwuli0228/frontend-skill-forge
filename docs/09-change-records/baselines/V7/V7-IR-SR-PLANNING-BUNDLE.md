# V7 IR/SR Planning Bundle

## Intent Record (IR)

### Version Identity

- Version: V7
- Title: Self-Evolution Validation
- Phase: Architecture Blueprint Phase 7
- Status: Active

### Purpose

V7 proves the Skill / Rule / Knowledge evolution loop works end-to-end. It creates a controlled UI drift scenario, triggers a failing test, runs diagnosis, produces an evolution candidate, applies a minimal patch, and re-verifies — closing the first complete self-evolution cycle in the project.

### Motivation

V0–V6 built the foundation: governance, frontend surfaces, evidence loops, MCP exploration, and evolution queues. But the evolution mechanism itself has never been exercised. The evolution queues exist (skill-evolution-queue, rule-evolution-queue, knowledge-evolution-queue) with pending candidates, but no candidate has been through the full Evidence → Diagnosis → Candidate → Patch → Verification → Archive cycle. V7 proves this mechanism works.

### Scope

In scope:
- Controlled UI drift scenario (intentional change to trigger test failure)
- E2E test failure diagnosis and classification
- Evolution candidate production (Skill/Rule/Knowledge)
- Minimal patch application
- Re-verification with no regressions
- Full cycle archive report
- AntD migration (Button.Group → Space.Compact, Drawer.width → size) as a second controlled change
- Code splitting evaluation

Out of scope:
- New frontend pages or features
- Real backend integration
- New MCP exploration sessions (V6 scope)
- Production deployment

### Risk

1. Controlled drift may be too artificial — mitigation: use real AntD deprecation warnings found in V6 as the drift source
2. Evolution patch may overfit to one test — mitigation: verify across related tests
3. AntD migration may introduce unexpected regressions — mitigation: incremental migration with e2e validation after each change

### Success Criteria

1. At least one complete self-evolution cycle documented end-to-end
2. Controlled drift causes a real e2e test failure
3. Diagnosis correctly classifies the failure type
4. Evolution candidate is produced and linked to evidence
5. Minimal patch fixes the test with no regressions
6. Full cycle archived as a reusable example
7. AntD migration completed for identified deprecations

---

## Sub-Requirement Record (SR)

### SR-1: Controlled UI Drift Scenario

Introduce a controlled UI drift by applying a real AntD deprecation fix (Button.Group → Space.Compact) in one component. This simulates real-world UI drift where a library update changes component structure, causing existing test selectors to break.

Output: Modified component with new AntD API, e2e test that fails due to selector/structure change.

### SR-2: E2E Test Failure + Diagnosis

Run the e2e test suite after the drift. Identify the failing test(s). Classify the failure:
- Type: UI drift (component structure changed)
- Root cause: AntD API migration changed DOM structure
- Confidence: High (reproducible, linked to specific commit)
- Evidence: test error output, DOM snapshot comparison

Output: Diagnosis report in `docs/07-evidence/`.

### SR-3: Evolution Candidate Production

Based on the diagnosis, produce evolution candidates:
- Knowledge candidate: Update component-map with new AntD component structure
- Rule candidate (if applicable): Update selector strategy for migrated components
- Skill candidate (if applicable): Update e2e-explorer procedure for new DOM patterns

Output: Entries in evolution queue files.

### SR-4: Minimal Patch Application

Apply the minimal patch:
- Update the e2e test selectors to match the new DOM structure
- Update knowledge maps with the new component information
- Update evolution queue entries with resolution status

Output: Passing tests, updated knowledge maps, resolved evolution entries.

### SR-5: Re-verification

Run the full e2e test suite to confirm:
- The previously failing test now passes
- No regressions in other tests
- `npm run lint` passes
- `npm run build` passes

Output: Green test suite, verification report.

### SR-6: AntD Migration

Complete the AntD migration for deprecations found in V6:
- Button.Group → Space.Compact (all routes using Button.Group)
- Drawer.width → size (skill-list and any other Drawer usages)

Output: Updated components, passing tests, migration evidence.

### SR-7: Archive Report

Archive the full self-evolution cycle:
- Evidence links
- Diagnosis report
- Evolution candidates
- Patch details
- Verification results
- Lessons learned

Output: Archive report in `docs/07-evidence/phase-7-self-evolution-validation.md`.

### V7 Minor Version Sequence

| Minor | Scope |
| --- | --- |
| V7.1 | Controlled drift (AntD Button.Group → Space.Compact) + failing test |
| V7.2 | Diagnosis + evolution candidate + knowledge update |
| V7.3 | Minimal patch + re-verification + full cycle archive |
| V7.4 | AntD Drawer migration + code splitting evaluation + V7 close |
