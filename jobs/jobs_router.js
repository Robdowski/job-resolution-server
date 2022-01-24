const router = require('express').Router()
const Jobs = require('./jobs_model')

router.get('/', (req, res) => {
    return Jobs.getJobs().then(jobs => {
        res.status(200).json(jobs)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({"Error": "There was an error retrieving a list of jobs."})
    })
})

router.get('/:source', (req, res) => {
    const { source } = req.params
    return Jobs.getJobBySource(source).then(jobs => {
        res.status(200).json(jobs)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({"Error": "There was an error retrieving jobs by source."})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    return Jobs.getJobById(id).then(job => {
        res.status(200).json(job)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({"Error": "There was an error retrieving job by ID."})
    })
})

module.exports = router