const db = require('../data/dbConfig.js');

function find() {
  return db('users')
  .select('id', 'username', 'name', 'age', 'state', 'profession');
}

function findById(id) {
  return db('users')
  .where({ id })
  .first();
}

async function add(user) {
  return db('users')
  .insert(user)
}

function remove(id) {
    return db('users')
    .where({ id })
    .del()
}

function update(user, id) {
    return db('users')
    .where({ id })
    .update(user)
}


module.exports = {
    find,
    findById,
    add,
    remove,
    update
  };