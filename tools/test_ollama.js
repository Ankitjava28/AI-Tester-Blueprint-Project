const http = require('http');

console.log('🔄 Initiating Verification Handshake with Ollama (llama3.2)...');

const model = 'llama3.2:3b';
const prompt = 'Hello! Just reply with "Handshake Successful" if you can hear me.';

const postData = JSON.stringify({
    model: model,
    prompt: prompt,
    stream: false
});

const options = {
    hostname: 'localhost',
    port: 11434,
    path: '/api/generate',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    let data = '';

    console.log(`📡 Status Code: ${res.statusCode}`);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            if (res.statusCode === 200) {
                const responseCtx = JSON.parse(data);
                console.log('✅ Connection Verified!');
                console.log(`📝 Model Response: "${responseCtx.response.trim()}"`);
                console.log('⏱️  Duration:', responseCtx.total_duration / 1000000, 'ms');
            } else {
                console.error('❌ Error: Non-200 Response from Ollama', data);
            }
        } catch (e) {
            console.error('❌ JSON Parse Error:', e);
        }
    });
});

req.on('error', (e) => {
    console.error(`❌ Connection Failed: ${e.message}`);
    console.log('💡 Tip: Is Ollama running? Try running `ollama serve` in a terminal.');
});

// Write data to request body
req.write(postData);
req.end();
