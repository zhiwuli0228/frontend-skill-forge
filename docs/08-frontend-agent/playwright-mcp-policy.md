# Playwright MCP Policy

Status: Draft

## Purpose

Define operational policies for using Playwright MCP tools in frontend exploration.

## Scope

All Playwright MCP interactions within the frontend agent layer.

This policy also applies to evidence gathered for `superspec` verify-stage artifacts.

## Rules

This policy is subordinate to `ui-validation-evidence-contract.md` for benchmark-grade validation.

### 1. Tool Usage Policy

**Allowed Tools:**
- `browser_snapshot` - Capture page accessibility tree
- `browser_navigate` - Navigate to URLs
- `browser_click` - Interact with elements
- `browser_type` - Input text
- `browser_take_screenshot` - Visual evidence
- `browser_console_messages` - Console output
- `browser_network_requests` - Network activity
- `browser_wait_for` - Wait for conditions
- `browser_tabs` - Tab management

**Restricted Tools:**
- `browser_run_code_unsafe` - Only with explicit approval
- `browser_file_upload` - Only for test data

### 2. Exploration Session Structure

```text
1. Open browser tab
2. Navigate to target route
3. Capture initial snapshot
4. Record observations
5. Perform interactions
6. Capture post-interaction snapshot
7. Record evidence
8. Close tab
```

### 3. Evidence Capture Requirements

Every exploration session must produce:
- At least one snapshot
- Route URL
- Timestamp
- Goal statement
- Observations list

For benchmark or validation runs, the minimum requirement is stronger:

- at least one real interaction step
- at least two screenshots or equivalent visual before/after artifacts
- one reviewable runtime artifact such as a trace or HTML report
- one raw execution log path
- one manifest entry under `artifacts/validation/runs/`

When the session supports a verification artifact, it must also record:

- the related change or task identifier
- the related Playwright test file path, if automation exists
- whether the result is pass, fail, or blocked

### 4. Error Handling

- Capture console errors as evidence
- Screenshot error states
- Record network failures
- Do not retry failed interactions without diagnosis
- If runtime artifacts are missing, mark the session incomplete rather than silently closing it

### 5. Performance Considerations

- Wait for page load before snapshotting
- Use `browser_wait_for` for dynamic content
- Limit interaction chain length
- Close tabs after exploration

## Outputs

- Playwright interaction logs
- Evidence artifacts
- Error records
- inputs suitable for the `verify.md` artifact
