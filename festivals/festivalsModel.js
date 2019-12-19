const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(festival) {
  return db('festivals')
    .insert(festival)
    .returning('id');
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getAll() {
  return db('festivals');
}

function findById(id) {
  return null;
}
