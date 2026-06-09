---
name: frontend-auth-login
description: Authenticate before page exploration — handles login form, session verification, and multi-tenant placeholder. Shields all other exploration skills from auth differences across projects.
compatibility: opencode
metadata:
  project: frontend-skill-forge
  skill_type: precondition
  authority: project
---

# Frontend Auth Login

## Purpose

Authenticate the browser session so downstream exploration skills can access protected routes without handling auth themselves.

This skill is a **precondition** — it runs before page exploration, not as a standalone exploration target.

## Parameter Interface

Every project using this skill MUST provide these values. The current project's values are filled in; other projects replace the `{{PLACEHOLDER}}` markers during migration.

| Parameter | Current Project | Placeholder (for migration) | Notes |
|-----------|----------------|---------------------------|-------|
| `base_url` | `http://localhost:5173` | `{{BASE_URL}}` | Dev server origin |
| `login_url` | `/login` | `{{LOGIN_URL}}` | Relative or absolute |
| `username` | *(from `references/credentials.json`)* | `{{AUTH_USERNAME}}` | Stored in credentials file, not inline |
| `password` | *(from `references/credentials.json`)* | `{{AUTH_PASSWORD}}` | Stored in credentials file, not inline |
| `tenant` | _(none)_ | `{{AUTH_TENANT}}` | Optional; omit if single-tenant |
| `post_login_redirect` | `/` | `{{POST_LOGIN_REDIRECT}}` | Where login sends the user on success |

## Credentials File

Credentials are stored in `references/credentials.json` to avoid plaintext in prompts:

```json
{
  "base_url": "http://localhost:5173",
  "login_url": "/login",
  "credentials": {
    "username": "admin",
    "password": "admin123"
  },
  "post_login_redirect": "/",
  "tenant": null
}
```

The agent MUST read this file at the start of the workflow. Do not type credentials directly in the prompt — always load them from `references/credentials.json`.

## Selector Inventory

All selectors on the login page use `data-testid`. These are stable for the current project.

| Element | Selector | Role |
|---------|----------|------|
| Login page root | `[data-testid="login-page"]` | Page presence check |
| Username input | `[data-testid="login-username"]` | Credential entry |
| Password input | `[data-testid="login-password"]` | Credential entry |
| Submit button | `[data-testid="login-submit"]` | Form submission |
| Validation error | `[data-testid="login-validation-error"]` | Login failure feedback |
| Credentials hint | `[data-testid="login-credentials-hint"]` | Demo credential display |
| Scenario selector | `[data-testid="login-scenario-select"]` | Dev scenario toggle |
| Loading skeleton | `[data-testid="login-loading"]` | Loading state indicator |
| Error alert | `[data-testid="login-error"]` | Service-unavailable state |
| Error retry link | `[data-testid="login-error-retry-link"]` | Retry from error state |

## Workflow

### 1. Check Session State

Navigate to `{base_url}/`. If the browser lands on a page inside GlobalShell (URL does NOT contain `/login`), the session is already authenticated — skip to step 4.

If redirected to `/login`, proceed to step 2.

### 2. Ensure Login Page is in "Loaded" Scenario

The login page has a scenario selector that can put it into `loading` or `error` states. Before logging in, ensure the scenario is set to `loaded`:

- Check the scenario selector value
- If it is NOT `loaded`, change it to `loaded`
- Wait for the login form to be visible

### 3. Submit Credentials

First, read credentials from `references/credentials.json`:

```
Read references/credentials.json → extract credentials.username and credentials.password
```

Then fill and submit:

```
Fill [data-testid="login-username"] with <username from file>
Fill [data-testid="login-password"] with <password from file>
Click [data-testid="login-submit"]
Wait for navigation away from /login
```

### 4. Verify Authenticated

After submission, confirm the session is valid:

- URL no longer contains `/login`
- The page renders inside GlobalShell (header with module tag is visible)
- Navigating to any protected route (e.g. `/task/list`) does NOT redirect back to `/login`

### 5. Return Session Confirmation

Output a compact confirmation:

```md
## Auth Session Confirmed

- **User:** admin
- **Role:** admin
- **Base URL:** http://localhost:5173
- **Session valid:** yes
- **Tenant:** none
```

### 6. Hand Off to Downstream Skill

Once authenticated, the downstream exploration skill (e.g. `frontend-e2e-explorer`) can navigate to any protected route without worrying about auth.

## Failure Handling

| Symptom | Likely Cause | Action |
|---------|-------------|--------|
| Login form not visible | Scenario is `loading` or `error` | Switch scenario to `loaded` |
| Validation error after submit | Wrong credentials | Verify username/password in `references/credentials.json` |
| Still on `/login` after submit | AuthContext state not updated | Check console for errors; restart dev server |
| Redirect loop | AuthGuard logic broken | Check `src/domains/auth/guards/AuthGuard.tsx` |
| `BLOCKED_BY_NO_LOGIN_FORM` | Login page DOM changed | Update selector inventory; check for `data-testid` changes |

## Scenario States

The login page supports 3 dev scenarios via the in-page selector. The login skill only operates in `loaded` mode:

| Scenario | Behavior | Used For |
|----------|----------|----------|
| `loaded` | Normal login form | **Login flow** |
| `loading` | Skeleton placeholders | Visual verification only |
| `error` | "Service Unavailable" alert | Visual verification only |

## Context Budget Rules

- Only capture a screenshot after successful login (for evidence), not during credential entry
- Do not paste raw DOM — use the selector inventory above
- Keep the auth session confirmation compact (one short block)
- One auth check per exploration session, not per route

## Output Format

```md
# Auth Login Report

## Session Check

- Previously authenticated: yes / no

## Login Attempt

- URL: http://localhost:5173/login
- Scenario: loaded
- Credentials: (from file) / ***
- Result: success / failure

## Session Confirmation

- URL after login: http://localhost:5173/task/list
- Protected route accessible: yes

## Next Safe Action

- Proceed with exploration of <target route>
```

## References

- `references/credentials.json` — Login credentials (base_url, username, password). Read at workflow start — never inline credentials in prompts.
- `references/selector-reference.md` — Full selector inventory with fallback strategies
- `references/login-flow.md` — Step-by-step login flow diagram
