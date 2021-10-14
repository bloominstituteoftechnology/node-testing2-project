const db = require("../../data/dbConfig");

function getAll() {
  return db("games");
}

function getById(id) {
  return db("games").where("game_id", id).first();
}

async function add(game) {
  const [id] = await db("games").insert(game);
  return getById(id);
}

function deleteById(id) {
  return db("games").where("game_id", id).del();
}


module.exports = {
  getAll,
  getById,
  add,
  deleteById,
};
