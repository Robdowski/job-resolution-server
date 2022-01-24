const router = require('express').Router()
const Companies = require('./companies_model')

router.get('/', (req, res) => {
    return Companies.getCompanies().then(companies => {
        res.status(200).json(companies)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({"Error": "There was an error retrieving a list of companies."})
    })
})

module.exports = router
