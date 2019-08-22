const db = require("./data/db-config");

module.exports = { get, add, remove };

function get() {
  return db("superheroes");
}

function add(superhero) {
  return db("superheroes").insert(superhero);
}

function remove(id) {
  return db("superheroes")
    .where({ id: id })
    .del();
}
