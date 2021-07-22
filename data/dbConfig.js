const { DB_ENVIRONMENT } = require('../config/secrets');

const dbEngine = DB_ENVIRONMENT;
const config = require('../knexfile')[dbEngine];

module.exports = require("knex")(config);
