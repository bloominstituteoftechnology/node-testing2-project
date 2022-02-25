const db = require('../../data/dbConfig.js');

function getAll() {
    return db('snacks');
  }
  
  function getById(snack_id) {
    return db('snacks').where('snack_id', snack_id).first();
  }
  
  async function insert(snack) {
    const [id] = await db('snacks').insert(snack);
    return getById(id);
  }

module.exports = {
    insert,
    getAll,
    getById,
  }