const knex = require('knex')
const configs = require('../knexfile')
const env = process.env.DB_ENV || 'development'
//would need production DN on heroku

module.exports = knex(configs[env])

// module.exports = {
//     knex,
//     configs,
//     env
// }