# frontend-skill-forge Phase 1 Prompt

> Version: v1  
> Phase: Phase 1  
> Theme: Frontend MCP Evidence Collection and Self-Evolving Skill Mechanism  
> Goal: Establish the frontend-specific governance layer that differentiates this project from normal backend AI Harness projects.

---

# 1. Task

Continue from Phase 0 of `frontend-skill-forge`.

Phase 1 must focus on the frontend-specific AI Harness layer:

```text
Frontend MCP Exploration
+ UI Evidence Collection
+ E2E Asset Modeling
+ Skill / Rule / Knowledge Evolution
= Frontend-Specific Self-Evolving Agent Harness
```

Do not implement complex business features in Phase 1.

The goal is to establish the document and asset structure that supports:

1. Playwright / MCP based frontend exploration.
2. UI evidence collection.
3. Route / page / component discovery evidence.
4. E2E asset lifecycle.
5. UI drift diagnosis.
6. Skill / Rule / Knowledge self-evolution.
7. Human feedback driven correction.
8. Clear separation between general Harness and frontend-specific evolution assets.

---

# 2. Phase 1 Scope

Phase 1 is a governance and asset-structure phase.

Allowed:

- Add frontend-specific docs directories.
- Add Markdown templates.
- Add JSON / YAML schema-like lightweight templates.
- Add evidence index templates.
- Add Playwright MCP exploration procedure documents.
- Add Skill evolution procedure documents.
- Add UI evidence capture templates.
- Add example placeholder evidence files.
- Update README index files.
- Update Phase 1 evidence report.

Not allowed:

- Do not build complex task creation business pages.
- Do not create real backend.
- Do not create database.
- Do not introduce micro-frontend runtime.
- Do not create real OpenSpec change.
- Do not write complete production-grade Skills.
- Do not modify unrelated source files.
- Do not collapse docs into a flat `docs/ai` directory.
- Do not put AI governance documents at root.

---

# 3. Updated Docs Architecture

Keep the unified governance structure from Phase 0, but add one frontend-specific layer.

The updated `docs/` structure must be:

```text
docs/
├── 00-project/
├── 01-architecture/
├── 02-harness/
├── 03-openspec/
├── 04-development/
├── 05-domain/
├── 06-operations/
├── 07-evidence/
└── 08-frontend-agent/
```

`docs/08-frontend-agent/` is mandatory.

It is the dedicated layer for frontend MCP, UI evidence, E2E asset lifecycle, and self-evolving frontend Skills.

---

# 4. Responsibility Boundary

## 4.1 docs/02-harness

`docs/02-harness` remains the general AI Harness governance layer.

It owns:

- Agent workflow
- Generic agent rules
- Git governance
- Verification policy
- Generic Skill lifecycle rules
- General Skill / Rule / Knowledge structure

It must not become a dumping ground for frontend-specific MCP evidence.

## 4.2 docs/08-frontend-agent

`docs/08-frontend-agent` owns frontend-specific agent capabilities.

It owns:

- Frontend MCP exploration protocol
- Playwright MCP operation policy
- UI evidence collection
- Page snapshot catalog
- Route discovery records
- Component discovery records
- Interaction trace records
- E2E asset registry
- UI drift records
- Frontend Skill evolution queue
- Frontend Rule evolution queue
- Human feedback records
- Evidence-to-skill promotion records

This is the key differentiator from a normal backend Harness project.

---

# 5. Required Directory Structure

Create:

```text
docs/08-frontend-agent/
├── README.md
├── frontend-agent-architecture.md
├── mcp-exploration-protocol.md
├── playwright-mcp-policy.md
├── ui-evidence-policy.md
├── e2e-asset-lifecycle.md
├── ui-drift-diagnosis.md
├── self-evolution-mechanism.md
│
├── mcp/
│   ├── README.md
│   ├── exploration-session-template.md
│   ├── page-observation-template.md
│   ├── interaction-trace-template.md
│   └── selector-stability-guide.md
│
├── evidence/
│   ├── README.md
│   ├── evidence-capture-template.md
│   ├── evidence-index-template.md
│   ├── route-discovery-template.md
│   ├── component-discovery-template.md
│   ├── ui-state-snapshot-template.md
│   └── failure-diagnosis-template.md
│
├── e2e-assets/
│   ├── README.md
│   ├── e2e-case-registry-template.md
│   ├── smoke-test-contract.md
│   ├── regression-test-contract.md
│   └── test-data-policy.md
│
├── evolution/
│   ├── README.md
│   ├── skill-evolution-queue.md
│   ├── rule-evolution-queue.md
│   ├── knowledge-evolution-queue.md
│   ├── evidence-to-skill-promotion.md
│   ├── human-feedback-log.md
│   └── evolution-decision-record-template.md
│
└── schemas/
    ├── README.md
    ├── mcp-session.schema.json
    ├── ui-evidence.schema.json
    ├── e2e-asset.schema.json
    └── skill-evolution.schema.json
```

These files are lightweight governance assets. Keep content concise, structured, and executable by weaker coding agents.

---

# 6. Required Content Rules

Each document must contain:

```md
# <Document Title>

Status: Draft

## Purpose

## Scope

## Rules

## Outputs
```

For template documents, include a copyable template section.

For JSON schema files, use lightweight JSON objects. Do not introduce complex formal schemas.

Example:

```json
{
  "status": "draft",
  "purpose": "Describe the minimal shape of a frontend MCP exploration session record.",
  "fields": {
    "sessionId": "string",
    "route": "string",
    "goal": "string",
    "observations": "array",
    "evidenceRefs": "array",
    "nextActions": "array"
  }
}
```

Do not over-engineer.

---

# 7. Frontend MCP Exploration Protocol

`docs/08-frontend-agent/mcp-exploration-protocol.md` must define the standard loop:

```text
Prepare Route
→ Open Page
→ Observe UI
→ Capture Snapshot
→ Interact
→ Record Selector Evidence
→ Compare Expected Behavior
→ Diagnose Drift
→ Update E2E Asset
→ Queue Skill / Rule / Knowledge Evolution
```

It must define:

1. When to explore.
2. What to capture.
3. How to name evidence.
4. How to record selectors.
5. How to distinguish UI failure from test failure.
6. How to decide whether a Skill / Rule / Knowledge update is needed.
7. How to avoid over-updating Skills.

---

# 8. UI Evidence Policy

`docs/08-frontend-agent/ui-evidence-policy.md` must define evidence types:

```text
route-snapshot
page-screenshot
dom-observation
selector-candidate
interaction-trace
network-observation
console-observation
test-result
failure-diagnosis
human-feedback
skill-evolution-decision
```

It must define:

1. Required metadata.
2. Storage naming convention.
3. Relationship with `docs/07-evidence`.
4. What counts as valid evidence.
5. What does not count as valid evidence.
6. Evidence retention rules.

---

# 9. Self-Evolution Mechanism

`docs/08-frontend-agent/self-evolution-mechanism.md` must define:

```text
Evidence
→ Diagnosis
→ Evolution Candidate
→ Human / Agent Review
→ Skill / Rule / Knowledge Patch
→ Verification
→ Archive
```

It must explain:

1. Skill evolution trigger.
2. Rule evolution trigger.
3. Knowledge evolution trigger.
4. When not to evolve.
5. Required verification before accepting an evolution.
6. How to prevent unstable evidence from corrupting Skills.
7. How to link an evolution decision back to evidence.

---

# 10. E2E Asset Lifecycle

`docs/08-frontend-agent/e2e-asset-lifecycle.md` must define:

```text
Discovery
→ Smoke Contract
→ Regression Candidate
→ Stable Regression Asset
→ Drift Diagnosis
→ Retirement
```

It must explain:

1. What starts as smoke test.
2. What can become regression test.
3. How MCP evidence feeds test generation.
4. How failed tests produce evolution candidates.
5. How to retire unstable tests.

---

# 11. README Updates

Update these index files:

```text
docs/README.md
docs/02-harness/README.md
docs/07-evidence/README.md
docs/08-frontend-agent/README.md
```

If `docs/README.md` does not exist, create it.

`docs/README.md` must include `08-frontend-agent` as a first-class governance section.

---

# 12. Git Governance

Work on a dedicated branch:

```bash
git checkout -b harness/frontend-agent-mcp-evolution-foundation
```

If it already exists:

```bash
git checkout harness/frontend-agent-mcp-evolution-foundation
```

Do not commit directly to `main`.

Before every commit:

```bash
git status --short
git diff --stat
git diff --name-only
```

---

# 13. Commit Plan

Use separate commits.

## Commit 1

```bash
git commit -m "harness: add frontend agent governance layer"
```

Scope:

- `docs/08-frontend-agent/README.md`
- `frontend-agent-architecture.md`
- `mcp-exploration-protocol.md`
- `playwright-mcp-policy.md`
- `ui-evidence-policy.md`
- `e2e-asset-lifecycle.md`
- `ui-drift-diagnosis.md`
- `self-evolution-mechanism.md`

## Commit 2

```bash
git commit -m "harness: add frontend mcp evidence templates"
```

Scope:

- `docs/08-frontend-agent/mcp/*`
- `docs/08-frontend-agent/evidence/*`

## Commit 3

```bash
git commit -m "harness: add frontend e2e and evolution templates"
```

Scope:

- `docs/08-frontend-agent/e2e-assets/*`
- `docs/08-frontend-agent/evolution/*`
- `docs/08-frontend-agent/schemas/*`

## Commit 4

```bash
git commit -m "docs: update governance index for frontend agent layer"
```

Scope:

- `docs/README.md`
- `docs/02-harness/README.md`
- `docs/07-evidence/README.md`
- Any related index updates

## Commit 5

```bash
git commit -m "evidence: add phase 1 frontend agent foundation verification"
```

Scope:

- `docs/07-evidence/phase-1-frontend-agent-foundation-verification.md`

---

# 14. Validation

Run:

```bash
npm run build
npm run test:e2e
```

Also run directory checks.

Linux/macOS:

```bash
test -d docs/08-frontend-agent
test -f docs/08-frontend-agent/mcp-exploration-protocol.md
test -f docs/08-frontend-agent/ui-evidence-policy.md
test -f docs/08-frontend-agent/self-evolution-mechanism.md
test -f docs/08-frontend-agent/e2e-asset-lifecycle.md
test -d docs/08-frontend-agent/mcp
test -d docs/08-frontend-agent/evidence
test -d docs/08-frontend-agent/e2e-assets
test -d docs/08-frontend-agent/evolution
test -d docs/08-frontend-agent/schemas
test ! -d skills
test ! -d rules
test ! -d knowledge
test ! -d harness
test ! -d superpower
```

Windows PowerShell:

```powershell
if (-not (Test-Path docs/08-frontend-agent)) { throw "Missing docs/08-frontend-agent" }
if (-not (Test-Path docs/08-frontend-agent/mcp-exploration-protocol.md)) { throw "Missing mcp-exploration-protocol.md" }
if (-not (Test-Path docs/08-frontend-agent/ui-evidence-policy.md)) { throw "Missing ui-evidence-policy.md" }
if (-not (Test-Path docs/08-frontend-agent/self-evolution-mechanism.md)) { throw "Missing self-evolution-mechanism.md" }
if (-not (Test-Path docs/08-frontend-agent/e2e-asset-lifecycle.md)) { throw "Missing e2e-asset-lifecycle.md" }
if (-not (Test-Path docs/08-frontend-agent/mcp)) { throw "Missing docs/08-frontend-agent/mcp" }
if (-not (Test-Path docs/08-frontend-agent/evidence)) { throw "Missing docs/08-frontend-agent/evidence" }
if (-not (Test-Path docs/08-frontend-agent/e2e-assets)) { throw "Missing docs/08-frontend-agent/e2e-assets" }
if (-not (Test-Path docs/08-frontend-agent/evolution)) { throw "Missing docs/08-frontend-agent/evolution" }
if (-not (Test-Path docs/08-frontend-agent/schemas)) { throw "Missing docs/08-frontend-agent/schemas" }

if (Test-Path skills) { throw "Root skills directory is forbidden" }
if (Test-Path rules) { throw "Root rules directory is forbidden" }
if (Test-Path knowledge) { throw "Root knowledge directory is forbidden" }
if (Test-Path harness) { throw "Root harness directory is forbidden" }
if (Test-Path superpower) { throw "Root superpower directory is forbidden" }
```

---

# 15. Phase 1 Verification Report

Create:

```text
docs/07-evidence/phase-1-frontend-agent-foundation-verification.md
```

Use this template:

```md
# Phase 1 Frontend Agent Foundation Verification

## Branch

## Commit List

## Changed Files Summary

## Validation Commands

| Command | Result | Notes |
|---|---|---|

## Frontend Agent Governance Check

| Check | Result | Notes |
|---|---|---|

## MCP / Evidence / Evolution Assets

| Asset Area | Result | Notes |
|---|---|---|

## Known Issues

## Next Phase Recommendation
```

---

# 16. Final Output Required

Return factual execution results only.

Must include:

1. Project repository path.
2. Current branch.
3. Key commands executed.
4. Commit list.
5. Changed file summary.
6. `npm run build` result.
7. `npm run test:e2e` result.
8. Frontend agent directory check result.
9. Root forbidden directory check result.
10. Verification report path.
11. Commit SHAs.
12. Any unresolved issue.

Do not claim success without command output.
Do not give vague summaries.
