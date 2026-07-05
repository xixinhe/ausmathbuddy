# Rules

按领域分开维护，避免互相污染：

- `code-quality/` — 通用编码原则，与前端/后端无关：[[code-quality/kiss]]、[[code-quality/solid]]、[[code-quality/dry]]、[[code-quality/almo]]、[[code-quality/readability-checklist]]、[[code-quality/core-15-rules]]
- `workflow/` — 流程/协作类规则，如规则违反后的处理方式、文档状态流转、PRD 拆分、Changelog 记录：[[workflow/enforcement]]、[[workflow/adlc]]、[[workflow/prd-split]]、[[workflow/changelog]]
- `frontend/` — 前端专属规则（UI、样式、可访问性等），目前待补充
- `backend/` — 后端专属规则（API、数据库、鉴权等），目前待补充

## 原则

- 新规则先判断属于哪个领域，放进对应文件夹，不要混着写。
- 通用原则（不分前后端都适用）放 `code-quality/`；只在特定层才成立的规则放 `frontend/` 或 `backend/`。
- 单个规则文件不超过 300 行，超过就拆分。
