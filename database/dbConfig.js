const knex = require("knex");

const knexConfig = require("../knexfile.js");

const environment = process.env.DB_ENV || "development";
console.log(environment);

module.exports = knex(knexConfig[environment]);
