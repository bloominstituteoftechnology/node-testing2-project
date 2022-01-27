exports.seed = function (knex) {
  return knex("joneses")
    .truncate()
    .then(function () {
      return knex("joneses").insert([
        { first_name: "Jim", last_name: "Jones" },
        { first_name: "Dana", last_name: "Jones" },
        { first_name: "Travis", last_name: "Jones" },
        { first_name: "Morgan", last_name: "Jones" },
        { first_name: "Skylar", last_name: "Jones" },
        { first_name: "Emily", last_name: "Mills" },
        { first_name: "Ian", last_name: "Mills" },
        { first_name: "Rosemary", last_name: "Mills" },
      ]);
    });
};
