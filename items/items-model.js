const db = require('../data/dbConfig.js');

function find() {
    return db('items');
}
function findById(id) {
    return  db('items')
      .where({ id })
      .first();
}

async function add(newItem) {
const [id] = await db('items').insert(newItem, 'id');
return findById(id);
    // return db('items')
    // .where({id})
    // .first();
}

function update(updatedItem, id) {
    return  db('items')
    .where({ id })
    .update(updatedItem, "*");
 }

  function remove(id) {
    return db('items')
      .where({ id })
      .del();
  }

module.exports = {
    find,
    add,
    update,
    findById,
    remove,
}
