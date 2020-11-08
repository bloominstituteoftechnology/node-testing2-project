const db = require("../data/config");

function find() {
  return db("cakes");
}

function findById(id) {
  return db("cakes").where({ id }).first();
}

async function create(data) {
  const [id] = await db("cakes").insert(data);
  return findById(id);
}

async function update(id, data) {
  await db("cakes").where({ id }).update(data);
  return findById(id);
}

function remove(id) {
  return db("cakes").where({ id }).del();
}

module.exports = {
  find,
  findById,
  create,
  update,
  remove,
};
