
exports.up = function(knex) {
   return knex.schema.createTable('resources', tbl => {
      tbl.increments('resource_id')
      tbl.string('name').unique().notNullable()
   })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('resources')
};
