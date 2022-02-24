const db = require("../../data/db-config");

module.exports = {
  getAll,
  getByID,
  make,
};

function getAll() {
  return db("children");
}

function getByID(id) {
  return db("children").where("child_id", id).first();
}

async function make(child) {
  return db("children")
    .insert(child)
    .then((id) => {
      return getByID(id);
    });
}
