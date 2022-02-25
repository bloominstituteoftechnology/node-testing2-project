const configs = require("../knexfile");
const knex = require("knex");

const environment = process.env.Node_ENV || "development";

module.exports = knex(configs[environment]);
