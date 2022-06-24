const express = require('express');
const Anime = require('./anime-girls/anime-girls-model');
const {checkValidId, checkValidPayload} = require('./anime-girls/anime-girls-middleware');

const server = express();
server.use(express.json());
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({message: err.message, stack: err.stack})
})

server.get('/', (req, res) => {
  res.status(200).json({api: 'up'});
});

server.get('/anime-girls', (req, res, next) => {
  Anime.getAll().then(girls => {
    res.status(200).json(girls);
  }).catch(err => next(err));
});

server.get('/anime-girls/:id', checkValidId, (req, res, next) => {
  Anime.getById(req.params.id).then(girl => {
    res.status(200).json(girl);
  }).catch(err => next(err));
});

server.put('/anime-girls/:id', checkValidId, checkValidPayload, (req, res, next) => {
  Anime.update(req.params.id, req.body).then(girl => {
    res.status(201).json(girl);
  }).catch(err => next(err));
})

server.post('/anime-girls', checkValidPayload, (req, res, next) => {
  Anime.add(req.body).then(girl => {
    res.status(201).json(girl);
  }).catch(err => next(err));
})

server.delete('/anime-girls/:id', checkValidId, (req, res, next) => {
  Anime.remove(req.params.id).then(girl => {
    res.status(200).json(girl);
  }).catch(err => next(err));
})

module.exports = server;