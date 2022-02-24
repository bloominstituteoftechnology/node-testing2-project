exports.seed = async function (knex) {
  // Truncating a table deletes ALL existing entries and resets the primary keys
  await knex("children").truncate();
  await knex("children").insert([
    { first_name: "Darwin", last_name: "Madden", hobbies: "chicken-tending" },
    { first_name: "Wallace", last_name: "Madden", hobbies: "music-making" },
    { first_name: "Maxwell", last_name: "Madden", hobbies: "nurturing" },
    { first_name: "Ford", last_name: "Frasier", hobbies: "waddling" },
  ]);
};
