const knex = require('knex');
const config = require('./knexfile.js');

const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];

const connection = knex(environmentConfig);

module.exports = connection;
