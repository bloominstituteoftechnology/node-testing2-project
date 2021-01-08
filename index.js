const server = require('./api/server.js')
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`
        *** Hello :) I'm listening on ${PORT} ***
    `)
})