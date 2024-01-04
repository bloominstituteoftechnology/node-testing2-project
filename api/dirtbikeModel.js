const db = require("../data/db-config");

async function getAll() {
  return await db("dirtbikes");
}

async function getById(id) {
  return await db("dirtbikes").where("dirtbike_id", id).first();
}

async function createDirtbike(dirtbike) {
  const [id] = await db("dirtbikes").insert(dirtbike);
  return db("dirtbikes").where("dirtbike_id", id).first();
}

async function updateDirtbike(id, updates) {
  await db("dirtbikes").where("dirtbike_id", id).update(updates);
  return db("dirtbikes").where("dirtbike_id", id).first();
}

async function deleteDirtbike(id) {
  //   const dirtbike = await db("dirtbikes").where("dirtbike_id", id).first();
  //   await db("dirtbikes").where("dirtbike_id", id).del();
  //   return dirtbike;

  const dirtbike = await db("dirtbikes").where({ dirtbike_id: id }).first();

  //   await db("dirtbikes").where({ dirtbike_id: id }).del();
  //   return dirtbike;
  const deletingDirtbike = await db("dirtbikes").where("dirtbike_id", id).del();

  if (deletingDirtbike > 0) {
    return dirtbike;
  } else {
    return null;
  }
}

module.exports = {
  createDirtbike,
  deleteDirtbike,
  getAll,
  getById,
  updateDirtbike,
};
