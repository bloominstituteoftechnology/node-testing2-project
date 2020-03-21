const server = require('./api/server.js');

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(` Running on port: ${PORT} `)); 

// MVP complete