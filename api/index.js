const express = require('express');
const { getPageText } = require('../services/scraper');
// const { summarizeText } = require('../services/llm');
const { createJob, updateJob, getAllJobs } = require('../models/job.model');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/jobs', async(req, res) => {
    const { url } = req.body;
    try {
        const newJob = await createJob(url);
        // const textContent = await getPageText(url);
        // if (!textContent) {
        //     await updateJob(id, "failed", "Failed to scrape content from the URL");
        //     return res.status(500).json({id: newJob.id, url: newJob.url, status: "failed", error_text: "Failed to scrape content from the URL"});
        // }

        // TODO: Summarize text from scraped contents

        // const summaryText = await summarizeText(textContent);
        // if (!summaryText) {
        //     await updateJob(id, "failed", "Failed to scrape content from the URL");
        //     return res.status(500).json({id: 1, url: url, status: "failed", error_text: newJob});
        // }

        return res.json({
            id: newJob.id,
            url: newJob.url,
            status: newJob.status
        });
    } catch (error) {
        return res.status(500).json({id: 1, url: url, status: "failed", error_text: error});
    }
});

app.get('/jobs', async(req, res) => {
    try {
        const allJobs = await getAllJobs();
        res.json(allJobs);
    } catch (error) {
        return res.status(500).json({ error_text: error });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
