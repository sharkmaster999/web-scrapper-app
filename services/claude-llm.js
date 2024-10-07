const { Anthropic } = require('@anthropic-ai/sdk');
require('dotenv').config();

const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY
});

async function summarizeTextClaude(text) {
    try {
        const message = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 1000,
            temperature: 0,
            system: "Summarize the following text",
            messages: [{
                "role": "user",
                "content": [{
                    "type": "text",
                    "text": text
                }]
            }]
        });
        return message;
    } catch (error) {
        return null;
    }
}

module.exports = { summarizeTextClaude };
