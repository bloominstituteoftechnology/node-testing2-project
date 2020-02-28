const db = require("../database/dbConfig");

module.exports = {
  find
};

function find() {
  return db("users");
}
