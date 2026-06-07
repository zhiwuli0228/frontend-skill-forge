# Frontend Skill Forge Documentation

## Documentation Structure

```text
docs/
├── 00-project/           # Project overview and goals
├── 01-architecture/      # System architecture
├── 02-harness/           # General AI Harness governance
├── 03-openspec/          # OpenSpec specifications
├── 04-development/       # Development guidelines
├── 05-domain/            # Domain-specific docs
├── 06-operations/        # Operations and deployment
├── 07-evidence/          # Cross-cutting verification evidence
├── 08-frontend-agent/    # Frontend MCP, UI evidence, E2E assets, evolution
└── 09-change-records/    # Current version state, version baselines, releases, decisions
```

## Sections

### 00-project

Project overview, goals, and high-level documentation.

### 01-architecture

System architecture, design decisions, and technical specifications.

### 02-harness

General AI Harness governance layer. Owns:
- Agent workflow
- Git governance
- Verification policy
- Generic Skill lifecycle rules
- General Skill / Rule / Knowledge structure

### 03-openspec

OpenSpec specifications and change management.

### 04-development

Development guidelines, coding standards, and best practices.

### 05-domain

Domain-specific documentation and business logic.

### 06-operations

Operations, deployment, and infrastructure documentation.

### 07-evidence

Cross-cutting verification evidence and test results.

### 08-frontend-agent

Frontend-specific AI Harness governance layer. Owns:
- Frontend MCP exploration protocol
- Playwright MCP operation policy
- UI evidence collection
- Page snapshot catalog
- Route / component discovery
- E2E asset lifecycle
- UI drift diagnosis
- Frontend Skill / Rule / Knowledge evolution
- Human feedback integration

This is the key differentiator from a normal backend Harness project.

### 09-change-records

Version-management ledger. Owns:
- Current version authority
- Decision ledger
- Version baselines
- One release record per version
- Version workflow and closure rules
