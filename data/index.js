const server = require('./api/server');
//imports

const cors = require('cors');
const helmet = require('helmet');

const corsConfig = 
//middlewares
server.use(cors(),helmet())
//PORT
const PORT = 6969;

server.listen(PORT, ()=>{
    console.log(`****SERVER LIVE ON PORT : ${PORT}****`);
});
