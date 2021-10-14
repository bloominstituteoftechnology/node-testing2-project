const db = require("../../data/dbConfig");

function getAll() {
  return db("games");
}

function getById(id) {
  return db("games").where("game_id", id).first();
}


module.exports = {
  getAll,
  getById,
};
