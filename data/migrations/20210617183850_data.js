
exports.up = function(knex) {
  return knex.schema.createTable('users',function(table){
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable()
  })
  .createTable("products",(table)=>{
      table.increments("id").primary()
      table.string("product_name").notNullable().unique()
      table.string("product_description").notNullable()
      table.string("price").notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
  .dropTableIfExists("products")

};
