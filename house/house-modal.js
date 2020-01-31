const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  removeUser,
};

function find() {
  return db('house').select('id', 'houseName', 'password');
}

function findBy(filter) {
  return db('house').where(filter);
}

 function add(house) {
return db('house').insert(house)
  .then(ids => {
    return ids[0]
  })
 
}

function findById(id) {
  return db('house')
    .where({ id })
    .first();
}

function removeUser(id) {
  return db('house')
    .where({id})
    .del();
}