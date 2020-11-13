exports.up = async function(knex) {
   await knex.schema.createTable('billy_madison', tbl => {
        tbl
        .increments()
        tbl
        .text('name')
        .notNullable()
        tbl
        .string('quote', 250)
        tbl.
        boolean('funny')
        .default(true)
    })
  };
  
  exports.down = async function(knex) {
   await knex.schema.dropTableIfExists('billy_madison')
  };