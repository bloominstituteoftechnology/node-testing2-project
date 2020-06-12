const knex = require('knex')
const config = require('../knexfile.js')

const enviroment = process.env.DB_ENV || 'development'

module.exports = knex(config[enviroment])