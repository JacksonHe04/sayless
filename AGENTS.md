# SAYLESS — AGENTS.md

> 本文档基于 `native/26-07-25.md` 与后续产品收敛留痕

SAYLESS 是一个**只做简历**的工具：编辑结构化内容、调整版式、实时预览、导出与分享。它曾经扩展为完整的求职流程管理（简历 → 投递 → 面试 → 题库），现在重新收敛为简历单一功能；投递、面试、题库、公司、批次与总览 dashboard 均已移除，不应重新引入。

| 维度 | 决定 |
| --- | --- |
| 用户范围 | 需要维护简历的个人：大学生、互联网、营销、商科等 |
| 协作模型 | **纯个人空间**，不需要多人协作、团队空间、共享工作区 |
| 商业模式 | **完全免费**。不接入付费墙、不做配额、不区分等级 |
| 数据导入 | **不提供任何外部平台导入** |
| AI 能力 | **不做**。不调用任何 LLM、不提供"AI 润色简历"之类的能力 |
| 公开性 | **公开 SaaS 优先**，任何注册用户都能立即使用全功能 |
| 部署形态 | Next.js 部署到 Vercel；Cloudflare 仅承担 D1 数据库与 Workers 网关；**环境单一，不区分 Preview/Production** |

## 领域实体

### 鉴权

- 通过 iNon SSO 登录；账户设置页维护个人资料、密码与会话。
- 中央身份平台在 `https://sso.inon.space`；SAYLESS 自身 origin 仍是 `https://sayless.inon.space`，OAuth 回调为 `/api/auth/inon/callback`。
- `proxy.ts` 为未登录访客下发 `sayless_anon`（HttpOnly UUID，一年期）。

### Resumes

- 唯一业务实体。简历数据以 `userId`（文本主键）严格归属于一个用户。
- **访客（未登录）**：允许基于「新建简历」模板编辑并实时保存。访客简历落库时 `userId` 保持 `DEMO_USER_ID`（外键安全），同时记录 `guest_device_id` = 匿名 UUID 做**设备级隔离**。
- 同一浏览器（同一 `sayless_anon`）再次访问 `/resumes` 会自动找回最近编辑的那一份继续编辑；不同设备 / 浏览器之间互不可见；登录用户只读取 `guest_device_id IS NULL` 的行，绝不接触任何访客数据。
- 匿名 UUID 是 122 bit 的 bearer token，服务端只接受严格 UUID 格式（见 `modules/auth/anon-id.ts`）；设备 id 不属于鉴权凭据，仅用于访客数据的水平隔离。
- 简历编辑器保持三栏结构：左侧结构化配置（版式 / 内容 / JSON）、中间 A4 预览、右侧简历列表。顶栏两端的 VS Code 风格图标分别收起 / 展开左右栏；移动端左右栏以覆盖层出现，且同时只能展开一个。
- 顶栏负责重命名、复制 Markdown、导出 PDF 与公开分享；克隆位于右侧列表的三点菜单。列表展示每份简历的版本号，名称与版本随编辑实时同步。正文可分别设置中文 / 英文是否使用衬线字体。

## 信息架构与导航

应用没有全局侧栏或移动端底栏，唯一的外壳是顶栏：

1. 左侧 **SAYLESS** 品牌入口（指向 `/resumes`）
2. 中间是页面工具栏（`AppTopbarPortal` 挂载页面的标题与操作）
3. 右侧是个人区域：账号设置 / 登录态信息

`/` 与 `/resumes` 都直接进入最近更新的简历编辑器；没有独立总览页。

## 视觉与品牌

**Vercel 官网是 SAYLESS 的视觉范本**：

- 风格关键词：克制、留白、灰阶 + 中性色强调、几何精准、强排版层级
- 组件库：shadcn（**始终使用项目内已安装的最新版本**），通过 Radix UI 沉淀交互基础
- 图标：lucide-react
- 动效：framer-motion，按需少量使用，避免无意义动画

### 配色

- **主色：绿色系**。绿色作为强调色承担操作、品牌、双状态反馈。
- 避免选择：荧光绿、屎绿色、纯黑色侧边栏。
- 侧边栏**不使用纯黑背景**，用浅灰 / 白色 + 微边框代替。
- 中性灰阶承担层级，品牌橙黄红仅在系统状态（成功 / 警告 / 危险）出现，且低饱和。

### 排版

- 字体选择中性、清晰、无衬线为主；**避免花哨或过于风格化的英文字体**。
- 中文优先使用系统默认中文栈或项目内置字体；不要引入新装饰字体。
- 字号阶梯：12 / 14 / 16 / 20 / 24 / 30，每级之间的对比要明确。

### 品牌资产

- Brand name：**SAYLESS**
- 域名：`sayless.inon.space`
- 写 README、邮件、营销文案时，务必使用这个 brand 名而不是 `say less` 或其它拆写。

---

## 技术栈与工程约束

| 层级 | 选型 |
| --- | --- |
| Web 框架 | Next.js 16（App Router） |
| UI 库 | React 19、TypeScript 6 |
| 样式 | Tailwind CSS 4 |
| 组件 | shadcn（最新版本）、Radix UI |
| 图标 | lucide-react |
| 动效 | framer-motion |
| 数据获取 | @tanstack/react-query |
| 表单 | react-hook-form + zod |
| 主题 | next-themes |
| URL 状态 | nuqs |
| 类名合并 | clsx + tailwind-merge |
| 数据库 | Cloudflare D1 + Drizzle ORM |
| 邮件 | Resend |
| 测试 | Vitest + Testing Library + Playwright |
| 基础设施 | Cloudflare Workers（仅 D1 网关 + 邮件代理）、Wrangler |
| 部署 | Vercel（Next.js），单一环境 |

### 工程硬约束

- **Next.js + Vercel** 部署 Next.js 应用；Cloudflare 仅承担 D1 + Workers。
- **Cloudflare 环境唯一**：不区分 Preview / Production，本地 `.dev.vars` 与生产 Worker 共享同一套 token 协议。
- `.env.local`、`.dev.vars`、`.superpowers/` 一律不提交。
- 不向仓库提交任何真实密钥、Resend API key、session secret。
- 数据库迁移历史保留旧的业务表；代码层不再引用它们，**不要主动生成或应用 DROP TABLE**，除非用户明确要求清理数据。

## 文档与留痕

- 所有过程中的设计、规划、开发方案、报告、验收、测试结果等文档，放在项目 `.agents/docs/` 下以子目录 `YYMMDD/` 组织。
- `native/` 是用户最原始的输入，永远保留真实记录，**不允许 AI 主动编辑**。
- README 反映**用户视角**（做什么、怎么用），AGENTS.md 反映**实现视角**（为什么这么做、绝对边界是什么）。

## 终极验收口径

一个新加入的 SAYLESS 用户，应当能够：

1. 未登录直接打开 `/resumes`，基于模板编辑简历；刷新后在同一浏览器继续编辑，换设备则互不可见。
2. 登录后创建 / 克隆 / 切换多份简历，修改内容与展示配置，自动保存并在刷新后保持。
3. 对任意一份简历导出 PDF、复制 Markdown。
4. 开启公开分享，生成 `/resumes/share/<id>` 链接；未登录访客可查看该公开简历，但看不到任何私有数据。
5. 在 `/settings` 修改个人资料或退出登录。

## 提交约定

阶段性执行 Git commit skill 留痕；不要把 personal 信息与过程性质的文档、脚本提交进仓库。
