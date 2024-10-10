const axios = require('axios');
const cheerio = require('cheerio');
const { logger } = require('../services/logger');

async function getPageText(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        return $('body').text(); 
    } catch (error) {
        logger.error('Error fetching webpage:', error);
        return null;
    }
}

module.exports = { getPageText };
