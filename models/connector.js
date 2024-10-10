const { Sequelize } = require('sequelize');
require('dotenv').config();
const { logger } = require('../services/logger');

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

async function openConnection() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (error) {
        logger.error('Unable to connect to database: ', error);
    }
}

async function closeConnection() {
    try {
        await sequelize.close();
    } catch (error) {
        logger.error('Internal server error: ', error);
    }
}

module.exports = {
    openConnection,
    closeConnection,
    sequelize
};
