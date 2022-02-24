const db = require("../../data/db-Config");

module.exports = {
  insert,
  getAll,
  getById,
};

function getAll() {
  return db("cars");
}

function getById(id) {
  return db("cars").where("id", id).first();
}

async function insert(car) {
  return db("cars")
    .insert(car)
    .then(([id]) => {
      return getById(id);
    });
}
