# Plan: V3 First Evidence Loop

Status: Complete

## Execution Sequence

| Order | Objective | Output | Gate set |
| --- | --- | --- | --- |
| 1 | V3.1 Knowledge Map Population | 5 fully populated maps | Full 19-artifact |
| 2 | V3.2 E2E Asset Registry | registry.md + promotion candidates | Reduced (proposal → tasks → impl → verify → release) |
| 3 | V3.3 First MCP Exploration Session | session record + 9-10 evidence records | Reduced |
| 4 | V3.4 Drift Diagnosis + Evolution Candidates | 1 failure record + 1 issue + 2 queue updates + 1 spec | Reduced |
| 5 | V3.5 V3 Aggregate Closure | baseline + summary + release + retro + issues + decisions | Reduced |

## V3 Reduced Gate Set (V3.2-V3.5)

Per V2's exploration (D028-D030), sub-changes within a major version use a reduced gate set:

```text
proposal → tasks → implementation → verify → release
```

The full 19-artifact chain applies only to the major-version-level IR/SR bundle (V3.1 in this case).

## Exit Criteria

- All 5 knowledge maps fully populated
- 25/25 e2e spec files cataloged in registry
- 1 MCP session record + ≥9 evidence records
- ≥1 evolution candidate approved through decision record
- 1 new drift-demo spec passing
- `npm run lint`, `npm run build`, `npm run test:e2e` all pass
- V3 governance artifacts complete
- Decision ledger updated with D031+
