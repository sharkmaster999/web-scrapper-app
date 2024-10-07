const OpenAI = require('openai');
require('dotenv').config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function summarizeText(text) {
    try {
        const response = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Summarize the following text.' },
                { role: 'user', content: text }
            ],
            max_tokens: 15
        });
        return response;
    } catch (error) {
        console.error('Error with LLM API:', error);
        throw new Error('Failed to generate summary');
    }
}

module.exports = { summarizeText };
