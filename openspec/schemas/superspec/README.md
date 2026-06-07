# SuperSpec Schema

Status: V1 baseline

This directory stores the repository-local SuperSpec schema assets for `frontend-skill-forge`.

OpenSpec 1.3.1 recognizes the canonical custom-schema shape as:

```text
openspec/schemas/<schema-name>/
├── schema.yaml
└── templates/
```

This repository also keeps companion documentation next to that canonical structure:

- `README.md` for human-readable schema notes
- `references/workflow.md` for repository-specific workflow semantics

The assets in this directory define:

- the intended stage flow
- standardized templates for `proposal`, `specs`, `design`, `plan`, `tasks`, `implementation`, and `verify`
- required frontend verification expectations, including Playwright E2E evidence
- explicit skill and MCP/tool recording requirements
- the separation between OpenSpec, SuperSpec, and Superpower

These files are part of the V1 framework baseline. Schema validation does not by itself prove full runtime activation.
