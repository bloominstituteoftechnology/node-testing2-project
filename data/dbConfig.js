const knex = require('knex');

const knexfile = require('../knexfile.js')

const enviorment = process.env.DB_ENV || "development"

module.exports = knex(knexfile[enviorment])