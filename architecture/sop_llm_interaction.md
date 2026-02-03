# SOP: LLM Interaction Flow

## 🎯 Goal
Standardize how the application negotiates with the Local LLM (Ollama) to ensure consistent, detereministic outputs for test case generation.

## 📥 Inputs
- **User Prompt**: The raw requirement text (e.g., "Login with 2FA").
- **Template Context**: The "Master Test Case Template" defined in `ollamaService.js`.

## 🛠 Tool Logic (Layer 3)
1. **Sanitization**: Strip unsafe characters from user input.
2. **Injection**: Replace `{{USER_INPUT}}` in template.
3. **Transmission**: Send JSON payload to `http://localhost:11434/api/generate`.
4. **Streaming**: Parse NDJSON chunks from Ollama.
5. **Formatting**: Markdown is expected; render accordingly.

## ⚠️ Edge Cases
- **Ollama Offline**: If fetch fails, return specific "Check Ollama" error.
- **Model Missing**: If 404/Model Not Found, advise `ollama pull llama3.2`.
- **Empty Response**: If stream ends with no tokens, trigger retry (max 1).
