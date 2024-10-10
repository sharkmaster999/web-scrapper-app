const axios = require('axios');
require('dotenv').config();
const { logger } = require('../services/logger');

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
        logger.error("Error in LLM: ", error);
        return null;
    }
}

module.exports = { summarizeText };
