const knex = require('knex')

const db = require('../knexfile')

const environment = process.env.DB_ENV || 'development'

const config = knex(db[environment])

module.exports = config