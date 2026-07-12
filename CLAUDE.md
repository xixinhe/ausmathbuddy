# 设计系统铁律（生成任何 UI 前必须遵守）

> 系统代号 Marigold，规范详见 [[docs/design-references/marigold-design.md]]，token 值见 `tokens/marigold-tokens.css`。

1. 颜色只能用 tokens/marigold-tokens.css 里的 --mg-color-* 变量，禁止现编 hex。
2. 画布只用单一饱和黄色 --mg-color-canvas，不做中性灰背景模式；ink-brown（--mg-color-ink）同时作为文字色和深色卡片填充色，不要另开一个"近黑"色。
3. 卡片：纯色块，无边框、无阴影，圆角 28px（--mg-radius-lg）。小图标徽标用 18px 圆角（--mg-radius-badge）+ 浮动阴影（--mg-shadow-float）—— 这是全系统唯一允许出现阴影的地方。
4. 圆角：卡片 28px / 输入框等小元素 12px（--mg-radius-sm）/ 头像、徽标图标 999px（--mg-radius-full）。不允许直角（0）卡片。
5. 主 CTA 是带下划线的文字链接（accent-orange 或 ink 色），不用实心/描边按钮，不加阴影。
6. 标题字体 Fredoka（圆润、粗体，Hero 用全大写），正文 Inter；不使用等宽字体，不用大写字距标签（uppercase tracked mono label）。
7. 间距走 4pt 档：--mg-space-xs 4 / sm 8 / md 12 / lg 16 / xl 24 / 2xl 32 / 3xl 48 / 4xl 64，不要写 13px、17px 这种随手数。
8. 数字（如统计数据）用 Fredoka 粗体 + accent-orange，而不是正文字体。

# 立即打回
- 写死 hex（不走 --mg-color-*）
- 卡片加黑边或硬阴影（3px 黑边 / 6px 6px 0 #000 是旧系统，已废弃）
- 按钮做成实心背景 + 边框（应为下划线文字链接）
- 大写等宽追踪标签（uppercase tracked mono labels）
- 直角（0 圆角）卡片

# git
不要把claude相关信息写进git message

# 编程规范
写代码前先看 [[rules/README.md]]，按领域找对应规则：通用编码原则见 `rules/code-quality/`（kiss / solid / dry / almo / readability-checklist / core-15-rules），流程协作规则见 `rules/workflow/`（enforcement / adlc / prd-split / changelog），前端专属规则见 `rules/frontend/`，后端专属规则见 `rules/backend/`。
