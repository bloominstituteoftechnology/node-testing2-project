const db = require("../../data/db-config");

function getAll() {
  return db("Quarterbacks");
}

function getById(quarterbacks_id) {
  return db("Quarterbacks").where("quarterbacks_id", quarterbacks_id);
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
