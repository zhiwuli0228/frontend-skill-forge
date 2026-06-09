# Frontend Project Reader — References

Supplementary material for `frontend-project-reader`. Load only when needed.

## Minimum Context Path

Start with:
1. `route-map.md`
2. `component-map.md`
3. `project-map.md`

Only load:
4. `state-flow-map.md` — if state behavior matters
5. `api-contract-map.md` — if mock-data structure matters
6. `e2e-assets/registry.md` — if coverage classification matters

## Validation Examples

### Example 1: V2 Surface

**Input:** V2 surface with knowledge maps populated

**Expected output:**
- 22 page components, 0 route-component gaps
- 1 uncovered route (`/login`), 21 covered routes
- 0 high-risk areas (except `/login`)
- 5 modules, 6 state sources, 7 mock data files

### Example 2: New Route Added

**Input:** A new route `/task/analytics` added to router.tsx, but no e2e test yet

**Expected output:**
- 23 page components, 0 gaps (assuming the component exists)
- 2 uncovered routes (`/login`, `/task/analytics`)
- 1 high-risk area (`/task/analytics` — no e2e coverage)
- Recommended: add e2e spec for `/task/analytics`

## Known Limitations

1. **Knowledge maps may be stale.** If the source code has changed since the maps were last updated, output will be inaccurate. Always check "Last Updated" dates.
2. **No source code reading.** This Skill reads knowledge maps, not source code. If a map is missing or stale, the Skill cannot compensate by reading the source.
3. **No runtime observation.** Does not run the dev server or capture screenshots. For runtime behavior, use `frontend-e2e-explorer`.
4. **Single-project scope.** Designed for the frontend-skill-forge project structure. Adapting to other projects requires updating the knowledge map format.

## Cross-References

- **Uses:** `docs/02-harness/knowledge/frontend/` (5 maps)
- **Uses:** `docs/08-frontend-agent/e2e-assets/registry.md` (optional)
- **Produces:** project understanding summary (feeds into `frontend-incremental-coder`)
- **Related Skill:** `frontend-e2e-explorer` — for runtime observation
- **Related Skill:** `frontend-incremental-coder` — for making changes based on the summary
