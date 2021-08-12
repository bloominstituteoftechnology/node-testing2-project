/* eslint-disable */
const db = require("../../data/dbConfig");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
};

function getAll() {
  return db("users");
}

function getById(id) {
  return null;
}

function insert(user) {
  return null;
}

function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}
