# Frontend Task Creation Skill Template References

This directory stores optional supporting materials for the `frontend-task-creation` Skill template.

## Recommended Reference Files

You may add these files when adapting the template to a real project:

- `task-template.md`
- `operation-path-rules.md`
- `failure-handling.md`
- `page-map-usage.md`
- `evidence-rules.md`
- `examples.md`

## Rules

- Do not duplicate executable Skill content here.
- Keep `SKILL.md` short and executable.
- Put long examples, schemas, checklists, and troubleshooting notes here.
- Load references lazily only when the current task requires them.
- Copy this `references/` directory together with `SKILL.md` when enabling the Skill in a project.

## Usage

Copy the entire skill directory into a project-local OpenCode skills directory:

```text
skill-templates/frontend-task-creation/
  -> .opencode/skills/frontend-task-creation/
```

After copying, adapt the paths, page-map names, playbook names, and evidence policy to the target project.
