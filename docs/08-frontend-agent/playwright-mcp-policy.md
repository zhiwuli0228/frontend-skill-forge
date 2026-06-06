# Playwright MCP Policy

Status: Draft

## Purpose

Define operational policies for using Playwright MCP tools in frontend exploration.

## Scope

All Playwright MCP interactions within the frontend agent layer.

## Rules

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

### 4. Error Handling

- Capture console errors as evidence
- Screenshot error states
- Record network failures
- Do not retry failed interactions without diagnosis

### 5. Performance Considerations

- Wait for page load before snapshotting
- Use `browser_wait_for` for dynamic content
- Limit interaction chain length
- Close tabs after exploration

## Outputs

- Playwright interaction logs
- Evidence artifacts
- Error records
