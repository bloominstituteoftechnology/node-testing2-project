exports.seed = function (knex) {
  // Deletes ALL existing entries and resets ids
  return knex("hobbits").then(function () {
    return knex("hobbits").insert([
      { name: "gollum" },
      { name: "frodo" },
      { name: "bard" },
      { name: "beorn" },
    ]);
  });
};
