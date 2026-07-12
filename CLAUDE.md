# 设计系统铁律（生成任何 UI 前必须遵守）

1. 颜色只能用 tokens.css 里的 --color-* 变量，禁止现编 hex。
2. 所有卡片 / 按钮 / 输入框：3px 黑边 + 6px 6px 0 #000 硬阴影 + 直角(0)。
3. 圆角只给圆形元素（头像 / 状态点 / 胶囊标签 = 999px），其余一律 0。
4. 标题字体 Bricolage Grotesque，正文 DM Sans，数据/标签 Space Mono。
5. 间距走 4pt 档（8/16/24/32...），不要写 13px、17px 这种随手数。

# 立即打回
- 写死 hex（不走 --color-*）/ 柔阴影 0 Npx Npx rgba() / 圆角胶囊按钮