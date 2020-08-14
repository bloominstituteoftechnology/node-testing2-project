require('dotenv').config();

const server = require('./api/server.js');

// console.log(`DB_ENV = ${process.env.DB_ENV}`);

// const port = process.env.DB_ENV === 'testing' ? 4000 : 5000;
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));
