const db = require("../../data/dbConfig");

function getAll() {
  return null;
}

async function getById(id) {
  return await db("hobbits").where("id", id).first();
}

async function insert(hobbit) {
  const [id] = await db("hobbits").insert(hobbit);
  return getById(id);
}

function remove(id) {
  return db("hobbits").where("id", id).delete();
}

module.exports = {
  insert,
  remove,
  getAll,
  getById,
};
