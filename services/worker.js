
const { getPageText } = require('../services/scraper');
const { getAllPendingJobs, updateJob, addResult } = require('../models/job.model');
const { summarizeText } = require('../services/llm');

async function processPendingJobs() {
    try {
        const allPendingJobs = await getAllPendingJobs();

        for (const job of allPendingJobs) {
            const textContent = await getPageText(job.url);

            const convertedText = await summarizeText(textContent);
            if(!convertedText) {
                await updateJob(job.id, 'failed', 'Failed to scrape content from the URL');
                return;
            }
            
            await addResult(job.id, convertedText);
            await updateJob(job.id, 'completed');
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

module.exports = { processPendingJobs };
