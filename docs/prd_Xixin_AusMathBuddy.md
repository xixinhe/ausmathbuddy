# PRD: AusMathBuddy（澳洲小学数学教学网站 - Year 3-4 乘除法试点）

> **Status**: Draft
> 状态流转规则见 [[../rules/workflow/adlc]]（Draft → Review → Approved → Active → Deprecated）

## 1. 目标 & 范围
- 用户: 澳洲小学 Year 3-4 学生（8-10岁），及辅导孩子的家长
- 场景: 课后自学或家长陪伴学习，针对乘法/除法（Multiplication & Division）这一常见难点，希望有讲解+练习+测验的完整学习路径
- 真痛: 乘除法是从加减法过渡后的第一个数学难点，学校课堂讲解节奏统一，学生个体差异大，缺少可以反复讲解+即时练习+阶段检测的工具
- 成功标准:
  - 学生能独立走完 讲解 → 练习 → 测验 一条完整链路且不卡壳
  - 测验正确率作为掌握度的直接反馈（无需服务器，先用前端算分）
  - 内容对齐 Australian Curriculum v9 Year 3-4 Number 相关 Content Descriptor
- Must-have:
  - 乘除法分成 3-4 个小节（如：乘法概念/乘法表/除法概念/乘除关系），每节讲解+练习
  - 每个小节练习题（即时反馈对/错）
  - 走完全部小节后的一次阶段测验（多题打分+结果展示）
  - 内容需可核对来源（标注对应 Australian Curriculum Content Descriptor 编码）
- Nice-to-have（本阶段不做，留作后续）:
  - 账号系统、学习进度持久化、多年级/多单元扩展
  - 错题本、自适应难度、家长后台
  - 多语言（中英双语）

## 2. 用户故事
- 作为 Year 3-4 学生，我希望打开首页就能看到所有小节和自己的完成进度，这样我知道下一步该学什么
- 作为学生，我希望每个知识点有讲解+例题，这样我在做练习前先理解"为什么"而不是死记硬背
- 作为学生，我希望练习时提交答案立刻知道对错，这样我能马上发现自己哪里没学会
- 作为学生，我希望练习题不会太难或太怪（题型和难度接近 Khan Academy / 学而思等我熟悉的风格），这样我不会因为题目本身的陌生感而分心
- 作为学生，我希望学完所有小节后有一次综合测验，这样我能检验自己是不是真的掌握了乘除法
- 作为学生，我希望测验结束后能看到分数和具体错在哪几题，这样我知道该回去重练哪个小节
- 作为家长，我希望能陪孩子一起打开网站，界面文字够大、够简单，不需要我讲解操作方法
- 作为家长，我希望知道内容是对应 Australian Curriculum 的哪个知识点（编码可查），这样我能确认孩子学的是学校要求的内容
- 作为家长，我希望换设备/换浏览器不会导致进度看起来"消失"太意外（本阶段用 localStorage，需在页面上提示这一点），避免误以为数据丢失是 bug

## 3. 页面 & 流程
- Pages（本轮试点全部为静态页面，无需登录）:
  - `index.html` — 首页/单元入口，展示 Year 3-4 乘除法单元的小节列表和进度（本地记录，无后端）
  - `lesson.html?section=xxx` — 讲解页（图文/示例讲解某个小节知识点）
  - `practice.html?section=xxx` — 练习页（该小节配套的 5-8 道练习题，即时对错反馈）
  - `quiz.html` — 阶段测验页（覆盖全部小节，10-15 题，提交后计算总分和每题正误）
  - `result.html` — 测验结果页（展示分数、错题回顾、"回去重新练习"入口）
- Components（复用）:
  - QuestionCard（题干+选项/输入框+提交按钮+反馈状态）
  - ProgressBar（小节完成度/测验进度）
  - SectionNav（讲解小节之间的上一步/下一步导航）
- 核心 Flow:
  首页选小节 → 看讲解(lesson) → 做练习(practice，即时反馈) → 完成全部小节 → 进入阶段测验(quiz) → 查看结果(result) → 错误多的小节可返回重新练习

### 3.1 页面功能详情
- `index.html`（首页）
  - 展示 3-4 个小节卡片，每张卡片含：标题、一句话简介、完成状态（未开始/讲解中/练习完成，用 ProgressBar 或图标表示）
  - 点击小节卡片进入该小节 `lesson.html`；若该小节已完成讲解+练习，卡片显示"已完成"并可重新进入
  - 顶部/底部展示总体进度（已完成小节数 / 总小节数）
  - 全部小节完成后，"开始测验"按钮从禁用变为可点击，并有醒目提示引导进入 `quiz.html`
  - 首次访问（localStorage 无记录）默认所有小节为"未开始"状态
- `lesson.html?section=xxx`
  - 展示该小节标题、对应 Curriculum 编码（如 AC9M3N05，供家长核对）、讲解文案、至少 1 个示例讲解（图文或分步演算）
  - 底部 SectionNav 提供"上一节/下一节"和"去练习"入口
  - 讲解内容读完（滚动到底或点击"我学会了"）后标记该小节讲解阶段为完成，写入 localStorage
- `practice.html?section=xxx`
  - 展示该小节 5-8 道练习题，逐题作答（QuestionCard），支持选择题和填空题两种题型
  - 每题提交后立即反馈对/错；答错时给出提示（hint 字段）或展示正确答案，不锁死重试次数
  - 全部题目作答完成后显示本小节练习正确率，并将该小节标记为"练习完成"，回到首页时状态同步更新
  - 提供"返回讲解重看"入口，供答错较多的学生复习
- `quiz.html`
  - 全部小节完成后方可进入（否则提示"请先完成全部小节练习"并引导返回首页）
  - 展示 10-15 道综合题，覆盖所有小节，题目乱序或按小节分组均可，用 ProgressBar 展示测验完成度
  - 支持中途查看已答题数/剩余题数，最后统一提交（不做单题即时对错反馈，测验完才反馈）
  - 提交前对未作答题目给出提醒，避免误交白卷
- `result.html`
  - 展示总分（正确题数/总题数、百分比）、按小节维度的正误统计（哪个小节错得最多）
  - 列出所有错题的题干、学生作答、正确答案，供回顾
  - 提供"回去重新练习（跳转到错误最多的小节）"和"返回首页"两个入口
  - 结果不上传服务器，仅当次展示 + 可选存入 localStorage 供下次查看历史最近一次成绩

## 4. 数据 & 输入
- SoT/资料: Australian Curriculum v9 — Mathematics, Year 3 & Year 4, Number strand（乘除法相关 Content Descriptor，需在内容文件中逐条标注引用编码，如 AC9M3N05）
- 题目设计参考: 讲解文案、例题、练习题、测验题的难度梯度和题型设计，参考 Khan Academy（美国，Grade 3-4 Multiplication & Division 相关课程）及国内同类数学教育产品（如人教版数学教材、学而思网校、猿辅导等 Year 3-4 对应学段的乘除法内容），确保题型丰富度（选择/填空/应用题/图形辅助题）和难度递进符合国际主流教学实践，而非闭门造题
- 数据字段（内容用 JSON/Markdown 静态文件维护，暂不建数据库）:
  - 讲解内容: section_id, title, curriculum_code, explanation_text, example(s), image/diagram(可选)
  - 练习题: section_id, question_id, type(选择/填空), question_text, options(如有), correct_answer, hint(可选)
  - 测验题: quiz_id, question_id, source_section, question_text, options, correct_answer
- 限制:
  - 无登录，无隐私数据收集；学习进度/测验成绩仅保存在浏览器 localStorage
  - 面向 8-10 岁儿童，界面文案需简洁、字号大、颜色友好，避免复杂交互
  - 本阶段不做后端和数据库，预算/时间上以最快跑通 MVP 为目标

## 5. 模块拆解
- UI: 5 个静态页面 + 3 个复用组件（QuestionCard / ProgressBar / SectionNav），响应式布局兼容平板/手机
- Logic:
  - 练习题即时判分（前端 JS 比对 correct_answer）
  - 测验总分计算 + 错题收集逻辑
  - 学习进度用 localStorage 记录已完成的小节，首页据此渲染进度
- Data: 内容全部为本地 JSON 文件（`/data/sections.json`, `/data/practice.json`, `/data/quiz.json`），无接口/无数据库
- Deploy: 纯静态站点，部署到 GitHub Pages 或 Vercel，手机浏览器可直接访问

## 6. 红线 / 验收
- 不做: 账号登录、服务器端存储、多年级/多单元内容、自适应难度、家长/教师后台 — 全部留到试点验证后再规划
- 验收: 打开 `index.html` -> 依次点击 4 个小节完成"讲解+练习" -> 点击"开始测验" -> 完成 quiz.html 并提交 -> 在 result.html 看到分数和错题列表

## 7. Action / Todo List
- [ ] Content: 整理 Year 3-4 乘除法 3-4 个小节内容，标注 Australian Curriculum 编码；参考 Khan Academy 及国内同类产品（学而思网校/猿辅导/人教版教材等）的题型和难度梯度，AI 辅助生成讲解文案+练习题+测验题初稿并人工核对
- [ ] Build: 先跑通 MVP 主流程（首页 → 讲解 → 练习 → 测验 → 结果）
- [ ] Test: 对着第 6 块「验收」逐条打勾
- [ ] Deploy: 部署到 GitHub Pages/Vercel，手机打开确认
- [ ] Feedback: 找 2-3 名 Year 3-4 学生/家长试用，记 3 条真实反馈，写回 CLAUDE.md
