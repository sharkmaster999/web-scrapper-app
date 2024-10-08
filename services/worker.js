
const { getPageText } = require('../services/scraper');
const { summarizeText } = require('../services/llm');
const { getAllPendingJobs, updateJob, addResult } = require('../models/job.model');

async function processPendingJobs() {
    try {
        const allPendingJobs = await getAllPendingJobs();

        for (const job of allPendingJobs) {
            const textContent = await getPageText(job.url);
            if(!textContent) {
                await updateJob(job.id, 'failed', 'Failed to scrape content from the URL');
                return;
            }

            const convertedText = await summarizeText(textContent);
            if(!convertedText) {
                await updateJob(job.id, 'failed', 'Failed to scrape content from the URL');
                return;
            }

            await addResult(job.id, convertedText);
            await updateJob(job.id, 'completed');
        }
    } catch (error) {
        console.error("Error information: ", error);
    }
}

module.exports = { processPendingJobs };
