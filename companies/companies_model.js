const db = require('../dbconfig')

// GET all companies
const getCompanies = () => {
    return db('companies')
}

// GET company by ID
const getCompanyById = id => {
    return db('companies').where({ id }).first()
}

// ADD single company, id auto-generated
const addCompany = async(company) => {
    const [id] = await db('companies').insert(company, 'id')

    return getCompanyById(id)
}

// DELETE ALL COMPANIES => Should only be used inside '../jobs/jobs_resolver' to clean data before running code again
const deleteAllCompanies = async() => {
    await db('companies').del()

    return
}

module.exports = { getCompanies, addCompany, getCompanyById, deleteAllCompanies }