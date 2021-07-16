// No need to change this file
const knex = require('knex');
const configs = require('../knexfile');
const env = process.env.DB_ENV || 'development';

// What knex configuration is actually used?
// That depends on the value of process.env.NODE_ENV!
module.exports = knex(configs[env]);
