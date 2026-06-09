---
name: frontend-project-reader
description: Read and model a frontend codebase — produce a project understanding summary that agents can use to navigate, plan changes, and identify risks.
compatibility: opencode
metadata:
  project: frontend-skill-forge
  skill_type: analysis
  authority: project
---

# Frontend Project Reader

## Purpose

Given a project root, produce a project understanding summary that any agent can use to navigate the codebase, plan changes, and identify risks — without re-discovering the structure from scratch.

## Use When

Use this Skill when:

- Starting work on an unfamiliar frontend project
- Planning a change that touches multiple modules
- Needing to understand the route structure, component hierarchy, or state flow
- Onboarding a new agent to the project
- Verifying that knowledge maps are up-to-date after a surface change

Do not use this Skill when:

- Making a trivial single-file fix (just read the file directly)
- The knowledge maps are known to be stale (re-discover first)

## Required Inputs

- Project root (filesystem path)
- Knowledge maps from `docs/02-harness/knowledge/frontend/`:
  - `route-map.md`
  - `component-map.md`
  - `project-map.md`
  - `state-flow-map.md`
  - `api-contract-map.md`
- E2E registry: `docs/08-frontend-agent/e2e-assets/registry.md` (optional)

## Workflow

### 1. Read the Knowledge Maps

Load the 5 knowledge maps into memory. If any status is "Draft", the map is empty — abort and ask the user to populate it first.

### 2. Cross-Reference Routes and Components

For each route in route-map, verify the page component has a matching entry in component-map. For each page component, verify there is a corresponding route. Flag mismatches as "route-component gaps."

### 3. Assess E2E Coverage

For each route, check the "E2E Spec" column. If empty, flag as "uncovered." For covered routes, note test count and classification (smoke/regression).

### 4. Identify Risk Areas

Flag high-risk areas:
- Routes with no e2e coverage → high risk (no regression safety net)
- Components shared by multiple parent pages → medium risk
- State sources not documented in state-flow-map → medium risk
- Mock data files with no `empty*` export → low risk
- Sidebar items sharing a `path` with another item → high risk

### 5. Produce Project Understanding Summary

Compile into a structured markdown document: Overview, Routes, Components, State Flow, Data Layer, E2E Coverage, Risk Areas, Recommended Next Steps. Include a "Last Updated" date matching the most recent knowledge map update.

## Failure Handling

If blocked, use one of these failure codes:

- `BLOCKED_BY_DRAFT_KNOWLEDGE_MAP` — one or more knowledge maps have status "Draft"; populate them first
- `BLOCKED_BY_STALE_KNOWLEDGE_MAP` — "Last Updated" date >2 weeks behind source changes
- `BLOCKED_BY_MISSING_PROJECT_MAP` — `project-map.md` not found; run discovery first
- `BLOCKED_BY_INCONSISTENT_MAPS` — route-component gaps found; maps need reconciliation

For each blocker, include: what was attempted, what evidence exists, what is missing, and the next safe action.

## Context Budget Rules

- Start with route-map + component-map + project-map
- Only load state-flow-map if state behavior matters to the task
- Only load api-contract-map if mock-data structure matters
- Do not read source code directly — this Skill reads knowledge maps, not code
- Keep the summary brief enough to be read in <5 minutes

## Output Format

```md
# Project Understanding Summary

## Overview

## Routes

## Components

## State Flow

## Data Layer

## E2E Coverage
- Covered / uncovered counts
- Test counts and classifications

## Risk Areas
- Severity + rationale

## Recommended Next Steps
```

## References

- `references/README.md` — validation examples, known limitations, cross-references
