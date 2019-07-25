

const knex = require('knex');
const connection = require('../knexfile');
const environment =  'development';

module.exports = knex(connection[environment])