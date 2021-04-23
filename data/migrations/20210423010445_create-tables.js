exports.up = function (knex) {
  return knex.schema
    .createTable('artists', (tbl) => {
      tbl.increments('artist_id');
      tbl.string('artist_name', 128).notNullable();
    })
    .createTable('genres', (tbl) => {
      tbl.increments('genre_id');
      tbl.string('genre', 128).notNullable();
    })
    .createTable('tunes', (tbl) => {
      tbl.increments('tune_id');
      tbl.string('tune_name', 128).notNullable();
      tbl
        .integer('artist_id')
        .unsigned()
        .notNullable()
        .references('artist_id')
        .inTable('artists')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    })
    .createTable('albums', (tbl) => {
      tbl.increments('album_id');
      tbl.string('album_name', 128).notNullable();
      tbl
        .integer('artist_id')
        .unsigned()
        .notNullable()
        .references('artist_id')
        .inTable('artists')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      tbl
        .integer('genre_id')
        .unsigned()
        .notNullable()
        .references('genre_id')
        .inTable('genres')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('albums')
    .dropTableIfExists('tunes')
    .dropTableIfExists('genres')
    .dropTableIfExists('artists');
};
