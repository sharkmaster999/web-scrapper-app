const { openConnection, closeConnection, sequelize } = require('./connector');
const { DataTypes } = require('sequelize');
require('dotenv').config();

const Jobs = sequelize.define("jobs", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ['pending', 'completed', 'failed'],
        allowNull: false,
        defaultValue: 'pending'
    },
    error_message: {
        type: DataTypes.TEXT,
        defaultValue: ''
    }
});

async function createJob(url) {
    await openConnection();

    await sequelize.sync();

    await Jobs.create({
        url: url
    });

    const lastInsertedJob = await Job.findOne({
        order: [['createdAt', 'DESC']],
    });

    await closeConnection();
    
    return lastInsertedJob.toJSON();
}

module.exports = { createJob };
