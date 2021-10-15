const knex = require('knex')
const configurations = require('../knexfile.js')
const enviorment = process.env.DB_ENV || "development"

module.exports = knex (configurations[enviorment])