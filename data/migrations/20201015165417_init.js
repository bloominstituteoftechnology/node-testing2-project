
exports.up = function(knex) {
  return knex.schema.createTable('Philosophers',(table)=>{
    table.increments('id'),
    table.string('name').unique().index()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Philosophers')
};
