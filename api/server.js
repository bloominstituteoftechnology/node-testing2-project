const express = require('express');
const db = require('../employees/employees-model');
//require the db helper methods

const server = express();

server.use(express.json());
//normally add router here but for instance sake we will only use the server for this project

server.get('/', async (req, res)=>{
    
    try{
    const employees = await db.getAll();
        res.status(200).json(employees);
    }
    catch({message}){
        res.status(500).json({message});
    }

});

server.post('/', async (req, res) => {
    const employee = req.body;
    try{
        const addedEmployee = await db.addEmp(employee);
        res.status(201).json(addedEmployee);
    }
    catch({message}){
        res.status(500).json({message});
    }
});

server.delete('/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const removed = await db.removeEmp(id);
        res.status(200).json(removed);
    }
    catch({message}){
        res.status(500).json({message});
    }

});



module.exports = server;