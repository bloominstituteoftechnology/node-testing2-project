exports.up = function (knex) {
  return knex.schema.createTable("games", (games) => {
    games.increments("game_id");
    games.string("game_name", 64).notNullable().unique();
    games.integer("max_players");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("games");
};
