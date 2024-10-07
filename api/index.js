const express = require('express');
const { getPageText } = require('../services/scraper');
const { summarizeText } = require('../services/llm');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/jobs', async(req, res) => {
    const { url } = req.body;
    try {
        const textContent = await getPageText(url);
        if (!textContent) throw new Error('Failed to fetch content from the URL');

        const summaryText = await summarizeText(textContent);

        res.json({summaryText});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
