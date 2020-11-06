
  exports.up = function(knex) {
    return knex.schema.createTable("legitdata", tbl=>{
        tbl.increments();
        tbl.string("dataValue1", 255).notNullable();
        tbl.string("dataValue2", 255).notNullable();
    })

 };

 exports.down = function(knex) {
  return knex.schema.dropTableIfExists("legitdata");
};