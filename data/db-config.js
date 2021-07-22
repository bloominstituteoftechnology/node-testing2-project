const knex = require('knex');
const config = require("../knexfile");
const env = process.env.DB || "development"

module.exports = knex(config[env]);