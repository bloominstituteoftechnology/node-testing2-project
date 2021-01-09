const express = require('express');
const server = express();
const bcrypt = require('bcryptjs');
const dbUser = require('./model.js');


server.use(express.json());

server.get('', (req, res) => {
    res.status(200).json({api: 'up'})
})

server.post('/api/register', async (req, res) => {
    const reg =  req.body;
    if (!reg.username || !reg.password || !reg.department) {
        res.status(400).json({
            errorMsg: `Please check that all required fields (username, password, and department) are valid!`
        })
    } else {
        try {
            const hash = bcrypt.hashSync(reg.password, 10);
            reg.password = hash
            const registered = await dbUser.register(reg);
            res.status(201).json({
                message: 'User registered!',
                response: registered
            })
        } catch (error) {
            res.status(500).json({
                message: 'server error - POST /register'
            })
        }
    }
})

server.delete('/api/remove-user/:id', async (req, res) => {
    const {id} = req.params;
    if (!dbUser.findUserById(id)) {
        res.status(404).json({
            errorMsg: `User with id:${id} not found!`
        })
    } else {
        try {
            const removed = await dbUser.remove(id);
            res.status(200).json({
                message: `User removed!`,
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                errorMsg: 'server error - remove user',
                error,
            })
        }
    }
})





module.exports = server;