const express = require('express');
const { getPageText } = require('../services/scraper');
// const { summarizeText } = require('../services/llm');
const { createJob, updateJob } = require('../models/job.model');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/jobs', async(req, res) => {
    const { url } = req.body;
    try {
        const newJob = await createJob(url);
        const textContent = await getPageText(url);
        if (!textContent) {
            await updateJob(id, "failed", "Failed to scrape content from the URL");
            return res.status(500).json({id: newJob.id, url: newJob.url, status: "failed", error_text: "Failed to scrape content from the URL"});
        }

        // TODO: Summarize text from scraped contents

        // const summaryText = await summarizeText(textContent);
        // if (!summaryText) {
        //     await updateJob(id, "failed", "Failed to scrape content from the URL");
        //     return res.status(500).json({id: 1, url: url, status: "failed", error_text: newJob});
        // }

        await updateJob(newJob.id, "completed");
        return res.json({id: 1, url: url, status: "completed", summary: textContent});
    } catch (error) {
        return res.status(500).json({id: 1, url: url, status: "failed", error_text: error});
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
