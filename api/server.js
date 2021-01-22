const express = require('express');

const notes = require('../api/notes/notes-route');

const app = express();

app.use(express.json());

app.use('/api', notes);
app.get('/api', (request, response) => {
    response.status(200).json({
        message: "Hello World",
    });
});

// error
app.use((error, request, response, next) => {
    console.log(error);
    return response.status(500).json({'message': 'an error occurred'});
});

module.exports = app;