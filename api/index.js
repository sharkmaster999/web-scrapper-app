const express = require('express');
const app = express();

const { createJob, getAllJobs } = require('../models/job.model');
const { processPendingJobs } = require('../services/worker');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/jobs', async(req, res) => {
    const { url } = req.body;
    try {
        const newJob = await createJob(url);
        return res.json({
            id: newJob.id,
            url: newJob.url,
            status: newJob.status
        });
    } catch (error) {
        console.error("Error information: ", error);
        return res.status(500).json({ error_text: "Internal server error" });
    }
});

app.get('/jobs', async(req, res) => {
    try {
        const allJobs = await getAllJobs();
        res.json(allJobs);
    } catch (error) {
        console.error("Error information: ", error);
        return res.status(500).json({ error_text: "Internal server error" });
    }
});

setInterval(() => {
    console.log('Checking for pending jobs...');
    processPendingJobs();
}, 60000);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
