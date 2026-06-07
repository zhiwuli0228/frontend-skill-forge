# V7 Baseline

Status: Active

## Purpose

V7 is the **Self-Evolution Validation** major version. It proves the Skill / Rule / Knowledge evolution loop works end-to-end through a controlled UI drift scenario, completing Architecture Blueprint Phase 7.

## Main Outputs

| Type | File |
| --- | --- |
| V7 IR/SR bundle | [V7-IR-SR-PLANNING-BUNDLE.md](./V7-IR-SR-PLANNING-BUNDLE.md) |
| V7 release record | [../../releases/V7.md](../../releases/V7.md) |
| V7 aggregate summary | [../../summaries/V7-AGGREGATE-SUMMARY.md](../../summaries/V7-AGGREGATE-SUMMARY.md) |
| Decision ledger (V7 entries) | [../../current/DECISIONS.md](../../current/DECISIONS.md) |
| Phase 7 verification | [../../../07-evidence/phase-7-self-evolution-validation.md](../../../07-evidence/phase-7-self-evolution-validation.md) |

## V7 Exit Gate

- [x] Controlled UI drift scenario created
- [x] E2E test failure triggered by drift
- [x] Diagnosis report produced
- [x] Evolution candidate created and linked to evidence
- [x] Minimal patch applied
- [x] Re-verification passes (no regressions)
- [x] Full self-evolution cycle archived
- [x] AntD migration completed (Button.Group; Drawer.width not present in codebase)
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] `npm run test:e2e` passes
- [x] User accepts V7 as complete
