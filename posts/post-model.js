const db = require("../database/db-config")

module.exports = {
    add,
    getAll,
    findBy,
    update,
    remove
}

function add(post) {
    return db("posts").insert(post)
}

function getAll(){
    return db("posts")
}

function findBy(filter) {
	return db("posts")
		.select("user_id", "post_title", "post_category", "post_author", "rating", "post_text")
		.where(filter)
}

function update(id, changes) {
    return db("posts")
      .where("id", id)
      .update(changes)
  }

  function remove(id) {
    return db("posts")
      .where("id", id)
      .del();
  }
  