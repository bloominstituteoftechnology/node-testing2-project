require('dotenv').config()
 
module.exports = {
  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 8,
  NODE_ENV: process.env.NODE_ENV  || 'development',
  PORT: process.env.PORT || 9000,
  JWT_SECRET: process.env.JWT_SECRET || 'The_JWT_Secret'
}
