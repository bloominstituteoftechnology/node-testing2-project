exports.up = function(knex) {
  return knex.schema.createTable('anime_girls', tbl => {
    tbl.increments();
    
    tbl.string('name', 255).unique().notNullable();
  })
};

exports.down = function(knex) {
  //undo the operation in up
  return knex.schema.dropTableIfExists('anime_girls');
};
