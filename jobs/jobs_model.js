const db = require('../dbconfig')

// GET all jobs
const getJobs = () => {
    return db('job_resolutions')
}

// GET single job by id
const getJobById = id => {
    return db('job_resolutions').where({ id }).first()
}

// GET jobs by source param
const getJobBySource = source => {
    return db('job_resolutions').where('job_source', 'like', source)
}

// ADD job, id is not auto generated and is required
const addJob = async(job) => {
    const [job_id] = await db('job_resolutions').insert(job)

    return getJobById(job_id)
}

// DELETE ALL JOBS => Should only be used inside '../jobs/jobs_resolver' to clean data before running code again
const deleteAllJobs = async() => {
    await db('job_resolutions').del()

    return
}

module.exports = { addJob, getJobs, getJobById, getJobBySource, deleteAllJobs }
