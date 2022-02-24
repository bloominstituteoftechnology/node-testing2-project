const knex = require('knex');
const configs = require('..');
const environment = process.env.NODE_ENV || 'development';

module.exports = knex(configs[environment]);
