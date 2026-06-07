# Knowledge Evolution Queue

Status: Active (V3.4)
Last Updated: 2026-06-07

## Purpose

Track pending Knowledge evolution candidates. A knowledge evolution is a change to one of the files in `docs/02-harness/knowledge/frontend/`.

## Queue

| ID | Candidate | Evidence | Priority | Status | Date |
| --- | --- | --- | --- | --- | --- |
| KE-001 | Add "sidebar item config pattern" entry to `route-map.md` and `component-map.md` | FD-2026-06-07-001, V3.1 knowledge maps (already partially addressed) | high | accepted (V3.1) | 2026-06-07 |
| KE-002 | Add "test the behavior the user is testing" anti-pattern to knowledge map conventions | FD-2026-06-07-001, RETRO-V2.6-V2.10.md | high | pending | 2026-06-07 |
| KE-003 | Add "derive state from URL, don't mirror via useEffect" pattern to `state-flow-map.md` | V2.10 hotfix code review, RETRO-V2.6-V2.10.md | high | pending | 2026-06-07 |
| KE-004 | Add "Ant Design 6 deprecation warnings" inventory to knowledge map | V2.6-V2.10 retro open items | medium | pending | 2026-06-07 |
| KE-005 | Update component-map: Button.Group → Space.Compact migration in SkillFilterBar | V7 drift diagnosis (phase-7-drift-diagnosis.md) | high | accepted (V7.2) | 2026-06-07 |

## Decision Records

### KE-001 (accepted 2026-06-07)

- **Candidate:** Add "sidebar item config pattern" entry
- **Evidence:** FD-2026-06-07-001 showed that sidebar items with identical `path` properties caused silent navigation failure.
- **Decision:** Accept and incorporate into the V3.1 knowledge maps (route-map.md and component-map.md).
- **Action taken:** V3.1 includes the "Pattern: Optional :filter? Param" section in route-map.md and the "Pattern: Sidebar-Filter Indicator" section in component-map.md. These directly address the failure.
- **Outcome:** Knowledge updated.

### KE-002 (pending)

- **Candidate:** Add "test the behavior the user is testing" anti-pattern
- **Evidence:** FD-2026-06-07-001 — 130+ e2e tests passed but the sidebar was broken because no test asserted "clicking a sidebar item navigates to a new URL."
- **Decision:** Defer to V4. The knowledge map conventions are not yet strong enough to absorb this lesson, and a more concrete rule (see RE-001) takes priority.
- **Outcome:** TBD in V4.

### KE-003 (pending)

- **Candidate:** Add "derive state from URL" pattern to state-flow-map.md
- **Evidence:** Initial V2.10 implementation used `useEffect(() => setState(filter))` which was caught by the `react-hooks/set-state-in-effect` lint rule. The fix (derived `effectiveCategory`) is documented in state-flow-map.md §"Source 1: URL-Derived State".
- **Decision:** The fix is already documented; the lesson learned is to PREFER the derived pattern. Promote from "documented" to "highlighted" in V4.
- **Outcome:** TBD in V4.

### KE-004 (pending)

- **Candidate:** Add Ant Design 6 deprecation inventory
- **Evidence:** V2.6-V2.10 retro lists: `Drawer width` (use `size`), `Alert message` (use `title`), `Space direction` (use `orientation`).
- **Decision:** Defer to V5 AntD 6→7 migration. Track as open items in V3.4 issues.
- **Outcome:** TBD in V5.

### KE-005 (accepted 2026-06-07)

- **Candidate:** Update component-map with Button.Group → Space.Compact migration
- **Evidence:** V7 drift diagnosis (phase-7-drift-diagnosis.md) — AntD migration changed SkillFilterBar DOM structure and testids.
- **Decision:** Accept. Update component-map.md to reflect Space.Compact usage and new testids.
- **Action taken:** component-map.md updated with new component structure and testid mapping.
- **Outcome:** Knowledge updated.

## Process

1. Evidence triggers candidate (via failure-diagnosis record, retrospective, or human feedback)
2. Candidate added to queue with `pending` status
3. Validate accuracy (does the evidence actually support the candidate?)
4. Verification before acceptance (does the proposed knowledge change work?)
5. Knowledge updated or rejected

## Rules

- Knowledge must be factually accurate (cite evidence IDs)
- Cite sources when possible (link to evidence records)
- Archive outdated knowledge (move to a "deprecated" section or delete)
- Track all decisions in this file
- One decision record per candidate, kept inline
