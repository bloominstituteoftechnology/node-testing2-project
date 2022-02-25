const db = require("../../data/db-config");

function getAll() {
  return db("Teams");
}

function getById(quarterback_id) {
  return db("Quarterbacks").where("quarterback_id", quarterback_id);
}

async function add(team) {
  const newTeamId = await db("Quarterbacks").insert(team);
  return getById(newTeamId);
}

module.exports = {
  getAll,
  getById,
  add,
};
