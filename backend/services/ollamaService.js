const http = require('http');

class OllamaService {
    constructor() {
        this.model = 'llama3.2:3b';
        this.host = 'localhost';
        this.port = 11434;

        // Define the Master Template
        this.TEMPLATE = `
You remain a QA Automation Expert.
Generate detailed test cases for the following requirement:
{{USER_INPUT}}

Format the output as:
1. **Title**: [Test Case Name]
2. **Pre-conditions**: ...
3. **Steps**:
   - Step 1
   - Step 2
4. **Expected Result**: ...

Return ONLY the test cases in Markdown format.
`;
    }

    /**
     * Generates a prompt by injecting user input into the template
     */
    buildPrompt(userInput) {
        return this.TEMPLATE.replace('{{USER_INPUT}}', userInput);
    }

    /**
     * Sends a request to Ollama and streams the response
     */
    generateStream(userInput, onData, onEnd, onError) {
        const prompt = this.buildPrompt(userInput);

        const postData = JSON.stringify({
            model: this.model,
            prompt: prompt,
            stream: true // Enable streaming
        });

        const options = {
            hostname: this.host,
            port: this.port,
            path: '/api/generate',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = http.request(options, (res) => {
            res.on('data', (chunk) => {
                try {
                    const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
                    for (const line of lines) {
                        const json = JSON.parse(line);
                        if (json.response) {
                            onData(json.response);
                        }
                        if (json.done) {
                            onEnd();
                        }
                    }
                } catch (e) {
                    // Start of a chunk might be partial JSON in some rare cases, 
                    // but Ollama usually sends complete JSON lines.
                    // For production, we'd need a buffer provided by a stream parser.
                    // Simple error logging for now.
                    console.error('JSON Parse error on stream chunk', e);
                }
            });
        });

        req.on('error', (e) => {
            onError(e);
        });

        req.write(postData);
        req.end();
    }
}

module.exports = new OllamaService();
