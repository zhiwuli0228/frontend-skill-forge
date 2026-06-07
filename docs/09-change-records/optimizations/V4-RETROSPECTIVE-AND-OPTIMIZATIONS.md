# V4 Retrospective and Optimizations

Date: 2026-06-07

## What Went Well

### 1. Skills as procedural docs, not code

Writing Skills as markdown procedures (not executable code) was the right call. Each Skill is self-contained, readable by humans and agents, and doesn't need a runtime. The 8-9 step procedures are detailed enough to follow but not so rigid that they can't adapt.

### 2. V3 evidence as validation set

Using V3's knowledge maps, failure-diagnosis, MCP session, and evolution queues as validation examples was effective. Each Skill's "Validation Examples" section references concrete V3 artifacts, which proves the Skill works in practice.

### 3. 4 Skills cover the full lifecycle

The 4 Skills form a coherent agent lifecycle:
- `frontend-project-reader` → understand the codebase
- `frontend-incremental-coder` → make bounded changes
- `frontend-e2e-explorer` → explore and document UI
- `skill-evolution-maintainer` → evolve from evidence

This is a complete loop: read → change → explore → evolve.

## What Didn't Go Well

### 1. Skills are not executable

The biggest limitation: Skills are markdown docs, not code. An agent can read them and follow the steps, but there's no programmatic enforcement. A future V5+ could add a "Skill executor" that runs the steps automatically.

### 2. Validation is manual

Each Skill's "Validation Examples" section says "running the Skill should reproduce the same output as V3." But there's no automated test that verifies this. A future V5+ could add a "Skill test suite" that runs each Skill against the V2 surface and compares outputs.

### 3. No real MCP integration

V4 inherited V3's "fallback to e2e artifacts" limitation. The `frontend-e2e-explorer` Skill documents the MCP workflow but hasn't been validated with real browser tools. Phase 6 will address this.

## Process Improvements for V5

1. **Skill test suite.** Add automated tests that run each Skill against the V2 surface and compare outputs to V3 artifacts.
2. **Skill executor.** Add a CLI tool that runs a Skill's procedure step-by-step, with logging and error handling.
3. **Real MCP integration.** Re-run the `frontend-e2e-explorer` Skill with real Playwright MCP and compare derived vs real evidence.
4. **Multi-route evidence.** Run the `frontend-e2e-explorer` Skill on 2+ more routes to confirm the scenario-selector pattern is project-wide.
