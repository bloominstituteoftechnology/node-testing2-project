const db = require("../../data/dbConfig");

module.exports = {
  get() {
    return db("stocks");
  },

  async add(stock) {
    const [id] = await db("stocks").insert(stock);
    return db("stocks").where({ id }).first();
  },

  delete(id) {
    return db("stocks").where("id", id).del();
  },
};
