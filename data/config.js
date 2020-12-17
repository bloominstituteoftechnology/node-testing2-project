const knex = require('knex');

const config = require('../knexfile');

const environment = 'development';

module.exports = knex(config[environment]);