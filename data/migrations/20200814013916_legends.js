
exports.up = function(knex) {
  return (
    knex.schema
        .createTable('legends', tbl => {
            tbl.increments();
            tbl.string('character', 255)
                .notNullable();
        })
  );
};

exports.down = function(knex) {
  return (
      knex.schema
        .dropTableIfExists('legends')
  );
};
