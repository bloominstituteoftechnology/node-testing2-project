const knex = require('knex');
const configurations = require('../knexfile.js');
const environment = process.env.DB_ENV || 'development';


module.exports = knex(configurations[environment]);
