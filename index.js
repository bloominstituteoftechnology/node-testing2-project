const server = require("./server.js")

const PORT = 1234

server.listen(PORT, () => {
    console.log(`Port running on port ${PORT}`)
})

