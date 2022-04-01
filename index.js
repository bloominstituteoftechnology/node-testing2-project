// server import 
const server = require('./api/server');
// port or switch for hosting
const PORT = process.env.port || 9000;
// server start
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});