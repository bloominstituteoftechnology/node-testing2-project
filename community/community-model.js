const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  remove
};

function find() {
  return db('community');
}

function findById(id) {
  return db('community')
  .where({id})
  .first();
}

function add(newMember) {
  return db('community')
    .insert(newMember, 'id')
    .then(([id]) => {
      return findById(id);
    });
}

function remove(id) {
  return db('community')
  .where({id})
  .del()
}