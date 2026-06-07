# Plan Template

Status: Draft

## Purpose

Define the execution sequence, dispatch boundaries, MCP usage order, and evidence checkpoints before implementation starts.

## Execution Sequence

| Order | Objective | Depends On | Output |
| --- | --- | --- | --- |
| 1 | objective | dependency | output |

## Skill Dispatch Plan

| Step | Skill | Scope Boundary | Deliverable |
| --- | --- | --- | --- |
| 1 | skill name | files / route / task boundary | artifact |

## MCP And Tool Plan

| Step | Tool / MCP | Target | Evidence |
| --- | --- | --- | --- |
| 1 | Playwright MCP / CLI | route or file | snapshot / log / command result |

## Verification Plan

- E2E spec files to add or update:
- Browser flows to execute:
- Evidence files or logs to capture:
- Failure conditions that must block completion:

## Exit Criteria

1. The task list is specific enough to execute without inventing hidden scope.
2. Required skills and MCP usage are named explicitly.
3. Verification has executable commands and expected evidence outputs.
