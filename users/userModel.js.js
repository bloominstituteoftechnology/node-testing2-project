const db = require("../database/dbConfig.js");
module.exports = {
  insert,

  getAll,
  findById,
  findBy,
};

function getAll() {
  return db("users");
}

function findById(id) {
  return db("users").where({ id });
}

async function insert(user) {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
}

function findBy(filter) {
  return db("users").where(filter).first();
}
