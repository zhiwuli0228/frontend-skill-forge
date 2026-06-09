---
name: frontend-task-creation
description: Template skill for creating frontend tasks in a project using page maps, playbooks, and evidence. Adapt before using in your project.
compatibility: opencode
metadata:
  project: frontend-skill-forge
  skill_type: template
  authority: template
---

# Frontend Task Creation Skill (Template)

## Purpose

This Skill template defines a repeatable workflow for creating frontend tasks with minimal context usage and verifiable outputs.

Use this template as a starting point. Before enabling it in a real project, adapt the page-map paths, playbook paths, evidence rules, and failure handling to that project.

## Use When

Use this Skill when:

- The user asks to create, refine, or verify a frontend task.
- The task targets a page, route, UI action, workflow node, or frontend behavior.
- The task benefits from page maps, task playbooks, frontend state checks, or UI evidence.
- The expected output should include scope, operation path, acceptance criteria, and evidence requirements.

Do not use this Skill when:

- The request is unrelated to frontend work.
- A more specific project-local Skill applies.
- Required page map, playbook, or evidence is missing and cannot be inferred safely.

## Required Inputs

Before execution, identify:

- User goal:
- Target page or route:
- Target UI action:
- Expected result:
- Related backend API, if known:
- Related source files, if known:
- Related page map:
- Related task playbook:
- Required evidence:
- Known constraints:

If required inputs are missing, continue only with the safest partial workflow and record missing items under `Missing Information`.

## Workflow

### 1. Confirm Scope

- Restate the concrete frontend task in one sentence.
- Identify the smallest set of pages, files, and references required.
- Do not read unrelated directories recursively.
- Do not load more than one reference document unless required.

### 2. Load Context Lazily

Read only directly relevant context.

Recommended project paths:

- Page maps: `docs/08-frontend-agent/frontend-map/`
- Task playbooks: `docs/08-frontend-agent/task-playbooks/`
- App state rules: `docs/08-frontend-agent/app-state-model.md`
- Evidence rules: `references/` or the project-specific evidence policy

Do not preload all docs.

### 3. Check Frontend State

Before UI work, verify:

- Login state
- Default route or default page
- Current page state
- Loading state
- Empty state
- Permission state
- Disabled controls and likely reason

Do not repeatedly click disabled controls.

### 4. Create the Task

The task must include:

- Goal
- Scope
- Preconditions
- Minimal UI operation path
- Backend mapping, if known
- Source files or page-map references
- Acceptance criteria
- E2E or manual verification steps
- Evidence requirements
- Risks or blockers

### 5. Handle Browser Evidence Safely

- Prefer page maps and playbooks over free exploration.
- Avoid full DOM dumps.
- Convert browser snapshots into Page State Summary.
- Store raw screenshots, traces, and large outputs under project artifacts.
- Reference raw artifacts by path instead of pasting them into the response.

### 6. Produce Output

Return the requested task artifact using the output format below unless the user specifies another format.

## Failure Handling

If blocked, use one of these failure codes:

- `BLOCKED_BY_MISSING_PAGE_MAP`
- `BLOCKED_BY_MISSING_PLAYBOOK`
- `BLOCKED_BY_LOGIN_STATE`
- `BLOCKED_BY_DISABLED_CONTROL`
- `BLOCKED_BY_DYNAMIC_SELECTOR`
- `BLOCKED_BY_CONTEXT_BUDGET`
- `BLOCKED_BY_UNCLEAR_BACKEND_MAPPING`
- `BLOCKED_BY_INSUFFICIENT_EVIDENCE`

For each blocker, include:

- What was attempted
- What evidence exists
- What is missing
- The next safe action

## Context Budget Rules

- Do not paste raw DOM into the response.
- Do not perform repeated full browser snapshots.
- Summarize UI state using Page State Summary.
- Keep `SKILL.md` short and executable.
- Put long explanations, examples, schemas, and troubleshooting notes in `references/`.
- Load references only when needed.

## Output Format

```md
# Frontend Task

## Goal

## Scope

## Missing Information

## Preconditions

## UI Operation Path

## Backend Mapping

## Implementation Notes

## Acceptance Criteria

## Verification Steps

## Evidence Requirements

## Risks / Blockers
```

## References

Use local references only when necessary:

- `references/README.md`
