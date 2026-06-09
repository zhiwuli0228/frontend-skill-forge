# Element Extraction Script

Run via MCP `browser_evaluate` on the **loaded** state page to produce structured `BrowserElement[]` data.

## Script

```js
() => {
  const els = document.querySelectorAll(
    '[data-testid], button, input:not([type="hidden"]), select, textarea, ' +
    '[role="tab"], [role="menuitem"], [role="checkbox"], [role="combobox"], ' +
    '[role="textbox"], h2, [aria-label]'
  );
  return Array.from(els).map(el => {
    const getAncestorRoles = (e) => {
      const roles = [];
      let cur = e.parentElement;
      while (cur && cur !== document.body) {
        const role = cur.getAttribute('role');
        const tag = cur.tagName.toLowerCase();
        if (role) roles.unshift(role);
        else if (['header', 'main', 'nav', 'aside', 'table', 'form', 'complementary', 'list', 'tablist'].includes(tag))
          roles.unshift(tag);
        cur = cur.parentElement;
      }
      return roles;
    };
    const text = (el.textContent || '').trim().slice(0, 80);
    return {
      a11yRole: el.getAttribute('role') || el.tagName.toLowerCase(),
      visibleText: text,
      testid: el.getAttribute('data-testid') || null,
      ariaLabel: el.getAttribute('aria-label') || null,
      elementType: el.tagName.toLowerCase(),
      ancestorRoles: getAncestorRoles(el),
      isInteractive: ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'].includes(el.tagName) ||
        ['tab', 'menuitem', 'checkbox', 'combobox', 'textbox'].includes(el.getAttribute('role') || '')
    };
  });
}
```

## Output Format

Save as `artifacts/browser-snapshots/<route-slug>.json`:

```json
{
  "/route/path": [
    {
      "a11yRole": "button",
      "visibleText": "Create Task",
      "testid": "create-task-btn",
      "ariaLabel": null,
      "elementType": "button",
      "ancestorRoles": ["main", "header"],
      "isInteractive": true
    }
  ]
}
```

Keyed by route path so `frontend-registry-stitch` can consume it directly.

## Validation

The extracted array should have ≥10 elements for a typical page. Fewer suggests the page failed to load or the selector list needs adjustment.
