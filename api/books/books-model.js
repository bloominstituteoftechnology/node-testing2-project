const db = require('../../data/dbConfig.js')


function getAll() {
  return db('books')
}

function getById(id) {
  return db('books')
    .where({ id })
    .first()
}

async function create({ title, author }) {
  const [id] = await db('books')
    .insert({ title, author })
  return getById(id)
}

async function remove(id) {
  const removing = await getById(id)
  await db('books')
    .where({ id })
    .del()
  return removing
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
}