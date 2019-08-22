const db = require("../data/db-config.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("departments");
}

function findBy(filter) {
  return db("departments").where(filter);
}

function add(department) {
  return db("departments")
    .insert(department)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("departments")
    .where({ id })
    .first();
}