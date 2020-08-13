const db = require('../data/db-config');

module.exports = {
  find,
  addCub,
  remove
};

function find() {
  return db('cubs');
}

function addCub(newCub) {
  return db('cubs')
    .insert(newCub)
    .then((id) => {
      return newCub;
    });
}

function remove(id) {
  return db('cubs').where({ id }).del();
}
