const OpenAI = require('openai');
require('dotenv').config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function summarizeText(text) {
    try {
        const responseText = "";
        const response = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Summarize the following text.' },
                { role: 'user', content: text }
            ],
            stream: true,
            max_tokens: 15
        });

        for await (const chunk of response) {
            responseText += chunk.choices[0]?.delta?.content || "";
        }
        return responseText;
    } catch (error) {
        return null;
    }
}

module.exports = { summarizeText };
