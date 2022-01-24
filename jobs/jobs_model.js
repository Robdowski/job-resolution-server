const db = require('../dbconfig')

const addJob = async(job) => {
    const [job_id] = await db('job_resolutions').insert(job)

    return getJobById(job_id)
}

const getJobById = id => {
    return db('job_resolutions').where({ id }).first()
}

// Should only be used inside '../jobs/jobs_resolver' to clean data before running code again
const deleteAllJobs = async() => {
    await db('job_resolutions').del()

    return
}

module.exports = { addJob, getJobById, deleteAllJobs }
