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
    return db('movies')
      .where({ id })
      .first()
  }
  
  async function insert(movie) {
    const [id] = await db('movies').insert(movie)
    return getById(id)
  }
  

async function update(id, changes) {
  return null
}

function remove(id) {
  return null
}
