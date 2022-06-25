const db = require('../../data/dbConfig');

function getAll() {
  return db('anime_girls');
}

function getById(id) {
  return db('anime_girls').where({id}).first();
}

function add(girl) {
  return db('anime_girls').insert(girl).then(([id]) => getById(id));
}

function update(id, changes) {
  return db('anime_girls').update(changes).where({id}).then(() => getById(id));
}

async function remove(id) {
  const result = await getById(id);
  await db('anime_girls').delete().where({id});
  return result;
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
}