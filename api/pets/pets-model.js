const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  getAll,
  getById,
}

function getAll() {
  return db('pets')
}

function getById(id) {
  return db('pets').where('id', id ).first()
}

async function insert(pet) {
  return db('pets').insert(pet)
    .then(([id]) => {
      return getById(id)
    })
}
