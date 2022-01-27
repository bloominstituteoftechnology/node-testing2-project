const db = require("../data/dbConfig");

const findAll = () => {
  return db("joneses");
};

const findById = (jones_id) => {
  return db("joneses").where({ jones_id }).first();
};

const add = async (person) => {
  const [id] = await db("joneses").insert(person);
  return findById(id);
};

module.exports = {
  findAll,
  findById,
  add,
};
