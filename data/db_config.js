const knex = require('knex');

const knexConfig = require('../knexfile.js'); // hey future you! (2 hours later you forgot to 'require' the module! Just a friendly reminder!!) 

const environment = process.env.DB_ENV || 'development';

//console.log("start: ", process.env.DB_ENV, knexConfig);
module.exports = knex(knexConfig[environment]);