const db = require("../data/db-config");

async function createDirtbike(dirtbike) {
  const [id] = await db("dirtbikes").insert(dirtbike);
  return db("dirtbikes").where("dirtbike_id", id).first();
}

async function deleteDirtbike(id) {
  const dirtbike = await db("dirtbikes").where("dirtbike_id", id).first();
  await db("dirtbikes").where("dirtbike_id", id).del();
  return dirtbike;
}

module.exports = {
  createDirtbike,
  deleteDirtbike,
};
