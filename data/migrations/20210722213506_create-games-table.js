
exports.up = function(knex) {
  return knex.schema
    .createTable('games', table => {
        table.increments('game_id')
        table.text('game_title')
        table.text('game_genre')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('games')
};
