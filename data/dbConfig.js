const knex = require("knex")
const config= require("../knexfile")
const envirment = process.env.DB_ENV||"development"
module.exports=knex(config[envirment])