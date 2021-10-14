exports.seed = async function (knex) {
  await knex("games").insert([
    {
      game_name: "betrayal at house on the hill",
      max_players: 6,
    },
    {
      game_name: "chess",
      max_players: 2,
    },
    {
      game_name: "solitaire",
    },
    {
      game_name: "small world",
      max_players: 5,
    },
    {
      game_name: "bang",
      max_players: 8,
    },
  ]);
}