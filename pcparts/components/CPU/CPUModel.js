const db = require("../../data/config");

function get() {
  return db("CPU").select(
    "Manufacter",
    "Model",
    "Socket",
    "ClockSpeed",
    "Price"
  );
}

function insert(resource) {
  return db("CPU").insert(resource);
}

function remove(id) {
  return db("CPU")
    .where({ id })
    .del();
}

module.exports = {
  get,
  insert,
  remove
};
