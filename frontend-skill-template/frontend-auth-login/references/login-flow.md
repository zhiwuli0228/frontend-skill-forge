# Login Flow

## Current Project: frontend-skill-forge

```
┌─────────────────────────────────────────────────────────────────┐
│                     Login Flow                                  │
│                                                                 │
│  Agent navigates to protected route                             │
│         │                                                       │
│         ▼                                                       │
│  AuthGuard checks isAuthenticated                               │
│         │                                                       │
│    ┌────┴────┐                                                  │
│    │         │                                                  │
│  true      false                                                │
│    │         │                                                  │
│    ▼         ▼                                                  │
│  Stay    Redirect to /login                                     │
│          │                                                      │
│          ▼                                                      │
│  ┌─────────────────────────────────────────────┐               │
│  │            LoginPage                         │               │
│  │                                              │               │
│  │  Scenario Selector (dev only)                │               │
│  │    ├── loaded  ← normal login form           │               │
│  │    ├── loading ← skeleton                    │               │
│  │    └── error   ← service unavailable         │               │
│  │                                              │               │
│  │  Login Form (visible in loaded scenario)     │               │
│  │    ├── Username: [data-testid="login-username"]            │
│  │    ├── Password: [data-testid="login-password"]            │
│  │    └── Submit:   [data-testid="login-submit"]              │
│  │                                              │               │
│  │  On submit:                                   │               │
│  │    → AuthContext.login(username, password)    │               │
│  │    → 800ms simulated delay                    │               │
│  │    → Compare against VALID_CREDENTIALS        │               │
│  └──────────────────────┬──────────────────────┘               │
│                         │                                       │
│                    ┌────┴────┐                                  │
│                    │         │                                  │
│                 success    failure                              │
│                    │         │                                  │
│                    ▼         ▼                                  │
│              setUser()   setLoginError()                        │
│              navigate("/")  show Alert                         │
│                    │                                            │
│                    ▼                                            │
│           AuthGuard sees isAuthenticated=true                   │
│           Renders <Outlet/> (GlobalShell)                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Key Implementation Details

### AuthContext (src/domains/auth/context/AuthContext.tsx)

- `login(username, password)` — async, 800ms delay, compares against `VALID_CREDENTIALS`
- `logout()` — sets user to null
- `isAuthenticated` — derived from `user !== null`
- State is in-memory only, no token/persist

### AuthGuard (src/domains/auth/guards/AuthGuard.tsx)

- Wraps all routes under `/`
- If `!isAuthenticated` → `<Navigate to="/login" replace />`
- Otherwise → `<Outlet />`

### VALID_CREDENTIALS (src/domains/auth/data/auth-mock-data.ts)

```ts
{ username: 'admin', password: 'admin123' }
```

## Migration Notes

When migrating this skill:

1. Replace the flow diagram with the target project's auth flow
2. If token-based: add token storage/retrieval steps
3. If OAuth/SSO: replace form-fill steps with redirect flow
4. If multi-tenant: add tenant selection step before credential entry
5. If CAPTCHA: document the bypass mechanism for test environments
