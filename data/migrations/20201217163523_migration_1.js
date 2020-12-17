exports.up = function(knex) {
    return knex.schema.createTable('Authors',(table)=>{
      table.increments('id'),
      table.string('name').unique().index()
    })
  };
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Authors')
  };