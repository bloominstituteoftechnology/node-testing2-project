const server = require('./api/server')
const { PORT } = require('./secret')

server.listen(PORT, () => {
  console.log(`\n** Running on port ${PORT} **\n`)
})