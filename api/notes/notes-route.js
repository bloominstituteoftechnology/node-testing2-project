const express = require('express');

const Note = require('./notes-model');

const router = express.Router();

router.get('/notes', async (request, response, next) => {
    try {
        let notes = await Note.get();

        return response.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
});

router.get('/notes/:id', async (request, response, next) => {
    try {
        let note = await Note.getByID(request.params.id);

        if (!note) {
            return response.status(404).json({"message": "note not found"});
        } else {
            return response.status(200).json(note);
        }
    }
    catch (error) {
        next(error);
    }
});

router.post('/notes', async (request, response, next) => {
    try {
        let data = {
            title: request.body.title,
            description: request.body.description
        };

        if (request.body.title) {
            let note = await Note.create(data);

            return response.status(201).json(note);
        } else {
            return response.status(400).json({"message": "Title is required."});
        }
    }
    catch (error) {
        next(error);
    }
});

router.put('/notes/:id', async (request, response, next) => {
    try {
        let data = {
            title: request.body.title,
            description: request.body.description
        };

        let result = await Note.edit(request.params.id, data);

        return response.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.delete('/notes/:id', async (request, response, next) => {
    try {
        let result = await Note.remove(request.params.id);

        if(result > 0) {
            return response.status(200).json({"message": "note deleted"});
        } else {
            return response.status(400).json({"message": "unable to delete note"})
        }

    }
    catch (error) {
        next(error);
    }
});

module.exports = router;