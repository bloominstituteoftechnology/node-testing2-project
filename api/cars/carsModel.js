const db = require("../../data/db-config");

module.exports = {
  insert,
  update,
  remove,
  getAll,
};

async function insert(carInfo) {
  const [id] = await db("cars-info").insert(carInfo, "id");
  return db("cars-info").where({ id }).first();
}

async function update(id, changes) {
  return db("cars-info").update(changes).where({ id });
}

function remove(id) {
  return db("cars-info").where({ id }).del();
}

function getAll() {
  return db("cars-info");
}
