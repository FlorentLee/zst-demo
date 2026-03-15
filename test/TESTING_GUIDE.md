# 智税通测试与联调 SOP (Standard Operating Procedure)

## 1. 后端服务测试 (FastAPI)

### 1.1 环境变量与依赖准备
由于已经切换为火山方舟，需要在 `backend/` 目录下准备 `.env` 文件。
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo "ARK_API_KEY=3b04f621-f363-43c9-b425-665b37a6e93f" > .env
```

### 1.2 启动服务与验证
```bash
uvicorn app.main:app --reload
```
**检查点 1**: 启动日志中应观察到 `Successfully loaded X knowledge chunks into ChromaDB.` 字样，代表 RAG 初始化成功。
**检查点 2**: 浏览器打开 `http://127.0.0.1:8000/docs`。您可以通过 Swagger UI 界面直接构造 `GET /api/ledger` 请求看空状态，或者上传一张测试票据照片到 `/api/invoice/analyze`。

---

## 2. 前端服务运行测试 (Next.js)

### 2.1 依赖安装与服务联调
前端项目现在独立于 `frontend/` 目录中。
```bash
cd frontend
npm install
# 服务默认运行在 3000 端口，并自动打向后端的 :8000 端口
npm run dev
```

### 2.2 核心 E2E 测试验收流

1. **OCR与智能风控链路测试:**
   - 打开 `http://localhost:3000/dashboard`。
   - 寻找 `InvoiceUploader` 组件框，拖拽或点击上传本地的 `智税通demo/发票案例.jpg` （或任意真实餐饮/交通发票照片）。
   - **验证结果**: 观察控制台网络请求：响应需携带 `compliance_score`、`invoice_number`，并且如发票种类匹配上了政策提示，页面下方弹出的卡片应包含具体的 "政策提醒: (财税...)" 的描述。

2. **数据库落账轮询联动测试:**
   - 在上述动作（上传完一张发票分析结束）后，立刻滚轮向下查看 **最近审计详情** 面板。
   - **验证结果**: 这个原本写死 `INV-001...` 数据表格应该已经刷新并渲染了刚才那一笔交易，数据编号通常是真实号码，或者是 `SYS-X` 的 SQLite 落库回显主键。

3. **管理层 AI 智能报告生成测试:**
   - 点击左侧 Sidebar 的 **AI 报告** 图标。
   - **验证结果**: 进入单独页面后点击 "生成简报" 按钮。页面应当调用 FastAPI，利用豆包纯文本模型输出一份结合了 `CEO财务总监口吻` 和目前数据库累加存款金额信息的真实长文本段落报告。
