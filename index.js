const server = require('./api/server');
const { PORT } = require('./config/secrets');

const port = PORT || 6000;

const sayHello = () => {
    console.log(`server is listening on port: ${port}`);
}

server.listen(port, sayHello);