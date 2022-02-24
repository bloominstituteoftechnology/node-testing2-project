exports.seed = async function (knex) {
  // Truncating a table deletes ALL existing entries and resets the primary keys
  await knex('profile').truncate()
  await knex('profile').insert([
    { Name: "Barry West Allen", Abilities: "The Flash"},
    { Name: "Caitlin Snow", Abilities: "Killer Frost"},
    { Name: "Cisco Ramon", Abilities: "Vibe"},
    { Name: "Ralph Dibny", Abilities: "Elongated Man"},
    { Name: "Eobard Thawne", Abilities: "Reverse Flash"},
  ]);
}