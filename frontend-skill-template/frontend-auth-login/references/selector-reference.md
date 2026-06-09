# Selector Reference — Auth Login

## Current Project: frontend-skill-forge

All login page elements use `data-testid` attributes. Selector priority: `data-testid` > ARIA role > CSS class.

### Primary Selectors (High Stability)

| Element | Selector | Fallback | Notes |
|---------|----------|----------|-------|
| Login page | `[data-testid="login-page"]` | `page.getByRole('heading', { name: 'Frontend Skill Forge' })` | Use for page load check |
| Username | `[data-testid="login-username"]` | `page.getByPlaceholder('Username')` | Text input |
| Password | `[data-testid="login-password"]` | `page.getByPlaceholder('Password')` | Password input with toggle |
| Submit | `[data-testid="login-submit"]` | `page.getByRole('button', { name: 'Sign In' })` | Submit button with loading state |
| Error alert | `[data-testid="login-validation-error"]` | `.ant-alert-warning` | Shown on bad credentials |
| Hint box | `[data-testid="login-credentials-hint"]` | — | Displays demo credentials |
| Scenario select | `[data-testid="login-scenario-select"]` | `.ant-select` | Dev-only scenario toggle |
| Loading state | `[data-testid="login-loading"]` | `.ant-skeleton` | Skeleton placeholders |
| Error state | `[data-testid="login-error"]` | `.ant-alert-error` | Service unavailable |
| Retry link | `[data-testid="login-error-retry-link"]` | — | Retry from error state |

### Session Verification Selectors

After login, verify the session is active by checking a GlobalShell element:

| Element | Selector | Notes |
|---------|----------|-------|
| Module tag | Header module tag text | Indicates user is inside GlobalShell |
| Any `data-testid` on `/task/list` | Varies by page | Check a known element on a protected route |

### Migration Notes

When migrating this skill to another project:

1. Identify the login page's stable selectors (prefer `data-testid`)
2. Replace all selector values in this reference
3. Update the credential values in `SKILL.md`
4. If the project uses OAuth/SSO instead of form login, replace the entire workflow
5. If multi-tenant, add tenant selector selectors here
