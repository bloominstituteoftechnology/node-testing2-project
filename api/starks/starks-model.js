const db = require('../../data/db-config')

module.exports = {
  getAll,
  getById,
  insert
}

function getAll() {
  return db('starks')
}

function getById(id) {
  return db('starks').where('id', id).first()
}

async function insert(stark) {
  return db('starks').insert(stark)
    .then(([id]) => {
      return getById(id)
    })
}
