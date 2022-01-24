const db = require('../dbconfig')

const addCompany = async(company) => {
    const [id] = await db('companies').insert(company, 'id')

    return getCompanyById(id)
}

const getCompanyById = id => {
    return db('companies').where({ id }).first()
}


// Should only be used inside '../jobs/jobs_resolver' to clean data before running code again
const deleteAllCompanies = async() => {
    await db('companies').del()

    return
}

module.exports = { addCompany, getCompanyById, deleteAllCompanies }