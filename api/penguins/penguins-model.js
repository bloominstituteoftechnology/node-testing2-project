const db = require('../../data/dbConfig.js')

function getAll() {
  return db('penguins')
}

function getById(id) {
  return db('penguins').where('id', id).first();
}

async function insert(penguin) {
  const [id] = await db('penguins').insert(penguin);
  return getById(id);
}

async function update(id, changes) {
  await db('penguins')
  .update({ name: changes.name })
    .where('id', id); 
  return getById(id);
}

async function remove(id) {
  const result = await getById(id);
  await db('penguins')
  .where('id', id)
  .del();
  
  return result;
}

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}