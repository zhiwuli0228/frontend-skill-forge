# Change Records

Status: Draft

## Purpose

Provide the repository's dedicated version-management ledger. This module follows the `dv-entity-linking` model: a few authoritative current documents, versioned baselines, and one release summary per version.

## Directory Structure

```text
docs/09-change-records/
├── README.md
├── PROJECT.md
├── current/
│   └── DECISIONS.md
├── process/
│   └── CHANGE_PROCESS.md
├── baselines/
├── summaries/
├── issues/
├── optimizations/
└── releases/
```

## Authoritative Entry Points

| File | Purpose |
| --- | --- |
| [PROJECT.md](./PROJECT.md) | Current version status, active iteration, scope boundaries, and release progression |
| [current/DECISIONS.md](./current/DECISIONS.md) | User-confirmed decisions and pending confirmations |
| [process/CHANGE_PROCESS.md](./process/CHANGE_PROCESS.md) | Version workflow, gates, and archival rules |
| [releases/V0.md](./releases/V0.md) | Closed bootstrap release record |
| [releases/V1.md](./releases/V1.md) | Closed V1 release and major-version conclusion |

## Version Rules

- Main outputs for each version are stored under `baselines/Vx/`.
- Each version has exactly one release or blocked-state summary in `releases/Vx.md`.
- Major-version retrospectives may additionally populate `summaries/`, `issues/`, and `optimizations/`.
- Current status must not be duplicated across multiple docs.
- Temporary process notes belong in Git history unless promoted into a baseline or release record.

## Boundary

- `docs/06-operations/` remains responsible for operations and runtime support.
- `docs/07-evidence/` remains responsible for cross-cutting verification results.
- `docs/08-frontend-agent/` remains responsible for frontend-specific evidence and evolution artifacts.
- `docs/09-change-records/` owns version status, baseline progression, release conclusions, and decision traceability.
