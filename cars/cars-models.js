const db = require("../data/dbconfig");

async function create(data) {
  const [id] = await db("cars").insert(data);
  return findById(id);
}

async function update(id, data) {
  return null;
}

function remove(id) {
  return null;
}

function find() {
  return db("cars");
}

function findById(id) {
  return db("cars").where("id", id).first();
}

module.exports = {
  create,
  update,
  remove,
  find,
  findById,
};
