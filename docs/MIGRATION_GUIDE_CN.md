# AI 辅助开发方法论 —— 部署指南

## 一、概述

本指南教你将 Frontend Skill Forge 的 **AI 辅助开发方法论** 部署到任意前端项目中。这套方法论不依赖特定技术栈（React/Vue/Angular/Svelte 均可），它提供的是：

| 交付物 | 路径 | 说明 |
|--------|------|------|
| **文档体系** | `docs/` | 13个子目录，覆盖架构、开发、运维、AI治理、变更记录 |
| **技能模板** | `frontend-skill-template/` | 11个 AI Agent 技能（页面探索、元素注册、增量编码、测试生成等） |
| **AI 配置** | `.claude/` `.codex/` | AI Agent 运行时配置和技能注册 |
| **知识地图** | `docs/02-harness/knowledge/frontend/` | 路由地图、组件地图、元素注册表、API契约地图、状态流地图 |

部署完成后，你的项目将具备：
- AI Agent 自动探索页面并产出证据的能力
- AI Agent 辅助编码和测试生成的能力
- 结构化的文档体系和变更记录流程
- 可复用的技能模板适应你的项目

---

## 二、方法论架构

### 2.1 文档体系 (`docs/`)

```
docs/
├── 00-project/          项目身份：概述、术语表、路线图、当前状态
├── 01-architecture/      架构文档：分层、模块边界、路由设计
├── 02-harness/            AI 治理层：Agent 工作流、Git 治理、验证策略、技能生命周期
├── 03-openspec/           OpenSpec 规范管理
├── 04-development/        开发指南：编码规范、测试指南、证据规则
├── 05-domain/             领域文档：页面探索、前端理解、增量编码
├── 06-operations/         运维：发布说明、故障排除
├── 07-evidence/           验证证据：截图、Playwright 痕迹、报告
├── 08-frontend-agent/    前端 AI 治理：MCP 协议、E2E 资产、UI 证据、技能演进
├── 09-change-records/    变更台账：基线、版本、发布、问题、优化
├── MIGRATION_GUIDE_CN.md  本指南
└── MIGRATION_GUIDE_EN.md  英文版（面向 AI Agent）
```

### 2.2 技能体系 (`frontend-skill-template/`)

| 技能 | 类型 | 用途 |
|------|------|------|
| `frontend-auth-login` | precondition | 自动登录认证，屏蔽不同项目的认证差异 |
| `frontend-project-reader` | discovery | 读取项目结构，维护知识地图 |
| `frontend-e2e-explorer` | exploration | 通过 Playwright MCP 探索页面，产出证据记录 |
| `frontend-incremental-coder` | implementation | 在审批边界内实现前端变更 |
| `frontend-registry-stitch` | analysis | 将浏览器元素映射到源代码 |
| `element-registry-maintainer` | maintenance | 维护和验证元素注册表健康状态 |
| `skill-evolution-maintainer` | maintenance | 维护技能变更日志和演化证据 |
| `frontend-task-creation` | planning | 创建和管理前端任务 |
| `frontend-test-spec-generator` | analysis-and-generation | 分析源码生成 E2E 测试规格文档 |
| `create-task-skill` | action | 通过4步表单向导创建任务 |
| `skill-creation-methodology` | reference | 从 UI 流程到可执行技能的完整方法论 |

### 2.3 部署策略：三类处理方式

| 处理方式 | 适用对象 | 操作 |
|----------|----------|------|
| **直接复制** | 跨项目通用的治理层和技能 | 复制整个目录，无需修改 |
| **适配更新** | 包含模板项目具体引用的文档 | 保留结构，替换项目名称和模块引用 |
| **重新生成** | 完全项目特定的文档 | 删除旧内容，基于目标项目源码重新生成 |

---

## 三、逐步部署操作

### 第1步：复制方法论核心

将以下目录和文件**原样复制**到目标项目根目录：

```bash
# 从 frontend-skill-forge 复制到你的项目
TEMPLATE="frontend-skill-forge"
TARGET="my-project"

# 1. AI 治理层（跨项目通用，无需修改）
cp -r $TEMPLATE/docs/02-harness/     $TARGET/docs/02-harness/
cp -r $TEMPLATE/docs/03-openspec/    $TARGET/docs/03-openspec/
cp -r $TEMPLATE/docs/08-frontend-agent/ $TARGET/docs/08-frontend-agent/

# 2. 技能模板（全部11个 skill）
cp -r $TEMPLATE/frontend-skill-template/ $TARGET/frontend-skill-template/

# 3. AI Agent 配置
cp -r $TEMPLATE/.claude/  $TARGET/.claude/
cp -r $TEMPLATE/.codex/   $TARGET/.codex/

# 4. 迁移指南本身
cp $TEMPLATE/docs/MIGRATION_GUIDE_CN.md $TARGET/docs/MIGRATION_GUIDE_CN.md
cp $TEMPLATE/docs/MIGRATION_GUIDE_EN.md $TARGET/docs/MIGRATION_GUIDE_EN.md

# 5. 其他跨项目通用的文档子目录
cp -r $TEMPLATE/docs/04-development/evidence-rules.md $TARGET/docs/04-development/
```

**直接复制清单：**

| 路径 | 说明 |
|------|------|
| `docs/02-harness/` | AI 治理层（Agent 工作流、Git 治理、验证策略、技能生命周期规则） |
| `docs/03-openspec/` | OpenSpec 规范管理流程 |
| `docs/08-frontend-agent/` | 前端 AI 治理（MCP 协议、元素拼接协议、UI 证据模板、演化队列） |
| `frontend-skill-template/` | 全部技能模板（11个 skill，每个含 SKILL.md + references/） |
| `.claude/skills/` | AI Agent 运行时技能 |
| `.codex/skills/` | Codex 运行时技能 |
| `docs/MIGRATION_GUIDE_CN.md` | 本指南 |
| `docs/MIGRATION_GUIDE_EN.md` | 英文版（面向 AI Agent） |

---

### 第2步：适配项目概述文档

`docs/00-project/` 包含项目身份信息，需要基于目标项目重写。

| 文件 | 操作 | 说明 |
|------|------|------|
| `README.md` | 重写 | 列出目录下文件索引 |
| `project-overview.md` | **重新生成** | 项目名称、技术栈、模块列表、架构特点 |
| `glossary.md` | **重新生成** | 模块术语、实体术语、状态术语、技术术语 |
| `current-status.md` | **重新生成** | 当前版本、部署完成状态、已知问题 |
| `roadmap.md` | 更新 | 未来规划（如无，写 "TBD"） |

**生成方式**：使用 AI Agent 读取目标项目的 `package.json`、路由配置、模块定义等，生成文档。详见第四章 Prompt 集。

---

### 第3步：适配架构文档

`docs/01-architecture/` 描述通用架构模式，但示例中引用了模板项目名称和模块名。需要全文替换。

**操作**：在 `docs/01-architecture/` 下所有 `.md` 文件中：
1. 将模板项目名称替换为目标项目名称
2. 如果文档中有模板模块名（task/skill/workflow/insight/settings），替换为目标项目的实际模块名
3. 保留架构概念和模式的描述不变

**如果目标项目有完全不同的架构**（如 Vue 不是 React、没有模块化路由等），建议删除 `docs/01-architecture/` 并在目标项目稳定后重新生成。

---

### 第4步：适配开发指南

`docs/04-development/` 中包含开发约定和测试指南，需要根据目标项目更新。

| 文件 | 操作 | 说明 |
|------|------|------|
| `README.md` | 更新 | 文件索引 |
| `coding-guide.md` | **重新生成** | 基于目标项目的编码规范 |
| `testing-guide.md` | **重新生成** | 基于目标项目的测试框架 |
| `local-development.md` | **重新生成** | 本地环境搭建步骤 |
| `evidence-rules.md` | **保留** | 证据规则（跨项目通用） |

---

### 第5步：生成领域文档

`docs/05-domain/` 描述目标项目的具体领域（页面、组件、数据模型）。这是最核心的定制化步骤。

需要生成三份文档：

#### 5.1 `e2e-exploration-domain.md` — E2E 探索领域

描述 AI Agent 应如何探索每个页面。为每个页面定义：
- 路由路径和数据标记（`data-testid`）
- UI 状态场景（loaded/loading/empty/error）
- 探索路径（访问什么→点击什么→期望什么）
- 关键断言点

**信息来源**：目标项目的路由配置 + 页面组件源码。

#### 5.2 `frontend-understanding-domain.md` — 前端理解领域

描述每个页面的组件树、数据流和状态管理。为每个页面定义：
- 组件嵌套关系
- 数据模型（类型定义）
- 状态管理模式
- 路由参数约定

**信息来源**：目标项目的页面组件 + 数据模型文件。

#### 5.3 `incremental-coding-domain.md` — 增量编码领域

描述目标项目的编码模式和约定：
- 新增模块/页面的标准流程
- 组件模板（可直接复制使用）
- Mock 数据格式
- 命名约定

**信息来源**：选择一个完整实现的模块作为参考，提取模式。

---

### 第6步：更新运维文档

| 文件 | 操作 | 说明 |
|------|------|------|
| `README.md` | 更新 | 运维文档索引 |
| `release-notes.md` | 重写 | 首个版本发布说明 |
| `troubleshooting.md` | 保留+追加 | 保留通用故障排除，追加项目特定问题 |

---

### 第7步：重置证据和变更记录

#### 7.1 `docs/07-evidence/` — 验证证据

```bash
# 归档旧证据
mkdir -p docs/07-evidence/archive/template-reference
mv docs/07-evidence/*.md docs/07-evidence/archive/template-reference/ 2>/dev/null

# 创建新的 README.md
```

证据目录是运行 AI 探索技能后的**产出目录**。部署完成后运行 `frontend-e2e-explorer`，新的截图、痕迹、报告会自动放入此目录。

#### 7.2 `docs/09-change-records/` — 变更台账

```bash
# 归档模板记录
mkdir -p docs/09-change-records/archive/template-history
mv docs/09-change-records/baselines/ docs/09-change-records/archive/template-history/ 2>/dev/null
mv docs/09-change-records/releases/ docs/09-change-records/archive/template-history/ 2>/dev/null
mv docs/09-change-records/summaries/ docs/09-change-records/archive/template-history/ 2>/dev/null
mv docs/09-change-records/versions/ docs/09-change-records/archive/template-history/ 2>/dev/null

# 创建首个版本记录
mkdir -p docs/09-change-records/versions
echo "# v0.1.0 — 方法论部署" > docs/09-change-records/versions/v0.1.0-deployment.md
```

---

### 第8步：配置 AI Agent

#### 8.1 更新 `CLAUDE.md`

目标项目可能已有 `CLAUDE.md`（或类似的项目指令文件）。将以下内容追加到目标项目的项目指令中：

```markdown
## AI 辅助开发体系

本项目部署了 Frontend Skill Forge 方法论。以下资源可供 AI Agent 使用：

- 知识地图：`docs/02-harness/knowledge/frontend/`（路由地图、组件地图、元素注册表）
- 技能模板：`frontend-skill-template/`（11个可执行技能）
- AI 治理规则：`docs/02-harness/rules/`
- 证据模板：`docs/08-frontend-agent/evidence/`
```

#### 8.2 更新技能中的路径引用

Skill 模板中的路径引用（如知识地图路径、源文件路径）是相对路径，在目标项目中通常无需修改。但如果目标项目的目录结构与模板显著不同，需要搜索并替换：

```
搜索关键词：
- "src/shell/config/moduleConfig.tsx" → 目标项目的等效文件
- "src/app/router.tsx" → 目标项目的等效文件
- "src/domains/" → 目标项目的业务代码目录
- "docs/02-harness/knowledge/frontend/" → 如果改变了知识地图位置
```

---

### 第9步：部署 Skill 模板

将 `frontend-skill-template/` 中的技能注册为 AI Agent 的可用技能。

#### Claude Code 用户

技能已在 `.claude/skills/` 中注册。确认以下内容：

```
.claude/skills/
├── frontend-auth-login/
├── frontend-project-reader/
├── frontend-e2e-explorer/
├── ... (所有11个技能)
```

每个技能目录至少包含 `SKILL.md`。如果缺少某个技能，从 `frontend-skill-template/` 复制。

#### 其他 AI Agent 平台

将 `frontend-skill-template/<skill-name>/` 复制到对应平台的技能目录。具体路径取决于你使用的 AI Agent 平台。

#### 运行时复制

每次从 `frontend-skill-template/` 更新技能后，需同步到运行时目录：

```bash
cp -r frontend-skill-template/create-task-skill/ .claude/skills/create-task-skill/
```

---

### 第10步：生成知识地图

知识地图是 AI Agent 理解和操作项目的关键输入。部署后需要为**目标项目**生成以下地图：

#### 10.1 路由地图 (`route-map.md`)

列出所有路由：路径 → 页面组件 → 模块归属。

**生成方式**：运行 `frontend-project-reader` 技能，它会自动解析路由配置并生成路由地图。

#### 10.2 组件地图 (`component-map.md`)

列出所有页面和关键组件：组件名 → 文件路径 → Props 接口 → data-testid 清单。

**生成方式**：运行 `frontend-e2e-explorer` 技能逐个探索页面后自动产出。

#### 10.3 元素注册表 (`element-registry.json`)

浏览器 DOM 元素到源代码的映射，由 `frontend-registry-stitch` 技能自动生成和维护。

#### 其他地图

- `state-flow-map.md` — 页面状态流转图
- `api-contract-map.md` — API 契约映射
- `project-map.md` — 项目结构总图

这些地图由 `frontend-project-reader` 技能自动生成。

---

### 第11步：验证部署

#### 11.1 文件完整性检查

```bash
# 检查核心目录是否存在
ls docs/02-harness/ docs/03-openspec/ docs/08-frontend-agent/
ls frontend-skill-template/
ls .claude/skills/ .codex/skills/

# 检查技能数量（应为11个）
ls frontend-skill-template/ | wc -l
```

#### 11.2 技能可加载性检查

每个技能目录应包含：
- [ ] `SKILL.md`（必须）
- [ ] `references/` 目录（可选但推荐）
- [ ] SKILL.md 的 YAML frontmatter 有效（`name`, `description`, `metadata` 字段齐全）

#### 11.3 知识地图检查

- [ ] `docs/02-harness/knowledge/frontend/route-map.md` 反映目标项目的路由
- [ ] `docs/02-harness/knowledge/frontend/component-map.md` 反映目标项目的组件
- [ ] 无残留模板项目的页面/模块名称

#### 11.4 功能验证

选一个最关键的页面，运行 `frontend-auth-login` → `frontend-e2e-explorer` 做一次完整的探索循环：

1. 启动目标项目的开发服务器
2. 通过 AI Agent 运行登录技能
3. 运行探索技能，产出该页面的证据记录
4. 确认截图、快照、组件发现记录正确

如果这个循环能跑通，部署即为成功。

---

## 四、文档生成 Agent Prompt 集

以下是可直接复制使用的 AI Agent Prompt，每个 Prompt 都会基于目标项目的实际源码生成文档。

### Prompt 1: `docs/00-project/project-overview.md`

```
请生成 docs/00-project/project-overview.md（项目概述文档）。

【要求】
1. 读取 package.json，获取项目名称和技术栈
2. 读取路由配置文件，获取所有路由和页面清单
3. 读取项目根目录的 CLAUDE.md 或 README.md，了解项目定位

【输出结构】
- 标题："<项目名称> — 项目概述"
- "项目定位"：1-2段话描述项目是什么
- "技术栈"：表格列出关键技术及版本
- "页面/模块清单"：表格列出所有页面（路由路径、页面说明）
- "架构特点"：3-5个要点
- "目录结构"：关键目录的简要说明

格式参考：如果 docs/01-architecture/ 下有架构相关文档，先读取了解项目的架构模式。
```

### Prompt 2: `docs/00-project/glossary.md`

```
请生成 docs/00-project/glossary.md（术语表）。

【要求】
1. 读取路由配置和模块定义，提取所有模块名称
2. 读取数据模型文件（如 types.ts、interfaces.ts、mock-data.ts），提取实体类型和状态值
3. 读取已有文档，提取技术术语

【输出结构】
- "模块术语"：表格（术语、英文、说明）
- "实体术语"：表格（实体名、所属模块、说明）
- "状态术语"：表格（状态值、所属实体、说明）
- "技术术语"：表格（术语、说明）
```

### Prompt 3: `docs/05-domain/e2e-exploration-domain.md`

```
请生成 docs/05-domain/e2e-exploration-domain.md。

【要求】
1. 读取路由配置，获取所有页面路由
2. 读取每个页面的源码，提取 data-testid 属性和场景模式
3. 对每个页面，描述探索路径（访问→观察→交互→验证）

【输出结构】
- 标题："E2E 探索领域"
- 对每个模块/页面组：
  - 路由前缀和页面清单（表格）
  - 探索路径（自然语言步骤）
  - 关键断言点（至少3个）
- "跨页面探索"章节（如有需要跨页面导航的场景）
- "探索检查清单"（checkbox 列表）
```

### Prompt 4: `docs/05-domain/incremental-coding-domain.md`

```
请生成 docs/05-domain/incremental-coding-domain.md。

【要求】
1. 读取一个完整实现的模块（挑选最有代表性的），了解编码模式
2. 读取项目的编码规范文件（如 .eslintrc、prettier.config 等）
3. 读取测试文件，了解测试框架和测试模式

【输出结构】
- "新增模块/页面的标准流程"：8步操作清单
- "页面组件模板"：可直接复制使用的代码骨架
- "数据模型模板"：mock 数据或 API 层的标准格式
- "命名速查表"：文件命名、组件命名、路由命名约定
- "测试模板"：单元测试和集成测试的标准格式
```

### Prompt 5: `docs/01-architecture/`

```
请更新 docs/01-architecture/ 下的所有 .md 文件。

【操作】
对每个 .md 文件：
1. 全文搜索模板项目的特征名称（如 "Frontend Skill Forge"、"task center"、"skill library" 等）
2. 替换为目标项目的名称和模块名
3. 如果原文中的示例与目标项目架构不符（如模板用了 React Router 而目标项目用了 Vue Router），保留概念描述但移除不匹配的代码示例

【注意】
- 不要修改架构概念和模式的描述
- 保留作为"例如"出现的示例，只替换名称
- 确保 Markdown 内部链接不损坏
```

### Prompt 6: `docs/06-operations/release-notes.md`

```
请生成 docs/06-operations/release-notes.md。

【信息】
- 当前日期
- 项目名称
- 版本号：v0.1.0
- 主题：部署 AI 辅助开发方法论

【输出结构】
- "v0.1.0 — 方法论部署"
  - 部署了文档体系（docs/ 13个子目录）
  - 部署了技能模板（11个 AI Agent 技能）
  - 已生成的知识地图
  - 已知限制
- "下一步计划"
```

---

## 五、部署验证检查清单

### 文件完整性

- [ ] `docs/` 目录下13个子目录均已就位
- [ ] `frontend-skill-template/` 下有11个技能目录
- [ ] `.claude/skills/` 下技能已注册
- [ ] `.codex/skills/` 下技能已注册

### 文档质量

- [ ] `docs/00-project/` 文档反映目标项目身份（无残留模板项目名称）
- [ ] `docs/05-domain/` 文档基于目标项目源码生成
- [ ] `docs/01-architecture/` 中的模块引用已更新
- [ ] 所有 Markdown 内部链接有效
- [ ] 文档中引用的路由路径与实际路由一致

### 技能可用性

- [ ] 每个 `SKILL.md` 有有效的 YAML frontmatter
- [ ] 技能中的选择器/路由引用如果涉及目标项目，已更新
- [ ] 凭据文件（如 `references/credentials.json`）已更新为目标项目的凭据

### 功能验证

- [ ] 启动目标项目开发服务器后，AI Agent 可以成功运行 `frontend-auth-login`
- [ ] AI Agent 可以成功运行 `frontend-e2e-explorer` 探索至少一个页面
- [ ] AI Agent 可以成功运行 `frontend-project-reader` 生成知识地图

---

## 六、常见问题

### Q: 目标项目的技术栈和模板不一样（如 Vue vs React），技能还能用吗？

大部分技能是技术栈无关的：
- `frontend-auth-login` / `frontend-e2e-explorer` — 只依赖 Playwright MCP（与框架无关）
- `frontend-registry-stitch` — 只依赖 DOM 元素和 `data-testid`（与框架无关）
- `frontend-project-reader` — 读取任意文本文件

如果你的项目使用 `data-testid`（或其他稳定的选择器约定），所有探索和分析技能都能正常工作。

### Q: 目标项目没有 `moduleConfig.tsx` 这种集中式配置怎么办？

技能模板中的路径引用是**可选的辅助信息**。没有对应文件不影响技能执行。Agent 会基于目标项目的实际结构工作。

### Q: 需要一次性部署全部13个 docs 子目录吗？

不需要。建议优先部署：
1. `docs/02-harness/` + `docs/08-frontend-agent/`（AI 治理核心）
2. `frontend-skill-template/`（技能核心）
3. `docs/00-project/` + `docs/05-domain/`（项目特定可后续补充）

其余目录可按需逐步添加。

### Q: 知识地图必须手动维护吗？

不需要。知识地图由 AI Agent 自动生成和更新：
- 路由/组件地图：`frontend-project-reader` 自动产出
- 元素注册表：`frontend-registry-stitch` 自动维护
- 状态流/API契约地图：`frontend-e2e-explorer` 探索后自动更新

### Q: frontend-skill-template/ 和 .claude/skills/ 有什么区别？

- `frontend-skill-template/` — 技能的**源文件**（git 跟踪，可跨项目复制）
- `.claude/skills/` — 技能的**运行时副本**（Claude Code 读取执行）

修改技能时编辑 `frontend-skill-template/`，然后同步到 `.claude/skills/`。
