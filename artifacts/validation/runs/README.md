# Validation Runs

Store one subdirectory here per validation execution.

Naming convention:

```text
YYYY-MM-DD-<topic>-run-<nn>
```

Example:

```text
2026-06-07-skill-map-feasibility-run-01
```

Each run directory should contain at least:

- `manifest.md` copied from `../RUN-MANIFEST.template.md`

The manifest is the human-readable index for that run. Heavy outputs should stay in sibling directories such as:

- `../screenshots/`
- `../playwright-html/`
- `../traces/`
- `../json/`
- `../raw-logs/`
