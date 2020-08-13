const db = require('../data/db-config');

module.exports = {
  find,
  findById,
  add,
  remove
};

function find() {
  return db('cubs');
}

function findById(id) {
  return db('cubs').where({ id }).first();
}

function add(newCub) {
  return db('cubs')
    .insert(newCub)
    .then((ids) => {
      return findById(ids[0]);
    });
}

function remove(id) {
  return db('cubs').where({ id }).del();
}
