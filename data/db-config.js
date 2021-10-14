const knex = require('knex');
const configurations = require('../knexfile');
const environment = process.env.DB_ENV || 'development';

module.exports = knex(configurations[environment]);