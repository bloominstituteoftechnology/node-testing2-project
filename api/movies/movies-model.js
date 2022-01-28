const db = require('../../data/db-config')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('movies')
}

function getById(id) {
  return null
}

async function insert(hobbit) {
  return null
}

async function update(id, changes) {
  return null
}

function remove(id) {
  return null
}
