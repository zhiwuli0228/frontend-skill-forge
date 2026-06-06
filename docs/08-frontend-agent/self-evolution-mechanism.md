# Self-Evolution Mechanism

Status: Draft

## Purpose

Define the mechanism for evolving Skills, Rules, and Knowledge based on evidence.

## Scope

All evolution activities within the frontend agent layer.

## Rules

### 1. Evolution Flow

```text
Evidence
→ Diagnosis
→ Evolution Candidate
→ Human / Agent Review
→ Skill / Rule / Knowledge Patch
→ Verification
→ Archive
```

### 2. Skill Evolution Trigger

- Repeated test failures on same pattern
- New UI pattern discovered
- Human feedback indicating gap
- Performance regression pattern
- Accessibility issue pattern

### 3. Rule Evolution Trigger

- New edge case discovered
- Existing rule causing false positives
- Rule conflict identified
- Scope expansion needed

### 4. Knowledge Evolution Trigger

- New component pattern
- New interaction pattern
- New API pattern
- New error pattern

### 5. When NOT to Evolve

- Single occurrence without confirmation
- Flaky test evidence
- Mock/stub environment only
- Insufficient context
- Conflicting evidence

### 6. Required Verification

Before accepting evolution:
- Evidence captured at least twice
- Root cause identified
- Human review completed (for Skills)
- Test coverage added
- No regression introduced

### 7. Preventing Unstable Evidence Corruption

- Require confidence threshold (>0.7)
- Multi-occurrence confirmation
- Human review gate for Skills
- Archive superseded versions
- Track evolution rationale

### 8. Evidence-to-Evolution Linking

Every evolution must link to:
- Source evidence IDs
- Diagnosis report
- Human feedback (if applicable)
- Verification results

## Outputs

- Evolution candidates
- Skill / Rule / Knowledge patches
- Verification reports
- Archive records
