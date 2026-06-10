# AI-Assisted Development Methodology — Deployment Guide

## Overview

This guide is **optimized for AI agent execution**. It describes how to deploy the Frontend Skill Forge methodology layer (docs structure, skill templates, knowledge maps, AI agent configuration) to any frontend project — **regardless of tech stack** (React, Vue, Angular, Svelte, vanilla JS).

### What This Guide Covers

| Deliverable | Path | Description |
|-------------|------|-------------|
| Documentation system | `docs/` | 13 subdirectories covering architecture, development, ops, AI governance, change records |
| Skill templates | `frontend-skill-template/` | 11 executable AI agent skills (page exploration, element stitching, incremental coding, etc.) |
| AI configuration | `.claude/` `.codex/` | Runtime agent configuration and skill registration |
| Knowledge maps | `docs/02-harness/knowledge/frontend/` | Route map, component map, element registry, API contract map, state flow map |

### Template Source

```
frontend-skill-forge/
├── docs/                         # Documentation layer (the core asset)
│   ├── 00-project/               # Project identity — REGENERATE
│   ├── 01-architecture/          # Architecture patterns — ADAPT
│   ├── 02-harness/               # AI governance — COPY AS-IS
│   ├── 03-openspec/              # Spec management — COPY AS-IS
│   ├── 04-development/           # Dev guidelines — ADAPT
│   ├── 05-domain/                # Domain knowledge — REGENERATE
│   ├── 06-operations/            # Ops & release — ADAPT
│   ├── 07-evidence/              # Verification evidence — RESET
│   ├── 08-frontend-agent/        # Frontend AI harness — COPY AS-IS
│   ├── 09-change-records/        # Version ledger — RESET
│   ├── MIGRATION_GUIDE_CN.md     # This guide (Chinese)
│   └── MIGRATION_GUIDE_EN.md     # This guide (English)
├── frontend-skill-template/      # 11 AI skills — COPY AS-IS
├── .claude/skills/               # Claude Code runtime skills — COPY AS-IS
└── .codex/skills/                # Codex runtime skills — COPY AS-IS
```

### Target

```
{{TARGET_PROJECT}}/               # Any frontend project
├── docs/                         # <- deploy the methodology here
├── frontend-skill-template/      # <- deploy skill templates here
├── .claude/                      # <- deploy AI config here
└── .codex/                       # <- deploy Codex config here
```

---

## Deployment Strategy

### Three Action Categories

Every file in the methodology layer receives one of three actions:

| Action | Meaning | Applies To |
|--------|---------|------------|
| **COPY** | Copy verbatim — no modifications needed | Cross-project governance, skills, AI config |
| **ADAPT** | Keep structure, update project-specific references | Architecture docs, dev guides, ops docs |
| **REGENERATE** | Delete old content, generate new from target project source | Project identity docs, domain docs, evidence, change records |

### Deployment Order

Steps must execute in this order — each step may depend on outputs from prior steps:

```
Step 0: Read target project
Step 1: COPY methodology core (docs/02,03,08 + frontend-skill-template/ + .claude/ + .codex/)
Step 2: REGENERATE project identity docs (docs/00-project/)
Step 3: ADAPT architecture docs (docs/01-architecture/)
Step 4: ADAPT dev guides (docs/04-development/)
Step 5: REGENERATE domain docs (docs/05-domain/)
Step 6: ADAPT ops docs (docs/06-operations/)
Step 7: RESET evidence & change records
Step 8: ADAPT AI agent config (CLAUDE.md, skill path references)
Step 9: Deploy & register skill templates
Step 10: Generate knowledge maps
Step 11: Verify deployment
```

---

## Step 0: Prerequisites — Read Target Project

Before deploying, read the target project to understand its structure:

### Files to READ (mandatory)

```
package.json                    # Project name, tech stack, scripts
CLAUDE.md or README.md          # Project-level instructions (if any)
Source directory structure      # Where pages, components, routes live
Router/route configuration      # How routes are defined (react-router, vue-router, etc.)
Test configuration              # What test framework is used
```

### Information to Extract

From these files, build a project profile:

```yaml
project_name: "{{TARGET_PROJECT_NAME}}"
tech_stack:
  framework: "{{FRAMEWORK}}"       # react | vue | angular | svelte | vanilla
  language: "{{LANGUAGE}}"         # typescript | javascript
  build_tool: "{{BUILD_TOOL}}"     # vite | webpack | etc.
  test_framework: "{{TEST}}"       # playwright | cypress | jest | vitest
route_config_path: "{{ROUTE_CONFIG_PATH}}"
page_directory: "{{PAGE_DIRECTORY}}"   # e.g., src/pages/, src/views/
component_directory: "{{COMPONENT_DIR}}"
data_model_path: "{{DATA_MODEL_PATH}}" # e.g., src/types/, src/interfaces/
selector_convention: "{{SELECTOR}}"    # data-testid | data-test | data-cy | id
module_count: {{N}}
page_count: {{M}}
```

This profile drives all subsequent ADAPT and REGENERATE steps.

---

## Step 1: COPY — Methodology Core

### Files to COPY (verbatim, no modifications)

```
docs/02-harness/                  # AI agent workflow, git governance, verification, skill lifecycle
docs/03-openspec/                 # OpenSpec spec management process
docs/08-frontend-agent/           # MCP protocols, element stitching, UI evidence, evolution
frontend-skill-template/          # All 11 skill templates (each: SKILL.md + references/)
.claude/skills/                   # Claude Code runtime skill registrations
.codex/skills/                    # Codex runtime skill registrations
docs/MIGRATION_GUIDE_CN.md        # This guide (Chinese version)
docs/MIGRATION_GUIDE_EN.md        # This guide (English version)
```

### Shell Commands

```bash
TEMPLATE="frontend-skill-forge"
TARGET="{{TARGET_PROJECT}}"

# Core governance (cross-project universal)
cp -r $TEMPLATE/docs/02-harness/     $TARGET/docs/02-harness/
cp -r $TEMPLATE/docs/03-openspec/    $TARGET/docs/03-openspec/
cp -r $TEMPLATE/docs/08-frontend-agent/ $TARGET/docs/08-frontend-agent/

# Skill templates (all 11 skills)
cp -r $TEMPLATE/frontend-skill-template/ $TARGET/frontend-skill-template/

# AI agent configuration
cp -r $TEMPLATE/.claude/  $TARGET/.claude/
cp -r $TEMPLATE/.codex/   $TARGET/.codex/

# Migration guides
cp $TEMPLATE/docs/MIGRATION_GUIDE_CN.md $TARGET/docs/MIGRATION_GUIDE_CN.md
cp $TEMPLATE/docs/MIGRATION_GUIDE_EN.md $TARGET/docs/MIGRATION_GUIDE_EN.md
```

### Verification

```bash
# Check that all core directories exist
test -d $TARGET/docs/02-harness/ && echo "OK: 02-harness" || echo "MISSING: 02-harness"
test -d $TARGET/docs/03-openspec/ && echo "OK: 03-openspec" || echo "MISSING: 03-openspec"
test -d $TARGET/docs/08-frontend-agent/ && echo "OK: 08-frontend-agent" || echo "MISSING: 08-frontend-agent"
test -d $TARGET/frontend-skill-template/ && echo "OK: skill templates" || echo "MISSING: skill templates"
test -d $TARGET/.claude/skills/ && echo "OK: .claude skills" || echo "MISSING: .claude skills"

# Count skills (should be 11+)
ls $TARGET/frontend-skill-template/ | wc -l
```

---

## Step 2: REGENERATE — Project Identity Docs

`docs/00-project/` must reflect the TARGET project, not the template.

### File Actions

| File | Action | Generation Method |
|------|--------|-------------------|
| `README.md` | REGENERATE | List files in this directory with one-line descriptions |
| `project-overview.md` | REGENERATE | Read `package.json` + route config → generate |
| `glossary.md` | REGENERATE | Read route config + data models → generate |
| `current-status.md` | REGENERATE | Document deployment status, known issues |
| `roadmap.md` | REGENERATE | Write "TBD — define after deployment" if no roadmap exists |

### Generation Rules

For `project-overview.md`:
```
Read: package.json, route config, project README/CLAUDE.md
Sections:
  1. Project Name & Positioning (1-2 paragraphs)
  2. Tech Stack (table: technology + version from package.json)
  3. Page/Module Inventory (table: route path + page description)
  4. Architecture Highlights (3-5 bullets)
  5. Directory Structure (key directories with descriptions)
```

For `glossary.md`:
```
Read: route config (module names), data model files (entity types + statuses)
Sections:
  1. Module Terms (table: term + english + description)
  2. Entity Terms (table: entity + module + description)
  3. Status Terms (table: status + entity + description)
  4. Technical Terms (table: term + description)
```

### Verification

```bash
grep -r "Frontend Skill Forge" $TARGET/docs/00-project/ && echo "ERROR: template name found" || echo "OK: no template names"
grep -r "task center\|skill library\|workflow editor" $TARGET/docs/00-project/ && echo "WARNING: template modules found" || echo "OK: no template modules"
```

---

## Step 3: ADAPT — Architecture Docs

`docs/01-architecture/` describes universal architecture patterns but may contain template-specific module names in examples.

### Files to ADAPT

| File | Action |
|------|--------|
| `README.md` | ADAPT — update file list |
| `frontend-skill-forge-architecture-blueprint.md` | ADAPT — replace project name, update module list |
| `frontend-layering.md` | ADAPT — replace module examples |
| `route-architecture.md` | ADAPT — update route tree with target routes |
| `module-boundary.md` | ADAPT — update module examples |
| All other `.md` files | ADAPT — search-and-replace template names |

### Adaptation Rules

For each file:
1. Search for: `Frontend Skill Forge` → replace with: `{{TARGET_PROJECT_NAME}}`
2. Search for: `task/skill/workflow/insight/settings` (as module names) → replace with target module names
3. Search for: `Task Center/Skill Library/Workflow/Data Insight/System Settings` → replace with target module labels
4. If a code example references template-specific components (e.g., `TaskListPage`), either replace with target equivalents or add a note: "*(adapt to your equivalent)*"
5. Do NOT change structural patterns, concepts, or generic explanations

### If Target Has Different Architecture

If the target project's architecture differs fundamentally (e.g., Vue SFC instead of React components, no module-based routing), mark this directory with a note:

```markdown
# Architecture Docs — Pending Adaptation

The architecture patterns in this directory were generated for a different codebase structure.
After the target project stabilizes, regenerate these docs using `frontend-project-reader`.
```

### Verification

```bash
# Check no template module names remain in architecture docs
grep -rn "task center\|skill library" $TARGET/docs/01-architecture/ --include="*.md"
```

---

## Step 4: ADAPT — Development Guides

### File Actions

| File | Action | How to Adapt |
|------|--------|-------------|
| `README.md` | ADAPT | Update file list |
| `coding-guide.md` | REGENERATE | Base on target project's actual conventions |
| `testing-guide.md` | REGENERATE | Base on target project's test framework |
| `local-development.md` | REGENERATE | Base on target project's setup instructions |
| `evidence-rules.md` | COPY | Evidence rules are cross-project universal |

### Regeneration Heuristics

For `coding-guide.md`: Read the target project's ESLint config, Prettier config, tsconfig, and one representative component file. Extract: naming conventions, import patterns, component structure, typing conventions.

For `testing-guide.md`: Read the target project's test config and one representative test file. Extract: test framework, test file location convention, selector strategy, fixture/mock pattern.

For `local-development.md`: Read the target project's README and package.json scripts. Document: prerequisites, install command, dev server command, build command, test command.

---

## Step 5: REGENERATE — Domain Docs

`docs/05-domain/` is the most critical customization step. These docs tell AI agents how to explore, understand, and code against the target project.

### Files to Create

| File | Content |
|------|---------|
| `README.md` | Index of domain docs — list files with descriptions |
| `e2e-exploration-domain.md` | How AI agents should explore each page |
| `frontend-understanding-domain.md` | Component tree, data flow, state management per page |
| `incremental-coding-domain.md` | Coding patterns, templates, naming conventions |

### Generation Rules for `e2e-exploration-domain.md`

```
Read: route config (all routes), each page component source (page files)
For each route:
  1. Route path + page component name
  2. Data-testid selectors found in the page source
  3. UI state scenarios (loaded/loading/empty/error — if applicable)
  4. Exploration path: Navigate → Observe → Interact → Verify
  5. Key assertions (3+ per page)
Structure: One section per module/route group
```

### Generation Rules for `frontend-understanding-domain.md`

```
Read: one complete module (pages + components + data models)
For each module:
  1. Component tree (text tree diagram from layout → page → sub-components)
  2. Data model (TypeScript interfaces / PropTypes extracted from source)
  3. State management (useState/useReducer/store patterns identified)
  4. Route parameter handling (useParams, query params)
```

### Generation Rules for `incremental-coding-domain.md`

```
Read: one representative, fully-implemented module
Extract patterns:
  1. Module directory structure template
  2. Page component code skeleton (copyable template with {{PLACEHOLDER}} markers)
  3. Data model/mock data format
  4. Naming conventions cheat sheet (files, components, routes, selectors, types)
  5. New module checklist (8 steps: config → routes → directory → data → pages → components → selectors → tests)
```

---

## Step 6: ADAPT — Ops Docs

| File | Action |
|------|--------|
| `README.md` | ADAPT — update file list |
| `release-notes.md` | REGENERATE — write initial deployment release notes |
| `troubleshooting.md` | COPY — keep generic sections, append target-specific issues as discovered |

### Release Notes Template

```markdown
# Release Notes

## v0.1.0 — Methodology Deployment

- **Date:** {{TODAY_DATE}}
- **Deployed:** AI-assisted development methodology from frontend-skill-forge
- **Documentation:** 13-subdirectory docs system deployed
- **Skills:** 11 AI agent skill templates deployed
- **Knowledge maps:** Route map, component map, element registry initialized
- **Known limitations:** Knowledge maps are initial versions; will be enriched as AI agents explore more pages
```

---

## Step 7: RESET — Evidence & Change Records

### 7.1 Evidence (`docs/07-evidence/`)

```bash
TARGET="{{TARGET_PROJECT}}"

# Archive template evidence
mkdir -p $TARGET/docs/07-evidence/archive/template-reference
mv $TARGET/docs/07-evidence/*.md $TARGET/docs/07-evidence/archive/template-reference/ 2>/dev/null

# Create fresh README
cat > $TARGET/docs/07-evidence/README.md << 'EOF'
# Verification Evidence

This directory stores evidence produced during AI-assisted verification:
screenshots, Playwright traces, HTML reports, and exploration artifacts.

## Subdirectories

- `screenshots/` — Page screenshots from exploration sessions
- `traces/` — Playwright trace files
- `reports/` — HTML/JSON reports
- `snapshots/` — Browser accessibility snapshots (markdown)
- `archive/` — Archived evidence from previous versions

## Naming Convention

`{module}-{page}-{scenario}-{timestamp}.{ext}`
EOF
```

### 7.2 Change Records (`docs/09-change-records/`)

```bash
TARGET="{{TARGET_PROJECT}}"

# Archive template records
mkdir -p $TARGET/docs/09-change-records/archive/template-history
for dir in baselines releases summaries versions; do
  test -d "$TARGET/docs/09-change-records/$dir" && \
    mv "$TARGET/docs/09-change-records/$dir" "$TARGET/docs/09-change-records/archive/template-history/" 2>/dev/null
done

# Create initial version record
mkdir -p $TARGET/docs/09-change-records/versions
cat > $TARGET/docs/09-change-records/versions/v0.1.0-deployment.md << 'EOF'
# v0.1.0 — Methodology Deployment

- **Date:** {{TODAY_DATE}}
- **Source:** frontend-skill-forge methodology
- **Deployed:** docs system (13 directories), skill templates (11 skills), AI agent config
- **Modules:** {{MODULE_COUNT}} module(s) with {{PAGE_COUNT}} page(s)
- **Knowledge maps:** Initial versions generated
EOF
```

---

## Step 8: ADAPT — AI Agent Configuration

### 8.1 Update Project-Level Instructions

If the target project has a `CLAUDE.md` (or equivalent project instruction file), append:

```markdown
## AI-Assisted Development System

This project uses the Frontend Skill Forge methodology. Available resources for AI agents:

- **Knowledge maps:** `docs/02-harness/knowledge/frontend/` (route-map, component-map, element-registry)
- **Skill templates:** `frontend-skill-template/` (11 executable skills)
- **AI governance rules:** `docs/02-harness/rules/`
- **Evidence templates:** `docs/08-frontend-agent/evidence/`
- **Deployment guides:** `docs/MIGRATION_GUIDE_CN.md` (Chinese), `docs/MIGRATION_GUIDE_EN.md` (English)

### Skill Inventory

| Skill | Type | Use Case |
|-------|------|----------|
| frontend-auth-login | precondition | Authenticate browser session |
| frontend-project-reader | discovery | Read project structure, maintain knowledge maps |
| frontend-e2e-explorer | exploration | Explore pages via Playwright MCP |
| frontend-incremental-coder | implementation | Implement frontend changes |
| frontend-registry-stitch | analysis | Map browser elements to source code |
| element-registry-maintainer | maintenance | Maintain element registry health |
| skill-evolution-maintainer | maintenance | Track skill changes |
| frontend-task-creation | planning | Create frontend tasks |
| frontend-test-spec-generator | analysis | Generate E2E test specifications |
| create-task-skill | action | Create tasks through UI wizard |
```

### 8.2 Check Skill Path References

Search skill templates for paths that may differ in the target project:

```bash
TARGET="{{TARGET_PROJECT}}"

# Check for template-specific paths in skill templates
grep -rn "src/shell/" $TARGET/frontend-skill-template/ --include="SKILL.md"
grep -rn "src/domains/" $TARGET/frontend-skill-template/ --include="SKILL.md"

# If the target project uses different directory conventions, update these references
```

Most skill templates reference paths only in their optional **References** sections. The core workflow steps use `data-testid` selectors, which are project-agnostic.

### 8.3 Update Credentials File

If the target project has authentication, update the credentials file used by `frontend-auth-login`:

```bash
TARGET="{{TARGET_PROJECT}}"
CREDS_FILE="$TARGET/frontend-skill-template/frontend-auth-login/references/credentials.json"

# Update with target project's dev credentials
# Format: { "base_url": "...", "login_url": "...", "credentials": { "username": "...", "password": "..." }, ... }
```

Also sync to runtime:
```bash
cp $TARGET/frontend-skill-template/frontend-auth-login/references/credentials.json \
   $TARGET/.claude/skills/frontend-auth-login/references/credentials.json
```

---

## Step 9: Deploy & Register Skill Templates

### 9.1 Verify Skill Inventory

Each skill directory must contain `SKILL.md`. Verify:

```bash
TARGET="{{TARGET_PROJECT}}"
for skill in $TARGET/frontend-skill-template/*/; do
  if [ -f "$skill/SKILL.md" ]; then
    name=$(basename "$skill")
    echo "OK: $name"
  else
    echo "MISSING SKILL.md: $skill"
  fi
done
```

### 9.2 Verify YAML Frontmatter

Each `SKILL.md` must have valid frontmatter with these fields:

```
name: <skill-name>
description: <one-line>
compatibility: opencode
metadata:
  project: <project-name>
  skill_type: <type>
  authority: <template|project>
```

### 9.3 Sync to Runtime

If the target project uses Claude Code:

```bash
TARGET="{{TARGET_PROJECT}}"
for skill in $TARGET/frontend-skill-template/*/; do
  skill_name=$(basename "$skill")
  if [ ! -d "$TARGET/.claude/skills/$skill_name" ]; then
    cp -r "$skill" "$TARGET/.claude/skills/$skill_name"
    echo "Registered: $skill_name"
  fi
done
```

### Skill Type Reference

| Type | When the skill is loaded |
|------|--------------------------|
| `precondition` | Automatically before exploration skills |
| `discovery` | When analyzing project structure |
| `exploration` | When documenting page behavior |
| `implementation` | When modifying source code |
| `analysis` | When correlating browser to source |
| `maintenance` | When validating registries and logs |
| `planning` | When creating tasks and plans |
| `action` | When executing UI interactions |
| `template` | Only as reference (not directly executable) |

---

## Step 10: Generate Knowledge Maps

Knowledge maps are the bridge between AI agents and the target project's code. Generate them in this order:

### 10.1 Route Map

**Purpose:** Route path → page component → module affiliation

**Generation:** Run `frontend-project-reader` on the target project. It parses the route config and produces `docs/02-harness/knowledge/frontend/route-map.md`.

**Manual alternative:** Create a table mapping each route to its page component:

```markdown
| Route | Page Component | Module |
|-------|---------------|--------|
| `/login` | `LoginPage` | auth |
| `/orders/list` | `OrderListPage` | orders |
| ... | ... | ... |
```

### 10.2 Component Map

**Purpose:** Component name → file path → props → selectors

**Generation:** Run `frontend-e2e-explorer` on each route. The component discoveries from each exploration session accumulate into the component map.

### 10.3 Element Registry

**Purpose:** Browser DOM element → source code mapping (for `frontend-registry-stitch`)

**Generation:** Run `frontend-registry-stitch` to stitch browser snapshots to source code. The registry is maintained automatically by `element-registry-maintainer`.

### 10.4 State Flow Map & API Contract Map

**Purpose:** Page state transitions, API endpoint → page mapping

**Generation:** Run `frontend-e2e-explorer` with interaction tracing enabled. State transitions and network activity are captured and mapped.

---

## Step 11: Verify Deployment

### 11.1 File Integrity

```bash
TARGET="{{TARGET_PROJECT}}"

echo "=== Core Directories ==="
for dir in docs/02-harness docs/03-openspec docs/08-frontend-agent frontend-skill-template .claude/skills .codex/skills; do
  test -d "$TARGET/$dir" && echo "OK: $dir" || echo "MISSING: $dir"
done

echo "=== Skill Count ==="
skill_count=$(ls -d $TARGET/frontend-skill-template/*/ 2>/dev/null | wc -l)
echo "Skills: $skill_count (expected 11+)"

echo "=== Doc Count ==="
doc_count=$(find $TARGET/docs -name "*.md" 2>/dev/null | wc -l)
echo "Documents: $doc_count"
```

### 11.2 No Template Leakage

```bash
TARGET="{{TARGET_PROJECT}}"

# Check for template project name
grep -rn "Frontend Skill Forge" $TARGET/docs/00-project/ $TARGET/docs/05-domain/ --include="*.md" && \
  echo "ERROR: template name found" || echo "OK: no template name in project docs"

grep -rn "Task Center\|Skill Library\|Workflow\|Data Insight\|System Settings" \
  $TARGET/docs/00-project/ $TARGET/docs/05-domain/ --include="*.md" && \
  echo "WARNING: template module names found" || echo "OK: no template modules"
```

### 11.3 End-to-End Functional Test

Run a complete exploration cycle on one page to verify the methodology works:

```
1. Start target project's dev server
2. Run frontend-auth-login (if project has auth)
3. Run frontend-e2e-explorer on one key route
4. Verify: evidence files created in docs/07-evidence/
5. Verify: component discoveries logged in knowledge maps
6. Verify: no errors or blocked-by codes in the output
```

If this cycle succeeds, the methodology is correctly deployed.

---

## Appendix A: Complete File Action Map

Legend: **C** = COPY as-is, **A** = ADAPT (keep structure, update references), **R** = REGENERATE (from target source), **X** = RESET (archive old, create fresh)

| Path | Action | Notes |
|------|--------|-------|
| `docs/00-project/README.md` | R | Index of project docs |
| `docs/00-project/project-overview.md` | R | From `package.json` + route config |
| `docs/00-project/glossary.md` | R | From route config + data models |
| `docs/00-project/current-status.md` | R | Deployment status |
| `docs/00-project/roadmap.md` | R | Default: "TBD" |
| `docs/01-architecture/*.md` | A | Replace template names with target |
| `docs/02-harness/**` | C | Cross-project AI governance |
| `docs/03-openspec/**` | C | Spec management |
| `docs/04-development/README.md` | A | Update file list |
| `docs/04-development/coding-guide.md` | R | From target conventions |
| `docs/04-development/testing-guide.md` | R | From target test framework |
| `docs/04-development/local-development.md` | R | From target setup instructions |
| `docs/04-development/evidence-rules.md` | C | Cross-project |
| `docs/05-domain/README.md` | R | Index |
| `docs/05-domain/e2e-exploration-domain.md` | R | From target pages |
| `docs/05-domain/frontend-understanding-domain.md` | R | From target components |
| `docs/05-domain/incremental-coding-domain.md` | R | From target patterns |
| `docs/06-operations/README.md` | A | Update file list |
| `docs/06-operations/release-notes.md` | R | Initial deployment notes |
| `docs/06-operations/troubleshooting.md` | C | Keep generic, append target-specific |
| `docs/07-evidence/*` | X | Archive old, create fresh structure |
| `docs/08-frontend-agent/**` | C | Cross-project AI harness |
| `docs/09-change-records/*` | X | Archive old, create v0.1.0 |
| `docs/README.md` | A | Update index |
| `docs/MIGRATION_GUIDE_CN.md` | C | This guide |
| `docs/MIGRATION_GUIDE_EN.md` | C | This guide |
| `frontend-skill-template/*/` | C | All 11 skills |
| `.claude/skills/*/` | C | Runtime skills |
| `.codex/skills/*/` | C | Runtime skills |

---

## Appendix B: Verification Checklist

Run after completing all steps:

```bash
# 1. File integrity
test -d docs/02-harness/ && test -d docs/08-frontend-agent/ && test -d frontend-skill-template/

# 2. No template leakage in project-specific docs
grep -rn "Frontend Skill Forge" docs/00-project/ docs/05-domain/ && echo "FAIL" || echo "PASS"

# 3. Skill templates complete (each has SKILL.md)
for skill in frontend-skill-template/*/; do
  test -f "$skill/SKILL.md" || echo "MISSING: $skill"
done

# 4. YAML frontmatter valid (check name, description, metadata fields)
# 5. Knowledge maps reference target project (not template)
# 6. Credentials file updated for target project

# 7. End-to-end test:
#    - Start dev server
#    - Run frontend-auth-login
#    - Run frontend-e2e-explorer on one route
#    - Confirm evidence produced
```

---

## Appendix C: Key Principles

1. **COPY the governance layer verbatim.** `docs/02-harness/`, `docs/03-openspec/`, `docs/08-frontend-agent/` are designed to be technology-agnostic. Do not customize them.
2. **Skills work via selectors, not code.** Skills use `data-testid` (or equivalent selector conventions) to interact with pages. They do NOT import or depend on the target project's source code.
3. **Knowledge maps are living documents.** They are generated and updated by AI agents, not manually maintained. The initial versions after deployment are starting points.
4. **Credentials never in prompts.** The `frontend-auth-login` skill reads from `references/credentials.json` — update this file for the target project's dev credentials.
5. **One exploration at a time.** Generate knowledge maps incrementally — explore one route, verify the evidence, then proceed.
