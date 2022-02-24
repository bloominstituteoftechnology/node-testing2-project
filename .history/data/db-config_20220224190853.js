const knex = require('knex');
const config = require('../');
const environment = process.env.NODE_ENV || 'development';

module.exports = knex(configs[environment]);
