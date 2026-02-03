const http = require('http');
const fs = require('fs');
const path = require('path');
const ollamaService = require('./services/ollamaService');

const PORT = 3001;

const server = http.createServer((req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle Preflight Options
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Serve Frontend (index.html)
    if (req.url === '/' && req.method === 'GET') {
        const filePath = path.join(__dirname, '../index.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error parsing frontend: ' + err.message);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
        return;
    }

    // Health Check
    if (req.url === '/api/health' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', architecture: 'ANT-3-Layer-Native' }));
        return;
    }

    // Chat Endpoint
    if (req.url === '/api/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const { message } = JSON.parse(body);
                if (!message) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Message is required' }));
                    return;
                }

                console.log(`📨 Received request: "${message.substring(0, 50)}..."`);

                // Stream Response
                res.writeHead(200, {
                    'Content-Type': 'text/plain',
                    'Transfer-Encoding': 'chunked'
                });

                ollamaService.generateStream(
                    message,
                    (token) => {
                        res.write(token);
                    },
                    () => {
                        console.log('✅ Stream completed');
                        res.end();
                    },
                    (error) => {
                        console.error('❌ Stream error:', error);
                        // Can't send 500 header if already sent 200, so just end.
                        res.end('\n[Error generating response]');
                    }
                );

            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        return;
    }

    // 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, Object.assign({}, process.env.CI ? {} : { host: '0.0.0.0' }), () => {
    console.log(`
🚀 A.N.T. Backend System Online (Native Mode)
---------------------------------------------
📡 Server running at http://localhost:${PORT}
🔗 Subsystem: Ollama (llama3.2:3b) via Layer 2 Service
⚠️  Running in Zero-Dependency Mode on Port ${PORT}
    `);
});
