const dotenv= require('dotenv');
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const DB_ENVIRONMENT = process.env.DB_ENVIRONMENT || 'development';
const PORT = process.env.PORT;

module.exports = {
    DATABASE_URL,
    DB_ENVIRONMENT,
    PORT
}