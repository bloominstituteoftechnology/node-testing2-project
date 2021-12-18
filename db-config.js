const knex = require('knex')
const configs = require('./knexfile')
const environment = process.env.NODE_ENV || 'development'

module.exports = knex(configs[environment])

// cross-env in the testing script --creates environment variable in that instance of the test run;  
// if we push to heroku we need  a production environment option too

