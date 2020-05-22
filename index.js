const server= require('./api/server')

port = process.env.PORT || 5000;

server.listen(port, () => console.log(`\n welcome to server ${port}\n`))