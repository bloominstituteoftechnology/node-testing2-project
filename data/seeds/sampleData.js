/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("Quarterbacks")
    .del()
    .then(function () {
      return knex("Quarterbacks").insert([
        { quarterback_name: "Tom Brady" },
        { quarterback_name: "Joe Montana" },
        { quarterback_name: "Peyton Manning" },
      ]);
    });
};
