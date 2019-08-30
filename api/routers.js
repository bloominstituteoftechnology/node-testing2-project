const Menu = require('../menu/menuModel')
const express = require('express');

const router = express();
router.post('/add', (req, res)=> {
    const item =req.body;

    Menu.add(item)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(err=> {
        res.staus(500).json(err)
    })
})