# Roadmap

Last Updated: 2026-06-07
Status: Active

## Direction

The next stage is not to add more documentation surface area by default. The priority is to reduce manual protocol reliance and validate transferability beyond this repository.

## Current Stage

Completed foundation:

- Phase 0: Bootstrap foundation
- Phase 1: Frontend-agent governance foundation
- Phase 2: Architecture blueprint
- Phase 3: First evidence loop
- Phase 4: Skill v1 implementation
- Phase 5: Benchmark demo expansion
- Phase 6: MCP-assisted exploration
- Phase 7: Self-evolution validation

Current state:

- Core harness loop is working.
- Documentation and evidence assets are broad enough for internal use.
- The next bottlenecks are automation and migration validation.

## Next Priorities

### Priority 1: Asset Update Automation

Goal:
Reduce map and evidence drift by turning repeated maintenance tasks into scripts, checks, or generated reports.

Success signals:

- Project map / route map / component map have a defined refresh mechanism.
- Evidence registry updates are at least partially generated.
- Change work can detect stale knowledge artifacts before merge.

### Priority 2: Executable Governance Gates

Goal:
Move key process rules from "documented expectations" into automatic checks.

Success signals:

- Changes affecting routes, selectors, or E2E surfaces trigger explicit verification requirements.
- Skill / evidence / knowledge updates can be checked for presence when relevant.
- The harness can fail fast on missing evidence or missing map updates for governed changes.

### Priority 3: Medium-Scale Migration Trial

Goal:
Apply the harness to a non-trivial existing frontend project to measure real onboarding and maintenance costs.

Success signals:

- A target legacy or medium-scale frontend is selected.
- First-pass project-map and route-map generation cost is measured.
- Agent first-task success rate and rework rate are recorded.
- Resulting migration constraints are folded back into the harness.

## Suggested Phase Model

### Phase 8: Governance Automation Baseline

Focus:

- knowledge map refresh strategy
- evidence registry generation support
- stale-asset detection
- lightweight validation hooks

### Phase 9: Migration Pilot

Focus:

- select one medium-scale existing frontend
- run harness onboarding end-to-end
- record understanding cost, correction cost, and asset upkeep cost
- identify what breaks outside the benchmark repo

### Phase 10: Maintainability Hardening

Focus:

- reduce recurring documentation upkeep
- retire redundant assets
- tighten promotion rules from evidence to skill/rule/knowledge
- formalize support boundaries for single-project vs multi-project use

## What Not To Prioritize Next

- Broad runtime feature expansion without a harness objective
- New document layers that do not improve execution
- Production backend integration
- Large UI redesigns unrelated to evidence, automation, or migration validation

## Near-Term Outcome Target

The next major improvement should raise these two scores first:

- Automation level: `5.5/10` → `7/10`
- Long-term maintenance cost: `5/10` → `7/10`

If that succeeds, migration readiness can then be evaluated on stronger ground.
