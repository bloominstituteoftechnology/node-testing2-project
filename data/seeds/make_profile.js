exports.seed = async function (knex) {
  // Truncating a table deletes ALL existing entries and resets the primary keys
  await knex('profile').truncate()
  await knex('profile').insert([
    { Name: "Reed Richards", Abilities: "Mr_Fantastic" },
    { Name: "Susan Storm", Abilities: "Invisible_Girl" },
    { Name: "Johnny Storm", Abilities: "Human_Torch" },
    { Name: "Ben Grim", Abilities: "Body_Builder" },
  ]);
}