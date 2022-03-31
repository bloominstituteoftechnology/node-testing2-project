const db = require('../../data/db-config')

function getAll() {
  return db('jokes')
}

function getById(joke_id) {
  return db('jokes').where({joke_id}).first()
}

function create(joke) {
  return db('jokes').insert(joke).where({ joke_id: joke.joke_id }).then(id => {
    return getById(id)
  })
}

module.exports = {
  getAll,
  getById,
  create
}