const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  insert,
  remove,
};

function getAll() {
  return db("memes");
}
async function insert(meme) {
  const [id] = await db("memes").insert(meme);
  return db("memes").where({ id }).first();
}
async function remove(id) {
  return await db("memes").where({ id }).del();
}
