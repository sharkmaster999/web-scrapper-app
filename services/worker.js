
const { getPageText } = require('../services/scraper');
const { getAllPendingJobs, updateJob, addResult } = require('../models/job.model');

async function processPendingJobs() {
    try {
        const allPendingJobs = await getAllPendingJobs();

        for (const job of allPendingJobs) {
            const textContent = await getPageText(job.url);

            // TODO: Summarize text from scraped contents
            // const summaryText = await summarizeText(textContent);

            await addResult(job.id, textContent);
            await updateJob(job.id, 'completed');
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

module.exports = { processPendingJobs };
