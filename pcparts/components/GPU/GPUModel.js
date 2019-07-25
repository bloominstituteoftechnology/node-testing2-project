const db = require("../../data/config");

function get() {
  return db("GPU").select(
    "Manufacter",
    "Subvendor",
    "Model",
    "MemoryCapacity",
    "ClockSpeed",
    "Price"
  );
}

function insert(resource) {
  return db("GPU").insert(resource);
}

function remove(id) {
  return db("GPU")
    .where({ id })
    .del();
}

module.exports = {
  get,
  insert,
  remove
};
