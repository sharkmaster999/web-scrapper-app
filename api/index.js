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
        if (!textContent) return res.status(500).json({id: 1, url: url, status: "failed", error_text: "Failed to scrape content from the URL"});

        const summaryText = await summarizeText(textContent);
        if (!summaryText) return res.status(500).json({id: 1, url: url, status: "failed", error_text: "Failed to scrape content from the URL"});

        return res.json({id: 1, url: url, status: "completed", summary: summaryText});
    } catch (error) {
        return res.status(500).json({id: 1, url: url, status: "failed", error_text: "Failed to scrape content from the URL"});
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
