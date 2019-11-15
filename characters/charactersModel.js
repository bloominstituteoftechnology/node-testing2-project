const db = require('../data/db-config');

module.exports = {
    insert,
    remove,
    getAll,
    findById
}

function getAll() {
    return db("characters");
  }

async function insert(characters) {
    const [id] = await db("characters").insert(characters, "id");
    return db("characters").where({id}).first();
}

function remove(id){
    return db("characters")
    .where({ id })
    .del()
} 

function findById(id) {
    return db("characters").where({ id }).first();
};