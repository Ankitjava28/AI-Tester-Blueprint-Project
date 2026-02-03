# 📜 Gemini - Project Constitution

## Local LLM Testcase Generator

---

## 🗂️ Data Schemas

### 1. User Input Payload
```json
{
  "message": "Login page with email validation"
}
```

### 2. Ollama Request Payload
```json
{
  "model": "llama3.2:3b",
  "prompt": "<TEMPLATE> + <USER_INPUT>",
  "stream": true
}
```

---

## 🛠 Maintenance Log (Phase 5)

| Date | Event | Type | Details |
|------|-------|------|---------|
| 2026-02-03 | Phase 1 Blueprint | Process | Defined goals, schemas, and halted for approval. |
| 2026-02-03 | Phase 2 Link | Connectivity | Verified Ollama connection and model `llama3.2:3b`. |
| 2026-02-03 | Phase 3 Architect | Build | Built Zero-Dependency Node.js Backend (Port 3001) due to npm issues. |
| 2026-02-03 | Phase 4 Stylize | UI/UX | Created Single-File HTML Frontend with Dark Mode & Copy Feature. |
| 2026-02-03 | Phase 5 Trigger | Deployment | Final verified deploy on Localhost:3001. |

---

## 🏛️ System Architecture (Final)
- **Frontend**: Standard HTML/JS (No Build Step).
- **Backend**: Node.js Native HTTPServer (No Express/BodyParser).
- **AI Engine**: Ollama (Running locally).

## ✅ Handover Notes
- To start the app: `node backend/server.js`
- To access UI: `http://localhost:3001`
- To update logic: Edit `backend/services/ollamaService.js` template.
