const knex = require('knex')

const configurations = require('../knexfile')

const enviroment = process.env.NODE_ENV || 'development'

module.exports = knex(configurations[enviroment])