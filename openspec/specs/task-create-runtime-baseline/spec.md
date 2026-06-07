# Spec: Task Create Runtime Baseline

Status: Active

## Purpose

Define the functional requirements and observable browser behavior for the task-create runtime baseline.

## Scope

- Capability: dense task creation surface for V2
- Target routes: `/task/create`
- Related components: task-create page and any task-create-local components, supporting shared/testability helpers only when justified

## Functional Requirements

### Requirement: Task Create Presents a Structured Creation Surface

The system MUST replace the current placeholder with a task-create surface that exposes multiple sections relevant to composing a task.

#### Scenario: Loaded creation view

- GIVEN the user opens `/task/create`
- WHEN the page loads successfully
- THEN the page shows a creation heading, form fields, and at least two additional structured regions such as preview, summary, or review context

#### Scenario: Empty draft view

- GIVEN the page has no saved draft or prefilled task data
- WHEN the page renders
- THEN the form shows explicit empty or default state content rather than a blank layout

### Requirement: Task Create Supports Validation and Review Feedback

The system MUST provide visible validation and at least one review-oriented interaction while the user composes a task.

#### Scenario: Validation failure is visible

- GIVEN the form has required fields left blank or invalid
- WHEN the user attempts to submit or preview the task
- THEN the page shows visible field validation or error feedback

#### Scenario: Review preview changes visible state

- GIVEN the user has entered task information
- WHEN the user activates a preview or review control
- THEN a visible preview or review region updates to reflect the entered data

### Requirement: Task Create Supports Progressive Form Interaction

The system MUST allow the user to move through the form in a structured way without leaving the route.

#### Scenario: Section or step interaction changes visible state

- GIVEN the task create surface is in a populated state
- WHEN the user changes a section, step, or tab
- THEN the page shows a visible state transition rather than a no-op behavior

#### Scenario: Draft state can be resumed

- GIVEN the form contains draft data or a saved temporary state
- WHEN the user revisits the page in the same session
- THEN the draft is visible or recoverable in some explicit way

### Requirement: Task Create Exposes Non-Happy-Path States

The system MUST intentionally support loading and error-adjacent states for later verification and evidence collection.

#### Scenario: Loading state

- GIVEN the task create page is waiting for local mock data or simulated draft initialization
- WHEN the page is in loading mode
- THEN visible loading or skeleton UI is shown

#### Scenario: Error state

- GIVEN the page enters an error mode while preparing the form
- WHEN the page renders
- THEN a visible error state appears with useful explanatory text and a recovery affordance if appropriate

## End-To-End Verification Requirements

- Every user-visible requirement must map to a Playwright E2E scenario.
- The E2E scenario must run within the repository's existing `tests/e2e/` framework.
- Verification is incomplete if only unit tests or static checks exist.

## Traceability

| Requirement | E2E Spec | Evidence |
| --- | --- | --- |
| Task Create Presents a Structured Creation Surface | `tests/e2e/task-create-runtime.spec.ts` | loaded-state assertions |
| Task Create Supports Validation and Review Feedback | `tests/e2e/task-create-runtime.spec.ts` | validation and preview assertions |
| Task Create Supports Progressive Form Interaction | `tests/e2e/task-create-runtime.spec.ts` | step transition assertions |
| Task Create Exposes Non-Happy-Path States | `tests/e2e/task-create-runtime.spec.ts` | loading/error assertions |
