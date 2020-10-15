const db = require("../data/config");

module.exports = {
  find,
  insert,
  remove,
};

function find() {
  return db("Philosophers");
}

function insert(newPhil) {
  return db("Philosophers").insert(newPhil);
}

function remove(id) {
  return db("Philosophers").where({ id }).delete();
}
