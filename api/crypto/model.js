const db = require("../../data/db-config");

const getAll = () => {
  return db("crypto");
};

module.exports = {
  getAll,
};
