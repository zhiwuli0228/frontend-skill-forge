# Brainstorm Governance

Status: V1.3 baseline

## Purpose

Define when brainstorming is allowed, what it may produce, and how it must hand off into governed execution.

## Allowed Use Cases

Brainstorming is allowed when the repository needs:

- option exploration before selecting a change direction
- risk discovery before design work
- clarification of ambiguous scope
- decomposition of a large version objective into controllable smaller outputs

## Required Output Shape

A governed brainstorm result must include:

- objective
- assumptions
- alternatives considered
- recommended direction
- known risks
- unresolved questions
- explicit statement that the result is not yet acceptance, implementation, or verification

## Transition Rule

Brainstorm output may inform later work, but it becomes executable only after a follow-on artifact places it under a versioned gate. In V1, that usually means one of the following:

- a version baseline document under `docs/09-change-records/baselines/V1/`
- a formal OpenSpec change artifact
- a user-confirmed decision recorded in `docs/09-change-records/current/DECISIONS.md`

## Forbidden Brainstorm Behaviors

- presenting one option as accepted without user confirmation
- claiming that generated ideas are validated behavior
- skipping directly from ideation to unrestricted file edits
- collapsing brainstorm, review, and acceptance into one step

## V1.3-Specific Rule

Inside V1.3, brainstorm governance exists to control Superpower itself. It may shape mission definitions, power definitions, dispatch rules, and review rules, but it may not claim that the full integrated V1 workflow has already been proven. That proof belongs to V1.4.
