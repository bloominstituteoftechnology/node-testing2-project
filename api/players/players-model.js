const db = require("../../data/dbConfig");

async function get() {
  return db("players");
}
async function getById(id) {
  return db("players").where("id", id).first();
}
async function addPlayer(player) {
  const [id] = await db("players").insert(player);

  return getById(id);
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
