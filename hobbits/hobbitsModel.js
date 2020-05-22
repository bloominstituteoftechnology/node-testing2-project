const db = require("../data/db-config");

module.exports = {
  add,
  remove,
  getAll,
  findById,
};

async function add(hobbit) {
  return db("hobbits")
    .insert(hobbit, "id")
    .then((ids) => {
      return findById(ids[0]);
    });
}

function remove(id) {
  return db("hobbits").where({ id }).del();
}

function getAll() {
  return db("hobbits");
}

function findById(id) {
  return db("hobbits").where({ id }).first();
}
