# V2 Scope Record

Status: Draft baseline

Version: V2-SR

Date: 2026-06-07

## Purpose

Define the scoped runtime surfaces and constraints for V2.

## In-Scope Runtime Surfaces

### Surface 1: Dashboard

The dashboard should evolve from a heading placeholder into an operator-style page that includes:

- status summary cards
- recent activity or event timeline
- alerts or exception queue
- filterable summary regions
- at least one detail drawer or expanded panel

### Surface 2: Task List

The task list should become a dense exploration surface that includes:

- filter panel with multiple criteria
- sortable table or list view
- tabs or saved views
- row selection and batch-action affordances
- detail drawer, side panel, or inline expansion
- explicit empty, loading, and error states

### Surface 3: Task Creation

The task creation page should become a complex form surface that includes:

- multistep or sectioned flow
- conditional fields
- validation states
- draft or preview behavior
- helper content or contextual guidance
- submission success and failure states

## Supporting Scope

V2 may also include:

- mock data adapters
- state-management helpers local to the pages
- testability helpers and explicit stable selectors
- shared UI primitives required by the new surfaces
- richer Playwright coverage for the implemented pages

## Out-of-Scope Runtime Work

V2 does not include:

- real backend APIs
- authentication complexity beyond current scaffold needs
- server persistence
- unrelated redesign of repository governance

## Verification Expectations

Any V2 code-bearing iteration should assume that:

- `npm run build` is mandatory
- `npm run test:e2e` must expand beyond the current single smoke test as surfaces become real
- visible UI states should be intentionally testable rather than incidental
