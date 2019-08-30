const knex = require('knex');

const knexConfig = ('../knexfile.js');

const environment = process.env.DB_ENV || 'development';

module.exports(knex(knexConfig[environment]));