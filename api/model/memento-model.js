const db = require('../../data/db-config');

function findBy(id){
  return db('momento').where({id}).first();
}

async function insert(user){
  const [id] = await db('momento').insert(user);
  return findBy(id);
}

function deleteBy(id){
  return db('momento').where({id}).del();
}


module.exports = {
  insert,
  findBy,
  deleteBy
}