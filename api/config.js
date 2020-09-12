const knex = require("knex");
const environment = process.env.NODE_ENV || 'development';
const knexfile = require("../knexfile")(environment);

module.exports = knex(knexfile);