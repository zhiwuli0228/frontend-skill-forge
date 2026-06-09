# Validation Artifacts

Last Updated: 2026-06-07
Status: Active

This directory stores raw validation outputs for the benchmark project.

Recommended layout:

```text
artifacts/validation/
├── runs/
├── screenshots/
├── playwright-html/
├── traces/
├── json/
└── raw-logs/
```

Usage policy:

- Put generated reports, screenshots, traces, and command outputs here.
- Create one folder under `runs/` per validation execution and use it as the index for that run.
- Keep formal conclusions and human-readable summaries in `docs/07-evidence/` or other governed docs.
- When a document cites a result, reference the specific artifact path in this directory.
- Large generated files are ignored by default in Git; promote only curated assets when needed for publication.
- For UI-facing validation, code-only results are insufficient; preserve real interaction artifacts per `docs/08-frontend-agent/ui-validation-evidence-contract.md`.

Suggested naming:

```text
YYYY-MM-DD-<topic>-<run-type>
```

Examples:

- `2026-06-07-skill-map-feasibility-run-01`
- `2026-06-07-task-list-mcp-validation`

Recommended first step for each run:

1. create `artifacts/validation/runs/<run-id>/`
2. copy `RUN-MANIFEST.template.md` into that folder as `manifest.md`
3. write all raw outputs into the sibling artifact directories
4. record the exact artifact paths in the manifest

Mandatory minimum for benchmark-grade UI validation:

1. one manifest
2. at least two screenshots
3. at least one runtime artifact: HTML report or trace
4. at least one raw log

For the full benchmark phase, prefer the stronger end-to-end bundle:

1. `manifest.md`
2. `task-report.md`
3. `self-evolution-observations.md`
4. MCP session record or explicit fallback note
5. screenshots + trace/report + raw logs + JSON summary

Use:

- `END-TO-END-RUN-CHECKLIST.template.md`
- `runs/TASK-REPORT.template.md`
- `runs/SELF-EVOLUTION-OBSERVATIONS.template.md`
