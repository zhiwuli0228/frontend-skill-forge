# V2 Intent Record

Status: Draft baseline

Version: V2-IR

Date: 2026-06-07

## Purpose

State the major-version intent for V2 before implementation begins.

## Intent

V2 is the first code-bearing version after the accepted V1 control-plane baseline. Its purpose is to build complex frontend validation surfaces that agents can later use for:

- controlled incremental coding
- Playwright and MCP exploration
- UI evidence collection
- selector and stability analysis
- skill, rule, and knowledge evolution experiments

## Why V2 Exists

V1 proved the framework around implementation. V2 must prove that the framework can govern meaningful frontend implementation work without collapsing into ad hoc page building.

## Major-Version Success Criteria

V2 is successful only if it delivers all of the following:

1. at least three nontrivial page surfaces replacing the current placeholders
2. nested and stateful UI interactions that are rich enough for later E2E and evidence experiments
3. route-level and workflow-level verification stronger than the current smoke-only baseline
4. evidence-ready page structure with stable selectors, observable states, and explicit loading/error/empty conditions
5. traceability from V2 scope decisions into implementation and verification outputs

## Non-Goals

V2 does not aim to:

- build real backend services
- finish product-grade task management
- maximize polish over validation value
- bypass the V1 gate and evidence discipline
