const db = require("../../data/dbConfig");

function getAll() {
  return db("games");
}

function getById(id) {
  return db("games").where("game_id", id).first();
}

async function add(game) {
  await db("games").insert(game);
}


module.exports = {
  getAll,
  getById,
  add,
};
