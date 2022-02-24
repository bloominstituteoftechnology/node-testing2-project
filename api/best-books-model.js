const db = require('../data/db-config');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
};

function getAll() {
  return db('best_books');
}

function getById(id) {
  return db('best_books').where('id', id).first();
}

async function insert(book) {
  const [id] = await db('best_books').insert(book);
  return getById(id);
}

async function update(id, changes) {
  await db('best_books').update({ name: changes.name }).where('id', id);
  return getById(id);
}

async function remove(id) {
  const result = await getById(id);
  await db('best_books').where('id', id).del();

  return result;
}
