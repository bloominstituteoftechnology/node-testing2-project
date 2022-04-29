const express = require('express');

const Smash = require('./Smash/smash-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.get('/smash', (req, res) => {
    Smash.getAll()
        .then(characters => {
            res.status(200).json(characters);
        })
        .catch(err => {
            res.status(500).json('characters could not be retrieved');
        });
});

server.get('/smash/:id', (req, res) =>{
    Smash.getById(req.params.id)
        .then(character => {
            if(!character){
                res.status(404).json({ message: 'character not found' });
            } else {
                res.status(200).json(character);
            }
        })
        .catch(err => {
            res.status(500).json({message: 'characters could not be retrieved'});
        });
});

server.post('/smash', (req, res) => {
    Smash.add(req.body)
        .then(newChar => {
            res.status(201).json(newChar);
        })
        .catch(() => {
            res.status(500).json({ message: 'character could not be added' });
        });
});

server.delete('/smash/:id', (req, res) => {
    Smash.remove(req.params.id)
        .then(deleted => { 
            if(!deleted){
                res.status(404).json({message: 'no character found at id'});
            } else {
                res.status(200).json(deleted);
            } 
        })
        .catch(() => { 
            res.status(500).json({message: 'could not remove character'})
        });
});

module.exports = server