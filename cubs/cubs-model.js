const db = require('../data/db-config');

module.exports = {
  find,
  add,
  remove
};

function find() {
  return db('cubs');
}

function add(newCub) {
  return db('cubs')
    .insert(newCub)
    .then((id) => {
      return newCub;
    });
}

function remove(id) {
  return db('cubs').where({ id }).del();
}
