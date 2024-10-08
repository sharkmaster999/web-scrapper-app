const { openConnection, closeConnection, sequelize } = require('./connector');
const { Sequelize, DataTypes } = require('sequelize');
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

const Results = sequelize.define("results", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    summary: {
        type: DataTypes.TEXT,
        defaultValue: ''
    }
});

Results.belongsTo(Jobs, { foreignKey: 'job_id' });

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

        return lastInsertedJob ? lastInsertedJob.toJSON() : null;
    } catch (error) {
        console.error('Error creating job:', error);
    }
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

        return updatedJob ? updatedJob.toJSON() : null;
    } catch (error) {
        console.error('Error updating job:', error);
    }
}

async function getAllJobs() {
    let allJobs = [];
    try {
        await openConnection();

        await sequelize.sync();

        const jobs = await Jobs.findAll({
            where: {
                status: {
                    [Sequelize.Op.ne]: 'pending'
                }
            }
        });

        for (const job of jobs) {
            const jobInfo = {
                id: job.id,
                url: job.url,
                status: job.status,
                message: job.status === 'failed' ? job.error_message : ""
            }

            allJobs.push(jobInfo);
        }

        return allJobs;
    } catch (error) {
        console.error('Error getting all job:', error);
    }
}

async function getAllPendingJobs() {
    try {
        await openConnection();

        await sequelize.sync();

        const jobs = await Jobs.findAll({
            where: {
                status: 'pending'
            }
        });

        return jobs;
    } catch (error) {
        console.error('Error getting all job:', error);
    }
}

async function addResult(job_id, summary) {
    let lastInsertedResult = null;

    try {
        await openConnection();

        await sequelize.sync();

        await Results.create({
            summary: summary,
            job_id: job_id
        });

        lastInsertedResult = await Results.findOne({
            order: [['createdAt', 'DESC']],
        });

        return lastInsertedResult ? lastInsertedResult.toJSON() : null;
    } catch (error) {
        console.error('Error creating result:', error);
    }
}

module.exports = { createJob, updateJob, getAllJobs, getAllPendingJobs, addResult };
