# Skill Templates

This directory contains executable Skill templates for frontend-skill-forge projects.

## Skill Catalog

| Skill | Type | Purpose |
|---|---|---|
| `frontend-auth-login` | precondition | Authenticate browser session before exploration; shields other skills from auth differences |
| `frontend-project-reader` | discovery | Read project structure and maintain knowledge maps (route-map, component-map) |
| `frontend-e2e-explorer` | exploration | Explore UI via Playwright MCP and produce evidence records |
| `frontend-incremental-coder` | implementation | Implement frontend changes within approved boundaries |
| `frontend-registry-stitch` | analysis | Stitch browser elements to source code via element registry |
| `element-registry-maintainer` | maintenance | Maintain and validate the element registry health |
| `skill-evolution-maintainer` | maintenance | Maintain skill change log and evolution evidence |
| `frontend-task-creation` | planning | Create and manage OpenSpec tasks for frontend changes |
| `frontend-test-spec-generator` | analysis-and-generation | Analyze source code and generate executable E2E test spec/plan/tasks documents |
| `create-task-skill` | action | Create tasks through the 4-step task creation wizard via Playwright MCP browser tools |

## Usage

To use these Skills in your own project:

1. Copy the desired skill directory to your project `.opencode/skills/`:

```bash
cp -r frontend-skill-template/frontend-task-creation/ ../my-project/.opencode/skills/
```

2. Ensure your project-local OpenCode recognizes the copied Skill.

3. You may edit SKILL.md to adapt the workflow, page map, or references for your project.

4. Keep the original references directory with the skill for proper execution.
