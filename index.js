const server = require('./server');
const apiRoutes = require('./api/apiRoutes')


const PORT = process.env.PORT || 3030;
server.use('/api',apiRoutes);
//this will keep the server from starting if it is being used in a test/other file.
if(!module.parent) {
    server.listen(PORT, () => {
        console.log(`Server is up and running on port ${PORT}`)
    })
}


module.exports = server;