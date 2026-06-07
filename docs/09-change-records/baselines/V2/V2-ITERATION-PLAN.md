# V2 Iteration Plan

Status: In Progress

Version: V2-plan.1

Date: 2026-06-07

## Purpose

Define the minor-version plan for V2. V2 is the major version for the first code-bearing frontend validation baseline.

## Major Goal

V2 must produce a usable frontend experimentation baseline in which:

- complex pages replace current placeholders
- the V1 governance model continues to control implementation
- the runtime surfaces become rich enough for evidence, E2E, MCP, and evolution experiments

## Minor-Version Strategy

### V2.1 Version Design and Runtime-Surface Architecture

Goal:

- define the V2 scope, page targets, sequencing, and runtime constraints

Required outputs:

- V2 IR
- V2 SR
- design baseline for complex runtime surfaces
- iteration plan
- gate contract
- dispatch contract

Exit gate:

- user accepts that V2 scope and sequencing are clear enough to start page implementation

### V2.2 Dashboard Runtime Baseline

Goal:

- replace the dashboard placeholder with the first complex operations-style surface

Required outputs:

- dashboard implementation baseline
- relevant verification updates
- evidence-ready dashboard states

Exit gate:

- user accepts the dashboard as a valid first runtime surface for V2

### V2.3 Task List Runtime Baseline

Goal:

- build the dense filter/table/detail surface that becomes the main interaction benchmark

Required outputs:

- task-list implementation baseline
- richer interaction coverage
- explicit loading, empty, and error states

Exit gate:

- user accepts the task list as the main exploration-grade data surface

### V2.4 Task Creation Runtime Baseline

Goal:

- build the multistep or sectioned complex form surface

Required outputs:

- task-create implementation baseline
- validation-state coverage
- preview/review or conditional form behavior

Exit gate:

- user accepts the form surface as sufficiently rich for later experiments

### V2.5 Evidence and Integration Closure

Goal:

- prove the implemented pages are usable for later experiments and are covered by stronger verification

Required outputs:

- integrated E2E baseline for the new surfaces
- evidence and knowledge updates
- V2 aggregate readiness assessment

Exit gate:

- user accepts that the first code-bearing experimentation baseline is operational

## Sequencing Rule

- V2.2 must not start before V2.1 is accepted.
- V2.3 must not start before V2.2 is accepted.
- V2.4 must not start before V2.3 is accepted unless a recorded decision changes the order.
- V2.5 must not start before the three runtime surfaces are baselined.

## Major-Version Closure Rule

V2 may close only when:

- all intended minor versions are accepted or explicitly deferred by user decision
- the V2 aggregate summary exists
- the V2 release record exists
- the user explicitly accepts V2 as complete

## Recommended Next Minor Version

Current active minor version: `V2.4 Task Create Runtime Baseline`.

Reason:

- V2.1 has been accepted
- V2.2 and V2.3 have been accepted in sequence
- the task-create page is the next intended runtime surface in the agreed sequence
- the current task-create page remains a placeholder and should become the next implementation proving ground
