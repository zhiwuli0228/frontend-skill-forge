# MCP-First Cross-Module Validation Prompt

Use this prompt when you want an agent to execute a full benchmark-grade run under the strongest current validation contract.

```text
请执行当前项目的一轮“Skill + MCP + 跨模块修改 + Skill 自进化”的完整端到端验证。不要降级成普通代码修改或普通 Playwright 回归。严格遵守以下要求。

执行前必须先读取并遵守：
1. `docs/08-frontend-agent/end-to-end-skill-mcp-cross-module-validation-program.md`
2. `docs/08-frontend-agent/context-governance-contract.md`
3. `docs/08-frontend-agent/ui-validation-evidence-contract.md`
4. `docs/08-frontend-agent/playwright-mcp-policy.md`
5. `artifacts/validation/README.md`
6. `artifacts/validation/END-TO-END-RUN-CHECKLIST.template.md`

目标：
验证当前仓库是否已经具备“真实 Skill 驱动 + MCP-first 探索 + 跨模块前端修改 + 自进化候选提取”的完整闭环能力。

强约定：
1. 先走 Skill-only 规划，不允许一开始就自由扫全仓库。
2. 先尝试 MCP-first 页面探索；如果 MCP 不可用或不足，必须明确记录 fallback 原因。
3. 任务必须跨模块。
4. 必须产生真实运行证据，不允许只做代码分析。
5. 必须产出 self-evolution observation，不允许只报测试通过。

本次 run 必须至少产出：
- `manifest.md`
- `task-report.md`
- `mcp-session.md` 或明确 fallback 说明
- `self-evolution-observations.md`
- 至少 2 张截图
- 1 个 trace 或 HTML report
- raw logs
- 结构化 JSON summary

记录重点：
1. 初始最小上下文是什么
2. 哪些上下文被刻意不加载
3. 第一次上下文升级为什么发生
4. MCP 是否真的提供了有效探索价值
5. 跨模块修改是否仍然保持 bounded
6. 哪些异常值得进入 skill / rule / knowledge evolution queue

最终输出必须明确给出：
1. run 结论：pass / partial / fail / blocked
2. context governance 结论：有效 / 部分有效 / 无效
3. MCP-first 结论：有效 / 部分有效 / 无效
4. cross-module change 结论：bounded / risky / uncontrolled
5. self-evolution 结论：是否产生候选，以及候选属于 Skill / rule / knowledge
```
