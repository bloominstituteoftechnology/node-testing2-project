/* eslint-disable */
exports.seed = function (knex, Promise) {
  return knex("users")
    .truncate()
    .then(function () {
      return knex("users").insert([
        { name: "sam" },
        { name: "mike" },
        { name: "john" },
        { name: "stan" },
      ]);
    });
};
