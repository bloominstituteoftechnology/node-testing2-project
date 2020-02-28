const db = require("../database/connection.js");

module.exports = {
  all,
};

function all() {
  return db("cohorts");
}
