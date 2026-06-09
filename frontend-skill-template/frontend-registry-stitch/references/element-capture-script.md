# Element Capture Script

Run via MCP `browser_evaluate` to produce structured `BrowserElement[]` for the stitching pipeline.

## Script

```js
() => {
  const els = document.querySelectorAll('[data-testid], button, input, select, [role="tab"], [role="menuitem"], [role="checkbox"], h2');
  return Array.from(els).map(el => {
    const getAncestorRoles = (e) => {
      const roles = [];
      let cur = e.parentElement;
      while (cur && cur !== document.body) {
        const role = cur.getAttribute('role');
        const tag = cur.tagName.toLowerCase();
        if (role) roles.unshift(role);
        else if (['header', 'main', 'nav', 'aside', 'table', 'form'].includes(tag)) roles.unshift(tag);
        cur = cur.parentElement;
      }
      return roles;
    };
    return {
      a11yRole: el.getAttribute('role') || el.tagName.toLowerCase(),
      visibleText: (el.textContent || '').trim().slice(0, 60),
      testid: el.getAttribute('data-testid') || null,
      elementType: el.tagName.toLowerCase(),
      ancestorRoles: getAncestorRoles(el),
      isInteractive: ['BUTTON', 'INPUT', 'SELECT', 'A'].includes(el.tagName) || el.getAttribute('role') === 'tab' || el.getAttribute('role') === 'menuitem'
    };
  });
}
```

## Output

Save as `artifacts/browser-snapshots/<route-slug>.json` — a `Record<string, BrowserElement[]>` keyed by route path.

## Validation

Each route snapshot should have ≥10 interactive elements. Fewer suggests the page failed to load or the extraction script missed elements.
