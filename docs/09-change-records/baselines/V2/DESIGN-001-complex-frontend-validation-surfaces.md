# V2 Design Baseline 001: Complex Frontend Validation Surfaces

Status: Draft baseline

Version: V2-DESIGN-001

Date: 2026-06-07

## Purpose

Define how V2 should convert the current placeholder routes into complex frontend validation surfaces while preserving the accepted V1 governance model.

## Design Goal

V2 must create pages that are useful as experimentation targets, not just feature demonstrations. The design therefore prioritizes:

1. interaction depth
2. multiple visible runtime states
3. selector stability
4. layout variety
5. evidence-friendly structure

## Existing Baseline

Current runtime surfaces are thin placeholders:

- `/dashboard`
- `/task/list`
- `/task/create`

Current E2E coverage verifies only that `/dashboard` is reachable.

## Target Surface Architecture

### Dashboard

The dashboard should act as an operations cockpit. It should support:

- multiple summary bands
- at least one region with progressive disclosure
- visible loading/skeleton behavior
- exception-focused content that is useful for filter and evidence experiments

### Task List

The task list should act as the main dense interaction surface. It should support:

- query and filter composition
- alternate list states
- row-level interaction
- selection state
- details without full-page navigation

### Task Creation

The task creation page should act as the form-complexity benchmark. It should support:

- grouped sections or wizard steps
- conditionally revealed inputs
- validation and helper feedback
- preview or review checkpoint before completion

## Design Constraints

- Preserve the current route structure unless a V2 decision explicitly changes it.
- Prefer local mock data and deterministic UI states over hidden complexity.
- Use component decomposition that keeps domain logic inside `src/domains/`.
- Shared abstractions may be created only when at least two surfaces genuinely need them.
- Testability must be designed in, not added after the fact.

## Evidence-Oriented UI Requirements

Each V2 surface should be designed so later experiments can observe:

- normal state
- loading state
- empty state
- error state
- state transition after user interaction

At least one surface should also expose:

- drawer or modal interactions
- batch action or multiselect behavior
- conditional validation flow

## Recommended Minor-Version Strategy

- `V2.1`: version design, page architecture, verification strategy, and state model definition
- `V2.2`: dashboard implementation baseline
- `V2.3`: task list implementation baseline
- `V2.4`: task creation implementation baseline
- `V2.5`: integrated E2E, evidence, knowledge updates, and acceptance verification

## Conclusion

V2 should be judged by whether it creates realistic, governable experimentation surfaces, not by whether it resembles a finished product.
