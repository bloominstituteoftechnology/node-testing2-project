const knex = require("knex")
const knexFile = require('../knexfile');
const environment = process.env.NODE_ENV || development
module.exports = knex(knexFile[environment]);