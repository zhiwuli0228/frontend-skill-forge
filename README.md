# frontend-skill-forge

React 19 + TypeScript 6 + Vite 8 + Ant Design 6 + React Router 7 frontend application.

## Quick Start

```bash
npm install
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Type-check and production build
npm run lint      # Run ESLint
npm run test:e2e  # Run Playwright E2E tests
```

## Agent Governance — Playwright MCP Context Guard

Any agent performing browser automation (Playwright MCP) in this repo must follow the mandatory context guard protocol. Raw DOM and full snapshots must not enter the conversation; every snapshot must be summarized as a Compact Page State Summary.

| Rule | Document |
|---|---|
| Pre-MCP execution guard | `docs/08-frontend-agent/MCP_CONTEXT_GUARD.md` |
| Post-snapshot summary template | `docs/08-frontend-agent/page-state-summary-compact.md` |
| MCP operation protocol | `docs/08-frontend-agent/playwright-mcp-operation-protocol.md` |
| Context bloat check script | `scripts/check-mcp-context-bloat.ps1` |
| AGENTS.md hard rules | `AGENTS.md` |

Key principles:
- Raw MCP output is evidence, not working context
- Element refs are valid only for the current snapshot
- No snapshot loops (snapshot → click → snapshot → click…)
- Stop exploration once enough evidence is collected
- Use semantic anchors (route, label, data-testid) over unstable refs

## Architecture

See `CLAUDE.md` and `docs/` for detailed architecture documentation.
