const express = require('express')

const helmet = require('helmet')
const cors = require('cors')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())


const jobsRouter = require('./jobs/jobs_router.js')
server.use('/jobs', jobsRouter)

const companiesRouter = require('./companies/companies_router.js')
server.use('/companies', companiesRouter)

module.exports =  server 
