const db = require("../data/dbConfig");

module.exports = {
//   getArticles,
  getCategory,
  deleteArticle,
  addArticle,
  findById,
  getUserArticles,
  //getArticlesByCategory,
};

// function getArticles() {
//   return db("articles");
// }

function getUserArticles(id) { //tested on postman
  if (!id) {
    return db("articles")
    .join("users", "articles.userId", "=", "users.id")
    .select("articles.articleName", "articles.linkToArticle","articles.categories")
  }
  return db("tasks")
  .join("users", "articles.userId", "=", "users.id")
  .select("articles.articleName", "articles.linkToArticle","articles.categories")
    .where({ userId: id });
}

// function getArticlesByCategory() {
// NEED TO GET LOGIC FOR THIS
// }

function getCategory() {//works on postman
  return db("articles")
  .select("categories")
}

function findById(id) {//works on postman
  return db("articles")
    .where({ id })
    .first();
}

function addArticle(newArticle) {// works on postman
  return db("articles")
    .insert(newArticle)
    .then(ids => {
      return findById(ids[0]);
    });
}


function deleteArticle(article) {
  return db("article")
    .where("id", id)
    .del(article);
}
