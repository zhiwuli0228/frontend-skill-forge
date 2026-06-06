# Selector Stability Guide

Status: Draft

## Purpose

Guide for assessing and selecting stable selectors for E2E testing.

## Scope

All selector decisions in MCP exploration and E2E asset creation.

## Rules

### 1. Selector Priority

```text
1. data-testid (highest stability)
2. ARIA roles and labels
3. Semantic HTML elements
4. Text content
5. CSS classes (lowest stability)
```

### 2. Stability Assessment

**High Stability:**
- `data-testid` attributes
- ARIA roles with unique labels
- Stable semantic structure

**Medium Stability:**
- Text content (may change with i18n)
- CSS classes (may change with refactoring)
- Element hierarchy

**Low Stability:**
- Dynamic class names
- Index-based selectors
- XPath expressions

### 3. Recording Requirements

For each selector, record:
- Primary selector
- Fallback selector
- Stability confidence (0-1)
- Last verified date

### 4. Selector Failure Handling

When selector fails:
1. Try fallback selector
2. Capture current state
3. Identify new stable selector
4. Update selector records
5. Queue evidence if pattern detected

## Outputs

- Selector stability reports
- Updated selector records
- Evolution candidates for unstable selectors
