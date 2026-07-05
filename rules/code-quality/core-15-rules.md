# 核心 15 条编码规则

写代码时严格遵守以下 15 条。部分与 [[solid]]、[[kiss]]、[[dry]]、[[readability-checklist]] 有重叠，重叠处互相引用，不重复展开。

1. **Single Responsibility** — 一个函数/模块只做一件事，改一个原因只影响一处。（同 [[solid]] S）
2. **Clear Naming** — 变量/函数名说人话，不用 `a` / `tmp` / `data2` 这种糊弄名字。
3. **No Hard-Coded Secrets** — API Key / 密码 / token 一律进 `.env`，不进代码或 git。
4. **Comments First** — 复杂逻辑先写一句"为什么"，不是写完代码再补注释。
5. **Test-Driven** — 关键逻辑先写测试用例，或至少写完立刻补测试。
6. **Explicit Error Handling** — 报错要显式抛出/处理，禁止空 catch 静默吞掉。
7. **Validate at Boundaries** — 只在系统边界（用户输入/外部 API）验证，内部代码互相信任，别层层判空。
8. **Secure by Default** — 默认最小权限/最严设置，要放开权限必须显式声明。
9. **No Placeholder / Fake Data** — 禁止交付 TODO / Lorem ipsum / 编造的假数字，没有真数据就说明白。
10. **Performance Boundaries** — 明确写死不可接受的性能底线（如接口 > 2s 算不合格）。
11. **Minimal Dependencies** — 能用标准库解决就不装新包，装之前先问"真的需要吗"。
12. **YAGNI** — You Aren't Gonna Need It：不为"未来可能用到"写代码，只写现在要用的。（呼应 [[kiss]]）
13. **Code for the Reader** — 代码首先是给人看的，顺便给机器执行；可读性优先于炫技。（同 [[readability-checklist]]）
14. **Explicit Types on Exports** — 每个导出的函数/变量都要写明类型，不依赖隐式推断。
15. **"No any" Unless Whitelisted** — 禁用 `any`，除非在白名单里明确批准（如无类型的第三方库）。
