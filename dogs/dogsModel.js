const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(dog) {
  return db('dogs').insert(dog, 'id')
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return db('dogs').where('id', id).del()
}

function getAll() {
  return db('dogs');
}

function findById(id) {
  return db('dogs').where({ id }).first()
}
