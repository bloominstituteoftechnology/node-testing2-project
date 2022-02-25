const db = require("../../data/db-config");

function getAll() {
  return db("Quarterbacks");
}

function getById(quarterback_id) {
  return db("Quarterbacks").where("quarterback_id", quarterback_id);
}

async function add(quarterback) {
  const newQuarterbackId = await db("Quarterbacks").insert(quarterback);
  return getById(newQuarterbackId);
}

module.exports = {
  getAll,
  getById,
  add,
};
