const knex = require('knex');

// const knexConfig = require('../knexfile.js');

const config = require('../knexfile');

// if the environment variable is not set, default to 'development'
// this variable is only set when running the "test" npm scriipt using npm run test
const dbEnv = process.env.DB_ENV || 'development';

// the value of dbEnv will be either 'development' or 'testing'
// we pass it within brackets to select the corresponding configuration
// from knexfile.js

// module.exports = knex(knexConfig.development);

module.exports = knex(config[dbEnv]);
