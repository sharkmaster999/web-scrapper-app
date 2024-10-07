const axios = require('axios');
const cheerio = require('cheerio');

async function getPageText(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        return $('body').text(); 
    } catch (error) {
        console.error('Error fetching webpage:', error);
        return null;
    }
}

module.exports = { getPageText };
