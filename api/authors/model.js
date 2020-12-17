const db = require('../../data/config');

module.exports = {
  find,
  insert,
  remove,
};

function find() {
  return db('Authors');
}

function insert(newAuthor) {
  return db('Authors').insert(newAuthor);
}

function remove(id) {
  return db('FamousWriters').where({ id }).delete();
}