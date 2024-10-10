const axios = require('axios');
require('dotenv').config();

async function summarizeText(text) {
    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            { inputs: text },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response;
    } catch (error) {
        return null;
    }
}

module.exports = { summarizeText };
