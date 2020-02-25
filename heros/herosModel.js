const db = require('../database/dbConfig.js');

module.exports = {
  insert,
  getAll,
  findById
};

async function insert(hero) {
  const [id] = await db('heros').insert(hero, 'id');

  return findById(id);
}


function getAll() {
  return db('heros');
}

function findById(id) {
    return db('heros')
      .where({ id })
      .first();
  }
