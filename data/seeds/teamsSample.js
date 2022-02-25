/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("Teams")
    .del()
    .then(function () {
      return knex("Teams").insert([
        { team_name: "Patriots", quarterback_id: 1 },
        { team_name: "49ers", quarterback_id: 2 },
        { team_name: "Colts", quarterback_id: 3 },
      ]);
    });
};
