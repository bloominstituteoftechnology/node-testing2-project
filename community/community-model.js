const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findById,
};

function find() {
  return db('companyInfo');
}

async function add(user) {
  const [id] = await db('companyInfo').insert(user);
  console.log(`added user`, user)
  return findById(id);
}

function findById(id) {
  return db('companyInfo')
    .where({ id })
    .first();
}