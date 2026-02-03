const express = require('express');
const router = express.Router();
const ollamaService = require('../services/ollamaService');

// POST /api/chat
router.post('/chat', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // Set headers for SSE (Server-Sent Events) or simple chunked streaming
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    console.log(`📨 Received request: "${message.substring(0, 50)}..."`);

    ollamaService.generateStream(
        message,
        (token) => {
            // Write chunks directly to the response
            res.write(token);
        },
        () => {
            console.log('✅ Stream completed');
            res.end();
        },
        (error) => {
            console.error('❌ Stream error:', error);
            res.status(500).end('Error generating response');
        }
    );
});

module.exports = router;
