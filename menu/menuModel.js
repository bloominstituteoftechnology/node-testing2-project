const db = require('../data/dbConfig.js');

module.exports = {
 add,
  update,
  remove,
  getAll,
  findById,
};

async function add(item) {
const {id}=await db('menu').insert(item, 'id');
// return findById(id);

 }

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getAll() {
  return db('menu');
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}