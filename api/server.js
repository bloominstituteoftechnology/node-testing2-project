const express = require("express");
const userRouter = require('../users/userRouter.js')

const Users = require('../users/userModel.js')

const server = express();
server.use('/api', userRouter)
server.use(express.json());

server.get("/", (req, res) => {
    res.json('Server is running...')
});


// server.get('/user', async (req, res) => {
//     try {
//         const found = await Users.getUser()
//         if (found) {
//             res.status(200).json(found)
//         } else {
//             res.status(404).json('No user to Display')
//         }
//     }
//     catch {
//         res.status(500).json({
//             message: 'Error'

//         })
//     }
// })

module.exports = server;