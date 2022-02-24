const db = require('../../data/db-config');

function getAll() {
  return db('dogs')
}

function getById(id) {
  return db('dogs').where('id', id).first();
}

async function insert(hobbit) {
  const [id] = await db('dogs').insert(hobbit);
  return getById(id);
}

async function update(id, changes) {
  await db('dogs')
    .update({ name: changes.name })
    .where('id', id); 
  return getById(id);
}

async function remove(id) {
  const result = await getById(id);
  await db('dogs')
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