const server = require('./api/server.js');

const PORT = process.env.PORT || 7500;
server.listen(PORT, () => console.log(` Running on port: ${PORT} `));