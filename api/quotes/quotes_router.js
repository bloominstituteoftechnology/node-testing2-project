const Quotes = require('./quotes_model');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    Quotes.find()
        .then(quotes => {
            res.status(200).json(quotes);
        })
        .catch(error => {
            res.status(500).json(error);
        });
})

router.get('/:id', (req, res) => {
    Quotes.findById(req.params.id)
        .then(quote => {
            res.status(200).json(quote);
        })
        .catch(error => {
            res.status(500).json(error)
        });  
})

router.post('/', (req, res) => {
    Quotes.create(req.body)
        .then(quote => {
            res.status(201).json(quote);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/:id', (req, res) => {
    Quotes.remove(req.params.id)
        .then(quote => {
            res.status(200).json(quote);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

module.exports = router;