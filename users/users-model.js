const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('users')
}

function getById(id) {
  return db('users').where({ id })
    .first()
}

async function insert(user) {
  return db('users').insert(user)
    .then(([id]) => {
      return getById(id)
    })
}

async function update(id, changes) {
  return null
}

function remove(id) {
  return null
}
