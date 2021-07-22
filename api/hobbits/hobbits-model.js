const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('hobbits')
}

function getById(id) {
  return db('hobbits').where('id', id).first()
}

async function insert(hobbit) {
  const [id] = await db('hobbits').insert(hobbit) 
}

async function update(id, changes) {
  return null
}

async function remove(id) {
  const hobbit = await db('hobbits').where('id', id).first()
  await db('hobbits').where('id', id).del()
  return hobbit
}
