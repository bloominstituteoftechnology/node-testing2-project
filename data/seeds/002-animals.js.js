exports.seed = function (knex) {
  return knex("animals")
    .truncate()
    .then(function () {
      return knex("animals").insert([
        { animal_name: "dog" },
        { animal_name: "cat" },
        { animal_name: "bird" },
        { animal_name: "lizard" },
      ]);
    });
};
