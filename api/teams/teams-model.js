const db = require("../../data/db-config.js");

module.exports = {
  insert,
  getAll,
  getById,
};

function getAll() {
  return db("sec_teams");
}

function getById(id) {
  return db("sec_teams").where("id", id).first();
}

async function insert(team) {
  return await db("sec_teams")
    .insert(team)
    .then(([id]) => {
      return db("sec_teams").where("id", id).first();
    });
}
