# 🔍 Findings & Constraints

## 🧠 Research Results
- **Target Model**: `llama3.2` (Open Source).
- **Integration**: Direct Ollama API call.
- **UI Pattern**: Chat Interface.

## ⚠️ Constraints
- **Local Only**: No external internet calls for generation.
- **Model Requirement**: User must have `llama3.2` pulled locally.
- **Template Storage**: The prompt template must be hardcoded/configurable within the codebase, not passed dynamically by the user every time.

## 📝 Discovery Answers (Confirmed)
1. **North Star**: Local LLM Testcase generator with properly stored template.
2. **Integrations**: Ollama (Local).
3.  **Source of Truth**: User Input in Chat.
4. **Delivery Payload**: UI Chat (Visual display of generated cases).
5. **Behavioral Rules**: Input -> Local LLM (Ollama) -> Output.
