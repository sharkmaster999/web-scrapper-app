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
    let lastInsertedJob = null;

    try {
        await openConnection();

        await sequelize.sync();

        await Jobs.create({
            url: url
        });

        lastInsertedJob = await Jobs.findOne({
            order: [['createdAt', 'DESC']],
        });
    } catch (error) {
        console.error('Error creating job:', error);
    } finally {
        await closeConnection();
    }

    return lastInsertedJob ? lastInsertedJob.toJSON() : null;
}

async function updateJob(id, status, error = '') {
    let updatedJob = null;

    try {
        await openConnection();

        await sequelize.sync();

        await Jobs.update(
            { status: status, error_message: error },
            { where: { id: id } }
        );

        updatedJob = await Jobs.findOne({
            where: { id: id },
        });
    } catch (error) {
        console.error('Error updating job:', error);
    } finally {
        await closeConnection();
    }

    return updatedJob ? updatedJob.toJSON() : null;
}

module.exports = { createJob, updateJob };
