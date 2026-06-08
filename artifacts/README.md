# Artifacts

Last Updated: 2026-06-07
Status: Active

This directory stores raw or semi-raw execution artifacts that should not live under `docs/`.

Use this layer for machine-generated or evidence-heavy outputs such as:

- Playwright HTML reports
- screenshots
- traces
- raw logs
- structured result exports

Rule:

- `docs/` stores readable conclusions, summaries, and curated evidence.
- `artifacts/` stores the underlying execution outputs those documents refer to.

Current artifact families:

- `validation/` - validation and test execution artifacts for benchmark evidence collection
