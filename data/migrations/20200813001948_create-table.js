exports.up = function (knex) {
  return knex.schema.createTable('cubs', (tbl) => {
    tbl.increments();
    tbl.string('name', 128).notNullable();
    tbl.string('position', 128).notNullable();
    tbl.integer('number').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cubs');
};
