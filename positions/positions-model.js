const db = require("../data/db-config.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("positions");
}

function findBy(filter) {
  return db("positions").where(filter);
}

function add(position) {
  return db("positions")
    .insert(position)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("positions")
    .where({ id })
    .first();
}