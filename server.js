// const express = require('express')
// const cors = require('cors')
// const vampiresRouter = require('./vampires/vampireRouter')

// const server = express()

// server.use(cors())
// server.use(express.json())

// server.use('/vampires', vampiresRouter)

// server.get("/", (req,res) => {
//     res.json({
//         message: "Vampire API",
//     })
// })

// const port = process.env.PORT || 5000

// server.listen(port, () => {
// 	console.log(`Running at http://localhost:${port}`)
// })

// server.use((err,req,res,next) => {
//     console.log(err)
//     res.status(500).json({
//         message: "Something Went Wrong!"
//     })
// })

// module.exports = server

const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

module.exports = server;