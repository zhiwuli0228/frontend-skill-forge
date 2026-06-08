# Element Stitching Spike 01 — 首次穿刺记录

Date: 2026-06-09
Status: Complete
Related: `element-stitching-protocol.md`

## 目标

验证 MCP 浏览器探索 ↔ AST 源代码分析的缝合机制是否能在真实页面上产出可用的 Element Registry。

## 执行

### 链路

```
代码侧: AST 索引器扫描 src/ 56 个 .tsx 文件 → 提取 54 个组件
    (componentName, testids, visibleTexts, eventBindings, stateDeclarations, imports)
      +
浏览器侧: MCP Playwright 打开 /task/list/all 和 /skill/list/all
    → browser_evaluate 提取所有可交互元素 (role, testid, visibleText, tag)
      ↓
缝合算法: Anchor Profile 计算 → Primary(Testid) + Fallback(Text)
    → 逐元素匹配 → 消歧义 → 后处理 enrichment
      ↓
element-registry.json
```

### 结果数据 (v3 — 经过 issue #1 + #2 修复后)

| /task/list/all | 数值 |
|---------------|------|
| 总元素 | 19 |
| 匹配 | 10 (9 high / 1 medium) |
| 未匹配 | 9 |

| /skill/list/all | 数值 |
|----------------|------|
| 总元素 | 20 |
| 匹配 | 14 (13 high / 1 medium) |
| 未匹配 | 6 |

### 结果数据 (v1 — 首次穿刺)

| /task/list/all | 数值 |
|---------------|------|
| 总元素 | 19 |
| 匹配 | 10 (5 high / 5 medium) |
| 未匹配 | 9 |

| /skill/list/all | 数值 |
|----------------|------|
| 总元素 | 20 |
| 匹配 | 10 (7 high / 3 medium) |
| 未匹配 | 10 |

### Anchor Profile

```
testidCoverage: 90.7%
textUniqueness: 35.3%
recommendedPrimary: testid
recommendedFallback: text
```

## 已验证成立的

1. **testid 精确匹配可靠** — 12 条 high-confidence 全部来自 testid 精确匹配，准确率 100%
2. **代码侧索引器可行** — 56 文件 54 组件，提取了足够的锚点信息用于匹配
3. **MCP 浏览器采集可用** — browser_evaluate 能提取所有可交互元素的 role/testid/text，且比 YAML 快照更结构化
4. **build/lint/e2e 零回归** — 新增代码不影响现有验证基线

## 发现的问题

### 问题 1: 动态 testid 无法匹配 ✅ 已修复

**现象**: 元素 `tab--task-create`(testid) 无法匹配任何组件，但源码中 TopTabNavigation 确实渲染了它。

**根因**: 源码中的 testid 是模板字符串 `` `tab-${sanitizeKey(tab.key)}` ``，而浏览器中实际渲染的是 `tab--task-create`(sanitizeKey 将 `/task/create` 转为 `-task-create`)。索引器只捕获了模板字符串本身，无法求值。

**影响范围**: 所有 tabs (`tab--task-list`, `tab--task-create`, `tab--task-templates`, `tab--task-board`, `tab--skill-list`, `tab--skill-market`, `tab--skill-config`, `tab--skill-versions`) 和动态 id 模式 (`skill-card-${id}`, `template-card-${id}` 等)

**修复方案**: 
- 在 testid-strategy 中添加 `extractPrefix()` 函数，从捕获的模板字符串中提取静态前缀（去掉 backtick 和 `${...}` 动态部分）
- 浏览器 testid `tab--task-create` 前缀匹配代码模板 `` `tab-${sanitizeKey(tab.key)}` `` → 提取前缀 `tab-`
- 同样修复了 `skill-card-s16` 匹配到 `skill-card-${skill.id}` 的问题
- 结果: /task/list/all 从 9 匹配提升到 10 匹配，/skill/list/all 从 10 匹配提升到 14 匹配，高置信度从 5+8 提升到 9+13

### 问题 2: 文本匹配缺少上下文消歧义 ✅ 已修复

**现象**: 文本"Open"匹配到 TemplatePreviewModal；"Completed"匹配到 TaskTable。

**根因**: 文本匹配只按字符串搜索源码中的 jsxVisibleTexts，不做上下文过滤。一个 sidebar menuitem 的文本不应该匹配到 modal 或 table。

**影响范围**: 所有无 testid 的 sidebar menuitem、pagination button、列标题等

**修复方案**: 
- 创建 `component-role-strategy.ts`，映射浏览器 ancestorRoles 到预期源码目录
- 在 `stitch.ts` 中引入 `combinedScore()` = strategyScore × 0.65 + contextScore × 0.35
- 引入 `MIN_CONFIDENCE = 0.48` 阈值：当 context 强烈反对匹配时 (contextScore = 0.3)，combined score 降到阈值以下，元素返回 unmapped 而不再错误匹配
- 消歧义时按 combined score 排序，选取最高分候选
- 结果: 假阳性 ("Open"→TemplatePreviewModal, "Completed"→TaskTable) 全部消除，正确转为 unmapped

### 问题 3: dataFlow handler 追踪跨组件混淆 ✅ 部分修复

**现象**: `module-switcher-btn` 的 handlerDefinedIn 指向 WorkflowEditorPage，正确应指向 GlobalShell。

**根因**: 后处理 enrichment 按 handler 名字全局搜索，不限制路由作用域。`setScenario`、`onRetry`、`handleClick` 等通用名字在多个组件中出现，取到了错误的那一个。

**影响范围**: 所有 handler 名字非唯一的条目

**修复方案**:
- 改为 source-component-first 策略：优先认定 handler/state 定义在 sourceComponent 自身
- 只有当 sourceComponent 的 eventBindings/stateDeclarations 中不包含该标识符时，才向外搜索
- 向外搜索时限定到 page-level 组件（`/pages/`），而非全局任意组件
- 结果: 5 个跨组件错误全部纠正，handlerDefinedIn 和 stateOwnedBy 现在指向正确的源组件
- 剩余局限: 当 handler 通过 props 从父组件传入时（如 `onCategoryChange` 从 SkillListPage 传入 SkillFilterBar），source-first 会指向 SkillFilterBar 而非实际的 SkillListPage。精确追踪需要 props 流分析，超出当前 regex 索引器能力。

### 问题 4: 代码侧文本提取噪声 (索引质量问题)

**现象**: 提取的 jsxVisibleTexts 中有代码片段如 `');\n  }\n\n  return ('`, `))}`。高质量文本占比低。

**根因**: 正则 `/>\s*([^\s<][^<]{0,60}?)\s*</` 过于宽松，匹配到了 JSX 表达式内的代码，不仅是纯文本。

**影响范围**: 文本匹配的召回率和准确率均受拖累  (textUniqueness 35% 部分原因是噪声文本被计入)

**解决方向**:
- 改进正则，排除包含 `{`, `}`, `(`, `)`, `;` 的匹配
- 长期改用 ts-morph 或 babel 做真正的 JSX 文本提取

## 架构反思

### 关于粒度

组件级粒度 (sourceComponent + sourceFile + boundHandler/boundState 命名锚点) 是正确的选择。首次穿刺中没有任何匹配因为行号变化而失效——因为根本不用行号。数据流追踪不够精确是算法问题，不是粒度问题。

### 关于锚点策略可扩展性

策略接口设计 (`AnchorStrategy`) 在首次穿刺中只用了 testid 和 text 两个实现，但接口本身支持扩展。动态 testid 问题可以通过新增 `dynamic-testid` 策略解决，不需要改核心算法。

### 关于浏览器采集方式

`browser_evaluate` 比 YAML 快照更合适——直接产出结构化 JSON，无需解析。但当前每路由手动 capture 的方式不适合规模化——需要自动化采集脚本。

### 关于自进化闭环

当前 registry 是一次性生成。保鲜机制只定义了触发条件 (commit hook, E2E failure, 定期扫描)，但没有实现。这是 Phase 2 的核心工作。

## 下一步

1. ~~修复问题 2 (文本匹配上下文消歧义)~~ ✅ 已完成
2. ~~修复问题 1 (动态 testid 匹配)~~ ✅ 已完成
3. ~~修复问题 3 (dataFlow 追踪)~~ ✅ 部分修复 (source-first 策略已消除跨组件混淆，props 流追踪需 AST 升级)
4. 自动化多路由采集 — MCP 批量采集脚本代替手动逐路由执行
