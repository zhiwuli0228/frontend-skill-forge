# frontend-skill-forge Architecture Blueprint and Development Manual

> Version: 0.8  
> Baseline Branch: `master`  
> Repository: `zhiwuli0228/frontend-skill-forge`  
> Document Role: Project-level development manual for Codex, Claude Code, and future AI agents.  
> Status: Active / Canonical Blueprint

---

## 1. Project Positioning

`frontend-skill-forge` is not a normal React demo, not a Todo application, and not a pure Playwright E2E project.

It is a React-first, evidence-driven, self-evolving frontend Agent Harness project.

The system is designed to help AI agents work safely and effectively inside complex existing frontend codebases.

Core goals:

1. Help AI agents understand complex frontend projects quickly.
2. Help AI agents make controlled incremental frontend changes.
3. Help AI agents explore UI through Playwright / MCP.
4. Convert UI exploration into structured evidence.
5. Convert evidence into E2E assets.
6. Convert repeated evidence and failures into Skill / Rule / Knowledge evolution.
7. Maintain strict Git traceability and verification evidence.
8. Keep React as the first reference stack while keeping the protocol portable to other frontend stacks.

The project formula is:

```text
Frontend Code Understanding
+ Incremental Coding Control
+ MCP / Playwright UI Exploration
+ UI Evidence Collection
+ E2E Asset Lifecycle
+ Skill / Rule / Knowledge Evolution
= Self-Evolving Frontend Agent Harness
```

---

## 2. Non-Goals

The following directions are explicitly out of scope:

1. Do not build a normal Todo demo.
2. Do not build real backend services.
3. Do not introduce a database.
4. Do not introduce Next.js in the current baseline.
5. Do not introduce a micro-frontend runtime.
6. Do not model Horizon, OpenStack, or cloud platform business concepts.
7. Do not treat React as the permanent architecture boundary.
8. Do not treat Playwright tests as the final product.
9. Do not allow AI agents to make broad unreviewed changes.
10. Do not scatter AI governance files at repository root.

---

## 3. Current Baseline

The current repository baseline has:

```text
docs/
openspec/
public/
src/
tests/
package.json
playwright.config.ts
vite.config.ts
tsconfig*.json
eslint.config.js
README.md
```

Current technology baseline:

```text
React
TypeScript
Vite
React Router
Ant Design
Playwright
OpenSpec / SuperSpec skeleton
Markdown / JSON / YAML governance assets
```

Current route baseline:

```text
/login
/dashboard
/task/list
/task/create
```

Current `docs` governance baseline:

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
├── 08-frontend-agent/
└── 09-change-records/
```

This `docs` structure is now part of the architecture and must not be flattened.

---

## 3.1 Current Maturity Snapshot

As of 2026-06-07, the project is no longer only an architecture seed. It has already validated the main harness loop inside this repository.

Current assessment:

| Dimension | Score | Meaning |
| --- | --- | --- |
| Core loop readiness | 9/10 | Understanding, exploration, evidence, verification, evolution, and archive all work together. |
| Documentation asset completeness | 8/10 | Maps, evidence, skills, and evolution queues are established. |
| Single-project agent usability | 7.5/10 | Agents can work in this repo with materially reduced understanding cost. |
| Automation level | 5.5/10 | Many safeguards are still procedural rather than executable. |
| Real-project migration readiness | 5/10 | The approach is not yet validated on a large existing frontend system. |
| Long-term maintenance cost | 5/10 | Knowledge and evidence freshness still depend too much on manual upkeep. |

Architecture implication:

```text
The primary risk is no longer missing structure.
The primary risk is process drift caused by insufficient automation.
```

That means future work should prefer:

1. executable guardrails over more prose,
2. freshness mechanisms over more static maps,
3. migration trials over self-referential refinement.

---

## 4. Architecture Principle

The project must be driven by architecture layers, not by one-off prompts.

The correct development order is:

```text
Architecture Blueprint
→ Governance Rules
→ Evidence Contracts
→ Minimal Runtime Capability
→ E2E Asset Lifecycle
→ Skill / Rule / Knowledge Evolution
→ Iterative Demo Expansion
```

Do not continue with isolated execution prompts unless they are derived from this blueprint.

Every future Codex / Claude Code task must answer:

1. Which architecture layer does this change belong to?
2. Which evidence proves the change is valid?
3. Which Skill / Rule / Knowledge asset may be affected?
4. Which tests verify the change?
5. Which commit contains the change?
6. Which report archives the result?

---

## 5. Top-Level Architecture

The project has six major architecture domains:

```text
1. Runtime App Layer
2. Testability Layer
3. Frontend Agent Layer
4. General Harness Layer
5. OpenSpec / SuperSpec Layer
6. Evidence and Evolution Layer
```

### 5.1 Runtime App Layer

Location:

```text
src/
```

Responsibility:

1. Provide a minimal but expandable React application.
2. Provide routes and UI surfaces for exploration.
3. Provide realistic frontend structures for AI agents to read.
4. Provide stable UI targets for Playwright and MCP.
5. Avoid business complexity until evidence and governance are ready.

Current structure target:

```text
src/
├── app/
├── shell/
├── domains/
├── capabilities/
├── adapters/
├── variants/
├── testability/
└── shared/
```

### 5.2 Testability Layer

Location:

```text
src/testability/
tests/
playwright.config.ts
```

Responsibility:

1. Expose stable UI selectors and test seams.
2. Keep E2E tests aligned with evidence records.
3. Avoid brittle selectors.
4. Prefer accessible role selectors.
5. Use `data-testid` only when accessible selectors are unavailable or unstable.

### 5.3 Frontend Agent Layer

Location:

```text
docs/08-frontend-agent/
```

Responsibility:

1. MCP exploration protocol.
2. Playwright MCP operation policy.
3. UI evidence collection.
4. Route / page / component discovery.
5. Selector candidate records.
6. E2E asset lifecycle.
7. UI drift diagnosis.
8. Skill / Rule / Knowledge evolution candidates.
9. Human feedback integration.

This is the project's frontend-specific differentiator.

### 5.4 General Harness Layer

Location:

```text
docs/02-harness/
```

Responsibility:

1. General AI agent workflow.
2. Git governance.
3. Change boundary rules.
4. Verification policy.
5. Generic Skill / Rule / Knowledge lifecycle.
6. Agent behavior constraints.

This layer is generic. It must not store frontend-specific evidence.

### 5.5 OpenSpec / SuperSpec Layer

Locations:

```text
openspec/
docs/03-openspec/
```

Responsibility:

1. Tool-level OpenSpec / SuperSpec configuration.
2. Specification governance.
3. Change governance.
4. Superpower mission and power governance.
5. Future structured design changes.

Phase 0 and Phase 1 only establish skeletons. Real changes must be introduced only when the architecture is stable enough.

### 5.6 Evidence and Evolution Layer

Locations:

```text
docs/07-evidence/
docs/08-frontend-agent/evidence/
docs/08-frontend-agent/evolution/
docs/02-harness/knowledge/
```

Responsibility:

1. Archive verification reports.
2. Store UI evidence records.
3. Store evolution candidates.
4. Update knowledge maps from verified evidence.
5. Prevent unstable evidence from corrupting Skills and Rules.

---

## 6. Repository Directory Contract

### 6.1 Root Directory

Allowed root-level entries:

```text
.claude/
docs/
openspec/
public/
src/
tests/
.gitignore
README.md
eslint.config.js
index.html
package.json
package-lock.json
playwright.config.ts
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

Forbidden root-level AI document directories:

```text
skills/
rules/
knowledge/
harness/
superpower/
```

Rationale:

AI governance assets must be indexed through `docs/`, except tool-required roots such as `openspec/` or `.claude/`.

### 6.2 Docs Directory

Required structure:

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
├── 08-frontend-agent/
└── 09-change-records/
```

No future phase may replace this with `docs/ai/`.

---

## 7. Docs Layer Responsibilities

### 7.1 `docs/00-project`

Owns:

1. Project overview.
2. Roadmap.
3. Current status.
4. Glossary.
5. Decision summary.

Must answer:

```text
What is this project?
Why does it exist?
What phase is it in?
What should not be done?
```

### 7.2 `docs/01-architecture`

Owns:

1. Architecture guide.
2. Module boundaries.
3. Route architecture.
4. Frontend layering.
5. Architecture decisions.

Must answer:

```text
How is the project structured?
Where should code go?
What are the boundaries?
What decisions are already made?
```

### 7.3 `docs/02-harness`

Owns general AI Harness:

1. Agent workflow.
2. Agent rules.
3. Git governance.
4. Verification policy.
5. Skill evolution policy.
6. Generic Skills.
7. Generic Rules.
8. Generic Knowledge.

Must not contain frontend-specific UI evidence.

### 7.4 `docs/03-openspec`

Owns:

1. OpenSpec usage.
2. SuperSpec usage.
3. Change governance.
4. Superpower governance.

Root `openspec/` is the tool entrypoint. `docs/03-openspec/` is the human/agent governance layer.

### 7.5 `docs/04-development`

Owns:

1. Local development.
2. Coding guide.
3. Testing guide.
4. Evidence rules.
5. Build and validation rules.

### 7.6 `docs/05-domain`

Owns conceptual domains:

1. Frontend understanding domain.
2. Incremental coding domain.
3. E2E exploration domain.
4. Future benchmark domain.

This layer explains problem-space concepts, not implementation details.

### 7.7 `docs/06-operations`

Owns:

1. Troubleshooting.
2. Release notes.
3. Operational constraints.
4. Local execution issues.

### 7.8 `docs/07-evidence`

Owns cross-cutting verification reports:

1. Phase verification reports.
2. Build verification.
3. Test verification.
4. Architecture acceptance reports.
5. Evidence index summaries.

It does not replace `docs/08-frontend-agent/evidence/`.

### 7.9 `docs/08-frontend-agent`

Owns frontend-specific AI agent capability:

1. MCP exploration.
2. UI evidence.
3. E2E asset lifecycle.
4. UI drift diagnosis.
5. Frontend-specific self-evolution.
6. Human feedback loop.
7. Evidence-to-skill promotion.

This layer is mandatory and is the key difference from backend Harness projects.

### 7.10 `docs/09-change-records`

Owns the unified change ledger:

1. Current version authority.
2. User decision ledger.
3. Version baseline outputs.
4. One release record per version.
5. Version workflow and closure rules.

This layer is the primary archive for version progression and release conclusions. It does not replace verification evidence or frontend-specific evidence.

---

## 8. Runtime Source Architecture

Target source structure:

```text
src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   └── providers.tsx
├── shell/
│   ├── layout/
│   └── navigation/
├── domains/
│   ├── auth/
│   ├── dashboard/
│   └── task/
├── capabilities/
├── adapters/
├── variants/
├── testability/
└── shared/
```

### 8.1 `src/app`

Owns application bootstrapping:

1. Root app component.
2. Router creation.
3. Provider composition.
4. Global app wiring.

Rules:

1. Do not put business UI in `src/app`.
2. Do not put domain-specific logic in `src/app`.
3. Use this layer only for composition.

### 8.2 `src/shell`

Owns application shell:

1. Layout.
2. Navigation.
3. Global frame.
4. Menu structure.

Rules:

1. Shell can reference routes.
2. Shell must not own domain business logic.
3. Shell must expose stable navigation labels.

### 8.3 `src/domains`

Owns domain-facing pages and future feature modules.

Current domains:

```text
auth
dashboard
task
```

Rules:

1. Keep page components close to their domain.
2. Do not create cross-domain coupling.
3. Do not put shared reusable UI here.

### 8.4 `src/capabilities`

Future home for reusable frontend capabilities.

Examples:

```text
route-discovery
form-introspection
table-introspection
permission-boundary
mock-contract
```

No complex capability should be added before evidence proves the need.

### 8.5 `src/adapters`

Future home for external or tool adapters.

Examples:

```text
mock-api adapter
storage adapter
playwright evidence adapter
mcp metadata adapter
```

### 8.6 `src/variants`

Future home for project adaptation variants.

Purpose:

1. React-first reference implementation.
2. Potential migration to Vue / Angular / other frontend stacks.
3. Project-specific adaptations.

### 8.7 `src/testability`

Home for runtime testability helpers.

Allowed content:

1. Test IDs.
2. Stable selector helpers.
3. Accessibility conventions.
4. Evidence metadata helpers.

Forbidden:

1. Business logic.
2. Test-only hacks that alter user behavior.
3. CSS-class-based selector contracts.

### 8.8 `src/shared`

Home for shared UI primitives and utilities.

Rules:

1. Shared components must be domain-neutral.
2. Shared components must not import domain pages.
3. Shared UI should support accessibility and stable selection.

---

## 9. Frontend Agent Architecture

The frontend agent layer must support this loop:

```text
Prepare Target
→ Explore UI
→ Capture Evidence
→ Diagnose Gaps
→ Register E2E Asset
→ Propose Evolution
→ Verify
→ Archive
```

### 9.1 Exploration Target

A target can be:

1. Route.
2. Page.
3. Component.
4. Form.
5. Table.
6. Modal.
7. Workflow.
8. Error state.
9. Permission state.
10. Data-loading state.

### 9.2 Evidence Types

Standard evidence types:

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

### 9.3 Evidence Record

Each UI evidence record must include:

1. Evidence ID.
2. Capture method.
3. Route / page / component target.
4. Timestamp or phase.
5. Preconditions.
6. Observed UI.
7. Selector candidates.
8. Test implications.
9. Skill / Rule / Knowledge implications.
10. Related files.
11. Known limitations.

### 9.4 MCP Session Record

Each MCP exploration session must include:

1. Session goal.
2. Tool used.
3. Routes covered.
4. Interactions performed.
5. Observations.
6. Evidence produced.
7. Failures.
8. Evolution candidates.
9. Follow-up tasks.

### 9.5 Selector Policy

Preferred selector order:

```text
1. Role + accessible name
2. Label text
3. Visible text
4. Stable semantic attribute
5. data-testid
6. DOM structure fallback
```

Forbidden as primary selectors:

```text
generated CSS class
deep nth-child path
layout-only selector
unstable Ant Design internal class
```

`data-testid` is allowed only when accessible selectors are not stable enough.

---

## 10. E2E Asset Lifecycle

E2E assets are not just tests. They are evidence-backed verification assets.

Lifecycle:

```text
Discovery
→ Smoke Candidate
→ Smoke Asset
→ Regression Candidate
→ Stable Regression Asset
→ Drift Diagnosis
→ Retirement
```

### 10.1 Discovery

A route, component, or workflow is discovered through:

1. Source inspection.
2. MCP exploration.
3. Playwright execution.
4. Human feedback.
5. Failure investigation.

### 10.2 Smoke Candidate

A candidate becomes smoke-worthy when it proves:

1. Route is reachable.
2. Page renders expected heading or landmark.
3. Basic shell remains stable.
4. No major console or runtime error blocks the page.

### 10.3 Regression Candidate

A candidate becomes regression-worthy when it covers:

1. Critical workflow.
2. Previously failed behavior.
3. High-risk UI interaction.
4. Repeated human feedback.
5. Known brittle area.

### 10.4 Stable Regression Asset

A regression candidate becomes stable when:

1. Selector strategy is stable.
2. Test data is controlled.
3. Evidence record exists.
4. Failure diagnosis path exists.
5. Test passes consistently.

### 10.5 Drift Diagnosis

When a test fails, classify it as:

```text
expected product change
UI drift
selector drift
test design flaw
environment failure
runtime bug
unknown
```

### 10.6 Retirement

Retire an E2E asset when:

1. Feature is removed.
2. Route is deprecated.
3. Test duplicates stronger coverage.
4. Selector cannot be stabilized.
5. Evidence proves the asset no longer represents product behavior.

---

## 11. Self-Evolution Architecture

Skill / Rule / Knowledge changes must not happen casually.

Evolution loop:

```text
Evidence
→ Diagnosis
→ Evolution Candidate
→ Review
→ Minimal Patch
→ Verification
→ Archive
```

### 11.1 Skill Evolution Trigger

A Skill evolution candidate may be created when:

1. Agent repeatedly misunderstands route structure.
2. Agent misses important frontend evidence.
3. Agent makes unsafe broad edits.
4. Agent fails to use MCP / Playwright correctly.
5. Agent creates brittle E2E tests.
6. Human feedback identifies missing procedure.

### 11.2 Rule Evolution Trigger

A Rule evolution candidate may be created when:

1. A boundary violation happens.
2. A selector policy violation happens.
3. A Git governance issue happens.
4. A verification gap is detected.
5. Repeated ambiguity needs a hard rule.

### 11.3 Knowledge Evolution Trigger

A Knowledge update may happen when:

1. Routes change.
2. Components change.
3. State flow changes.
4. API contracts change.
5. UI evidence discovers new behavior.
6. E2E assets prove stable behavior.

### 11.4 When Not to Evolve

Do not update Skills / Rules / Knowledge when:

1. Evidence is from one unstable failure only.
2. The issue is environmental.
3. The source change is uncommitted.
4. The observation is not reproducible.
5. The patch would overfit to one page.
6. The update is speculative.

### 11.5 Evolution Acceptance Criteria

An evolution patch is accepted only when:

1. It links to evidence.
2. It has a clear problem statement.
3. It is minimal.
4. It does not conflict with existing rules.
5. It passes build and E2E validation.
6. It is archived in `docs/07-evidence`.

---

## 12. Skill Architecture

Initial Skill set:

```text
frontend-project-reader
frontend-incremental-coder
frontend-e2e-explorer
skill-evolution-maintainer
```

Location:

```text
docs/02-harness/skills/
```

### 12.1 frontend-project-reader

Purpose:

Help agents read and model a frontend codebase.

Inputs:

1. Source tree.
2. Route map.
3. Component map.
4. UI evidence.
5. E2E registry.

Outputs:

1. Project understanding summary.
2. Route/component dependency map.
3. Risk areas.
4. Suggested evidence targets.

### 12.2 frontend-incremental-coder

Purpose:

Help agents make bounded frontend changes.

Inputs:

1. Change request.
2. Architecture boundary.
3. Existing evidence.
4. Affected routes/components.
5. Verification policy.

Outputs:

1. Minimal change plan.
2. Modified files.
3. Validation result.
4. Evidence update.

### 12.3 frontend-e2e-explorer

Purpose:

Help agents explore UI and create evidence-backed E2E assets.

Inputs:

1. Route target.
2. MCP / Playwright tools.
3. Evidence templates.
4. Selector policy.

Outputs:

1. Exploration session.
2. UI evidence records.
3. Selector candidates.
4. E2E asset candidates.

### 12.4 skill-evolution-maintainer

Purpose:

Help agents evolve Skill / Rule / Knowledge safely.

Inputs:

1. Evidence records.
2. Failure diagnosis.
3. Human feedback.
4. Evolution candidate.

Outputs:

1. Minimal Skill / Rule / Knowledge patch.
2. Verification result.
3. Archive report.

---

## 13. Knowledge Architecture

Location:

```text
docs/02-harness/knowledge/
```

Knowledge is the current project model seen by agents.

Core knowledge assets:

```text
frontend/project-map.md
frontend/route-map.md
frontend/component-map.md
frontend/api-contract-map.md
frontend/state-flow-map.md
evolution/skill-change-log.md
evolution/evidence-index.md
```

Rules:

1. Knowledge must be factual.
2. Knowledge must link to evidence when possible.
3. Unknown areas must be marked as unknown.
4. Deprecated knowledge must be removed or marked stale.
5. Knowledge updates must be committed separately from runtime code when possible.

---

## 14. OpenSpec / SuperSpec Architecture

Root tool layer:

```text
openspec/
├── project.md
├── config.yaml
├── specs/
├── changes/
└── schemas/
    └── superspec/
```

Docs governance layer:

```text
docs/03-openspec/
```

Rules:

1. Root `openspec/` exists because tools expect it.
2. Long-form explanation belongs in `docs/03-openspec/`.
3. SuperSpec must stay introduced as the default schema direction.
4. Do not create real changes until the project has enough stable architecture.
5. Future non-trivial architecture or feature changes should be represented through OpenSpec / SuperSpec once the workflow is mature.

---

## 15. Git Governance

Branches:

```text
main or master      stable branch
bootstrap/*         initialization
harness/*           Harness / Rule / Skill / Knowledge changes
evidence/*          evidence collection and verification
test/*              E2E / test changes
docs/*              documentation-only updates
feature/*           runtime feature changes
fix/*               bug fixes
experiment/*        temporary exploration
```

Commit types:

```text
feat
fix
docs
test
chore
refactor
style
harness
spec
evidence
experiment
```

Forbidden commit messages:

```text
update
fix
wip
misc
改一下
```

Before every commit:

```bash
git status --short
git diff --stat
git diff --name-only
```

Before phase completion:

```bash
npm run build
npm run test:e2e
```

Commit separation rule:

Do not mix these in one commit unless impossible:

1. Runtime source code.
2. Harness docs.
3. OpenSpec / SuperSpec config.
4. E2E tests.
5. Evidence reports.
6. Skill / Rule / Knowledge evolution.

---

## 16. Verification Architecture

Minimum verification levels:

### 16.1 Static Verification

Commands:

```bash
npm run build
```

Purpose:

1. TypeScript build.
2. Vite build.
3. Compile-time regression detection.

### 16.2 E2E Verification

Commands:

```bash
npm run test:e2e
```

Purpose:

1. Route reachability.
2. Basic UI shell behavior.
3. Evidence-backed frontend checks.

### 16.3 Directory Governance Verification

Required checks:

```text
No root-level skills/
No root-level rules/
No root-level knowledge/
No root-level harness/
No root-level superpower/
docs/08-frontend-agent exists
openspec/schemas/superspec exists
```

### 16.4 Evidence Verification

A phase is not complete unless it has:

1. Verification report under `docs/07-evidence/`.
2. Commit list.
3. Changed files summary.
4. Commands executed.
5. Results.
6. Known issues.
7. Next phase recommendation.

---

## 17. Development Roadmap

### Phase 0 — Bootstrap Foundation

Goal:

Create React / TypeScript / Vite foundation, basic routes, Playwright smoke test, docs skeleton, OpenSpec / SuperSpec skeleton.

Status:

Completed in current baseline.

### Phase 1 — Frontend Agent Governance Foundation

Goal:

Create `docs/08-frontend-agent` as the frontend-specific governance layer.

Status:

Completed in current baseline.

### Phase 2 — Architecture Blueprint and Development Manual

Goal:

Create this document as the canonical development manual.

Deliverables:

1. Architecture blueprint.
2. Layer responsibility map.
3. Development rules.
4. Roadmap.
5. Agent handoff protocol.

### Phase 3 — First Evidence Loop

Goal:

Produce first real route-level evidence loop.

Deliverables:

1. Route observation records for current routes.
2. MCP / Playwright exploration session record.
3. E2E asset registry.
4. Route reachability tests.
5. Knowledge map updates.
6. Evolution candidate records.
7. Verification report.

### Phase 4 — Skill v1 Implementation

Goal:

Convert skeleton Skills into usable v1 Skills.

Deliverables:

1. `frontend-project-reader` v1.
2. `frontend-incremental-coder` v1.
3. `frontend-e2e-explorer` v1.
4. `skill-evolution-maintainer` v1.
5. Evidence-backed validation examples.

### Phase 5 — Benchmark Demo Expansion

Goal:

Add realistic frontend benchmark pages.

Possible demo modules:

1. Complex task creation form.
2. Filterable task list.
3. Table with stateful filters.
4. Modal / drawer interactions.
5. Form validation states.
6. Mock API response states.

### Phase 6 — MCP-Assisted Exploration

Goal:

Integrate practical Playwright MCP exploration workflow.

Deliverables:

1. MCP session format.
2. Browser exploration records.
3. Screenshot / DOM / interaction evidence.
4. Selector stability evaluation.
5. Drift diagnosis examples.

### Phase 7 — Self-Evolution Validation

Goal:

Prove Skill / Rule / Knowledge can evolve from evidence.

Deliverables:

1. Controlled UI drift scenario.
2. Failing test.
3. Diagnosis.
4. Evolution candidate.
5. Minimal Skill / Rule patch.
6. Re-verification.
7. Archive report.

Status:

Completed in current baseline.

### Phase 8 — Governance Automation Baseline

Goal:

Reduce reliance on agent self-discipline by turning core documentation obligations into executable checks or assisted generation.

Deliverables:

1. Knowledge-map refresh strategy.
2. Evidence registry generation support.
3. Stale-asset detection for governed docs.
4. Lightweight validation hooks for route/e2e/evidence-sensitive changes.
5. Clear criteria for when map or evidence updates are mandatory.

### Phase 9 — Migration Pilot

Goal:

Validate the harness on a medium-scale existing frontend project rather than only inside this benchmark repository.

Deliverables:

1. Target project selection criteria.
2. First-pass onboarding procedure.
3. Measured cost for map creation and evidence seeding.
4. Recorded agent success/failure patterns.
5. Migration constraints fed back into Skills / Rules / Knowledge.

### Phase 10 — Maintainability Hardening

Goal:

Lower long-term upkeep cost by pruning redundant assets and tightening evidence freshness guarantees.

Deliverables:

1. Asset retirement rules.
2. Promotion thresholds for evidence → knowledge/rule/skill.
3. Simplified recurring maintenance workflow.
4. Support boundary definition for single-project vs multi-project use.

---

## 18. Agent Working Protocol

Every Codex / Claude Code execution must follow:

```text
1. Read this blueprint.
2. Identify target phase.
3. Identify affected architecture layer.
4. Inspect current files.
5. Produce minimal plan.
6. Modify only scoped files.
7. Run required validation.
8. Record evidence.
9. Commit with proper message.
10. Report factual results.
```

### 18.1 Codex Role

Codex should be used for:

1. Architecture planning.
2. Implementation planning.
3. Prompt/task decomposition.
4. Verification design.
5. Documentation-heavy changes.
6. Review of whether changes obey this blueprint.

### 18.2 Claude Code Role

Claude Code should be used for:

1. File modifications.
2. Runtime implementation.
3. Test implementation.
4. Validation execution.
5. Git commit creation.
6. Evidence report generation.

### 18.3 Handoff Contract

Every handoff to Claude Code must include:

```text
Target branch
Target phase
Allowed files
Forbidden files
Validation commands
Evidence report path
Next gate
Canonical artifact links
```

Keep the handoff payload minimal. If the change is already in a downstream
planning bundle, prefer a single link to the accepted IR/SR pair and the next
ready artifact rather than repeating the full workflow.

---

## 19. Future Feature Boundary

Runtime feature development must not start from random pages.

Future frontend demo features must satisfy:

1. They create useful AI-agent exploration difficulty.
2. They produce evidence-worthy UI behavior.
3. They improve Skill / Rule / Knowledge validation.
4. They support E2E asset lifecycle.
5. They avoid backend complexity.

Good candidates:

```text
complex form
data table
filter panel
multi-step wizard
modal interaction
permission-based UI state
loading / error / empty states
route transition
```

Bad candidates:

```text
simple Todo CRUD
real backend integration
database persistence
large unrelated UI redesign
micro-frontend runtime
cloud platform domain model
```

---

## 20. Architecture Decision Records Needed Next

Create ADRs under:

```text
docs/01-architecture/decisions/
```

Recommended ADRs:

```text
0001-use-docs-layered-governance.md
0002-introduce-frontend-agent-layer.md
0003-keep-openspec-root-as-tool-entry.md
0004-use-evidence-before-skill-evolution.md
0005-use-playwright-as-first-e2e-runtime.md
```

Each ADR should include:

```md
# ADR-XXXX: <Title>

Status:

## Context

## Decision

## Consequences

## Evidence
```

---

## 21. Immediate Next Development Plan

The next real implementation phase should be:

```text
Phase 8: Governance Automation Baseline
```

Why this phase is next:

1. Core loop validation is already complete.
2. The highest remaining weakness is automation.
3. More benchmark-page expansion will add maintenance pressure faster than it adds strategic value.
4. Migration validation should happen only after minimal automation guardrails exist.

Recommended workstreams:

```text
knowledge/evidence freshness automation
governance checks for governed changes
trigger rules for map/evidence update obligations
```

Recommended branch:

```bash
git checkout -b harness/governance-automation-baseline
```

Recommended commits:

```text
harness: add governed-change automation baseline
docs: define freshness contract for knowledge and evidence assets
test: add validation coverage for governed change gates
evidence: add phase 8 governance automation verification
```

Phase 8 should avoid large new document trees. It should convert the most important existing expectations into repeatable mechanisms first.

---

## 22. Completion Criteria for This Blueprint

This blueprint is accepted when:

1. It is committed under `docs/01-architecture/`.
2. `docs/README.md` or project README links to it.
3. Future execution prompts cite this blueprint as required reading.
4. Codex / Claude Code tasks are derived from this blueprint.
5. No future task bypasses architecture layer ownership.

Recommended file path in the repository:

```text
docs/01-architecture/frontend-skill-forge-architecture-blueprint.md
```

---

## 23. Final Rule

Do not optimize for writing more documents.

Optimize for this loop:

```text
Evidence
→ Understanding
→ Controlled Change
→ Verification
→ Evolution
→ Archive
```

That loop is the product.
