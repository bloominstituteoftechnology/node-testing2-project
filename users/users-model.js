const db = require("../data/db-config.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("users as u")
    .select(
      "u.id",
      "u.username",
      "u.password",
      "p.name as positionName",
      "d.name as departmentName"
    )
    .innerJoin("positions as p", "p.id", "=", "u.position_id")
    .innerJoin("departments as d", "d.id", "=", "u.department_id");
}

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}