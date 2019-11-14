const db = require("./data/dbConfig");

module.exports = {
  add,
  find
};

function add(item) {
  return db("items").insert(item);
}

function find() {
  return db("items");
}
