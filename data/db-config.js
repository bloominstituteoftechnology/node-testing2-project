const knex = require("knex");

const config = require("../knexfile").development;

// const environment = process.env.DB_ENV || "development";

module.exports = knex(config);
