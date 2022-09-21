const db = require("../data/db-config");

function getAll() {
  return db("students");
}

function getById(id) {
  return db("students").where("id", id).first();
}

function post(payload) {
  return db("students")
    .insert(payload)
    .then(([id]) => {
      return db("students").where("id", id).first();
    });
}

async function update(id, payload) {
  await db("students").where("id", id).update(payload);
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  post,
  update,
};
