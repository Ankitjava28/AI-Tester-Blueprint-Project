# 🧪 Local LLM Test Case Generator

> A privacy-focused, zero-dependency AI assistant that generates professional test cases using your local machine.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Architecture](https://img.shields.io/badge/architecture-A.N.T.-purple.svg)

---

## 🏗️ Architecture

This project follows the **A.N.T. (API, Negotiation, Terminal)** 3-Layer Architecture.

```mermaid
graph TD
    User[👤 User] -->|1. Enters Requirement| UI[🖥️ Frontend Terminal (HTML/JS)]
    UI -->|2. POST /api/chat| API[⚙️ Backend API Layer (Node.js Native)]
    
    subgraph "Layer 2: Negotiation"
        API -->|3. formatPrompt()| Template[📝 Prompt Engine]
        Template -->|4. Stream Request| OllamaService[🤖 Ollama Service]
    end
    
    subgraph "Layer 3: Tools & Inference"
        OllamaService -->|5. HTTP Requests| LocalLLM[🦙 Ollama (llama3.2:3b)]
    end
    
    LocalLLM -->|6. Streaming Tokens| OllamaService
    OllamaService -->|7. Chunked Response| UI
```

---

## 🌟 Key Features

- **🔒 100% Local**: No data leaves your machine. Powered by Ollama.
- **⚡ Zero Dependencies**: Backend runs on native Node.js (no `npm install` hell for the server).
- **🎨 Premium UI**: Dark mode, glassmorphism, and markdown rendering.
- **📋 Copy-Ready**: One-click copy for generated test tables/scripts.
- **🧠 Deterministic Logic**: Uses specific SOPs (Standard Operating Procedures) for consistent outputs.

---

## 🛠️ Prerequisites

1.  **Node.js** (v18 or higher)
2.  **Ollama**: [Download and Install](https://ollama.com/)
3.  **Model**: Pull the required model:
    ```bash
    ollama pull llama3.2:3b
    ```

---

## 🚀 How to Run

1.  **Start Ollama** (if not running):
    ```bash
    ollama serve
    ```

2.  **Start the Backend**:
    ```bash
    node backend/server.js
    ```
    *You should see:* `🚀 A.N.T. Backend System Online...`

3.  **Open the App**:
    Go to **[http://localhost:3001](http://localhost:3001)** in your browser.

---

## 📂 Project Structure

```
├── architecture/         # Layer 1: SOPs and Design Docs
│   └── sop_llm_interaction.md
├── backend/              # Layer 2: API & Logic
│   ├── server.js         # Native HTTP Server
│   └── services/
│       └── ollamaService.js # Template Engine
├── index.html            # Layer 3: Frontend (Single File)
├── tools/                # Utility Scripts
│   └── test_ollama.js    # Connection Verification
├── BLAST.md              # Project Blueprint & Protocol
└── gemini.md             # Project Constitution & Schemas
```

---

## 🤖 Prompt Template

The core intelligence uses a structured template to ensure quality:
> "You remain a QA Automation Expert. Generate detailed test cases for the following requirement..."

---

## 📄 License

This project is licensed under the MIT License.
