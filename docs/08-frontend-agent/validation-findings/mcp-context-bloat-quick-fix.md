# MCP Context Bloat Quick Fix

## Background

During frontend migration validation, Playwright MCP browser snapshot output caused rapid context growth. Long-line UI operations triggered context compaction, making the Agent forget early constraints, page state, login status, and operation goals.

Existing governance documents were present, but they did not reliably affect execution because Agent does not automatically load all docs or Skill references.

## Root Cause

1. Raw Playwright MCP output entered the conversation directly.
2. Full snapshots accumulated across multiple UI steps.
3. Element refs changed after new snapshots but were treated as stable.
4. Agent performed free exploration on complex pages.
5. Skill references were not automatically loaded.
6. Governance was documented but not injected into the execution path.

## Quick Fix

This remediation introduces:

- `AGENTS.md` minimal hard rules.
- `MCP_CONTEXT_GUARD.md` as the explicit task-level guard.
- `page-state-summary-compact.md` as the mandatory post-snapshot summary format.
- `playwright-mcp-operation-protocol.md` as the operation protocol.
- `scripts/check-mcp-context-bloat.ps1` as the risk checker.

## Expected Behavior

After this fix:

1. Agent must not paste raw DOM.
2. Agent must summarize every browser snapshot.
3. Agent must treat refs as temporary.
4. Agent must keep raw evidence outside the conversation.
5. Agent must stop repeated snapshot loops.
6. Agent must use the compact summary as working context.

## Remaining Work

- Add page-specific playbooks.
- Add frontend page maps.
- Add sample Page State Summary files.
- Add stable `data-testid` where source-code changes are allowed.
- Add CI check for accidental raw DOM documents if needed.

## Why Previous Governance Did Not Take Effect

The project already had frontend Agent governance documents, but they were not reliably applied during migration validation.

The reason is that documentation presence is not execution enforcement.

In actual Code Agent runs:

1. Agent does not automatically load every file under `docs/08-frontend-agent/`.
2. Skill execution does not automatically load `references/`.
3. Browser snapshot output enters the conversation before governance documents can constrain it.
4. Long-line UI operations accumulate raw snapshot output quickly.
5. Once compaction happens, long governance rules are compressed or forgotten.

Therefore, this fix moves the most important rules into:

- `AGENTS.md` minimal hard constraints;
- task-level `MCP_CONTEXT_GUARD.md`;
- explicit pre-MCP Prompt;
- mandatory Page State Summary after every snapshot;
- validation script for raw DOM / snapshot leakage.
