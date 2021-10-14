// No need to change this file
const knex = require("knex");
const configurations = require("../knexfile.js");
const environment = process.env.NODE_ENV || "development";

// What knex configuration is actually used?
// That depends on the value of process.env.NODE_ENV!
module.exports = knex(configurations[environment]);
