var fs = require('fs'); 
var parse = require('csv-parse');
var path = require('path')

const jobBoardsData = require('../data/jobBoards.json')
var inputFile = path.resolve(__dirname+"/../data/job_opportunities.csv");

var Companies = require('../companies/companies_model')
var Jobs = require('./jobs_model');


// Drop tables before adding companies, jobs again
Companies.deleteAllCompanies()
Jobs.deleteAllJobs()

// Useful for fast lookup of potential sources
// Will include root_domains as keys and company_names as values
// ex. => {'google.com': 'google'}
sources = {}

// Enter company data into database from JSON
jobBoardsData.forEach(item => {
    const { name, rating, root_domain, logo_file, description } = item
    const company_name = name
    sources[root_domain] = company_name.toLowerCase()
    Companies.addCompany({company_name, rating, root_domain, logo_file, description})
})


// Instantiate variables to count # of each item and console.log at end of csv read
// Not really useful other than for debugging
var sourceCount = 0
var websiteCount = 0
var unknownCount = 0

// @param {url} unformatted url string
// @param {company} name of company that the job is for
// @param {sources} object which includes root_domains as keys and company names as value
//
// Primary way to resolve job sources from the csv data
const resolveSource = (url, company, sources) => {
    // Use RegEx to determine if the url is valid
    var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain = matches && matches[1];

    // Check needed for some edge cases  
    if (domain) {
        // Take the domain name and extension (.co, .com, .org, etc.)
        domain = domain.split('.').slice(-2).join('.')
        console.log(domain)
        if (sources[domain]) {
            sourceCount += 1
            return sources[domain]
        }

        // Now, take just the domain name
        domain = domain.split('.')[0]
        if (company.toLowerCase() === domain) {
            websiteCount += 1
            return "Company Website"
        }
    }

    // If we get to this point, we know we either don't have a valid url, or none of the other cases are true
    unknownCount += 1
    return "Unknown"
}



// take csv data
var parser = 
    parse.parse({delimiter: ',', relaxColumnCount: true, fromLine: 2})
    .on('data', function(csvrow) {

    const job_id = csvrow[0]
    const job_title = csvrow[1]
    const company_name = csvrow[2]
    const job_url = csvrow[3] || ''

    let job_source;
    if (job_url !== '') {
        job_source = resolveSource(job_url, company_name, sources) 
    } else {
        job_source = "Unknown"
    }

    Jobs.addJob(
        {
        job_id,
        job_title,
        company_name,
        job_url,
        job_source   
        }
    )
    })
    .on('end',function() {
        console.log("Source Count: ", sourceCount)
        console.log("Website Count: ", websiteCount)
        console.log("Unknown Count: ", unknownCount)
    });

fs.createReadStream(inputFile).pipe(parser)
