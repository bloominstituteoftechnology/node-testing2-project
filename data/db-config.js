const knex = require("knex");

const configs = require("../knexfile.js");

const { NODE_ENV } = require("../config");

module.exports = knex(configs[NODE_ENV]);
