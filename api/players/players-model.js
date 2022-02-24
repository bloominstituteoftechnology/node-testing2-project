const db = require("../../data/dbConfig");

async function get() {
  return db("players");
}
async function getById(id) {
  return null;
}
async function addPlayer(player) {
  return null;
}
async function update(id, player) {
  return null;
}
async function remove(id) {
  return null;
}

module.exports = {
  get,
  getById,
  addPlayer,
  update,
  remove,
};
