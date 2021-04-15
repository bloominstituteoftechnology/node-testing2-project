require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT || 5011;
server.listen(port, () =>
	console.log(`\n *** server listening on port ${port} *** \n`)
);
