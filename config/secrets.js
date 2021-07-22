const dotenv= require('dotenv');
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

module.exports = {
    DATABASE_URL,
    PORT
}