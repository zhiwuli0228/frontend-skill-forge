# Verify: Global Shell Layout

Status: Passed

## Purpose

Record verification execution and evidence results with mandatory E2E coverage.

## Verification Scope

- Target routes: `/`, `/login`, `/task/*`, `/skill/*`, `/workflow/*`, `/insight/*`, `/settings/*`
- Target flows: module switching, module internal navigation, header, drawer, tabs, sidebar, breadcrumb

## Command Results

### Lint

```
> eslint .

(exit code 0, no errors)
```

### Build

```
> tsc -b && vite build

vite v8.0.16 building client environment for production...
✓ 3044 modules transformed.
dist/index.html                    0.39 kB │ gzip:   0.27 kB
dist/assets/index-DByuZYPh.js  1,116.37 kB │ gzip: 352.63 kB
✓ built in 618ms

(exit code 0)
```

### E2E

```
> playwright test

Running 33 tests using 6 workers
33 passed (12.4s)

(exit code 0)
```

## E2E Evidence

| Test Case | Result | Evidence |
| --- | --- | --- |
| smoke: task list page is reachable | Pass | heading "Task List" visible |
| dashboard-runtime: loads with filter bar and task table | Pass | filter bar + table visible |
| dashboard-runtime: status filter narrows visible tasks | Pass | filtered row count assertion |
| dashboard-runtime: clicking a row opens task detail drawer | Pass | drawer visible with task title |
| dashboard-runtime: empty state shows explicit empty message | Pass | empty message visible |
| dashboard-runtime: loading state shows skeleton UI | Pass | skeleton visible |
| dashboard-runtime: error state shows error with retry affordance | Pass | error + retry link visible |
| global-shell: header is visible on authenticated routes | Pass | header, switcher btn, module tag visible |
| global-shell: header is not visible on login page | Pass | header not visible on /login |
| global-shell: module switcher drawer opens and closes | Pass | drawer visible after click, hidden after mask click |
| global-shell: module card navigates to module root | Pass | URL changes to /skill/list |
| global-shell: module tabs render and switch correctly | Pass | tabs visible, URL changes on tab click |
| global-shell: sidebar menu renders correctly | Pass | sidebar-menu visible |
| global-shell: breadcrumb renders correctly | Pass | breadcrumb visible |
| global-shell: root route redirects to task list | Pass | URL is /task/list |
| task-list-runtime: all 8 tests | Pass | filter, drawer, empty, loading, error scenarios |
| task-create-runtime: all 10 tests | Pass | form, steps, preview, validation, scenarios |

## Conclusion

All 33 E2E tests passed. Lint and build clean. Verification complete.
