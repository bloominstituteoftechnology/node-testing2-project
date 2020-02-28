const db = require("../db/connections.js");

function find() {
  return db("packages");
}

function findBy(filter) {
  return db("packages")
    .where(filter)
    .first();
}

async function insert(data) {
  const [id] = await db("packages")
    .returning("id")
    .insert(data);
  return await findBy({ id });
}

function remove(id) {
  return db("packages")
    .where({ id })
    .delete();
}

module.exports = { find, findBy, insert, remove };
