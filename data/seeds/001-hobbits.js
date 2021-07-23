exports.seed = function (knex, Promise) {
  return knex("hobbits")
    .truncate()
    .then(function () {
      return knex("hobbits").insert([{ name: "sam" }, { name: "frodo" }, { name: "pippin" }, { name: "merry" }]);
    });
};
