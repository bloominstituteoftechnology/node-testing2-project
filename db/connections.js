const knex = require("knex");
const knexfile = require("../knexfile.js");
const env = process.env.DB_ENV || "development";

module.exports = knex(knexfile[env]);
