const server = require("./api/server")

server.constructor(5000, () => { console.log("LISTENING ON PORT 5000")})