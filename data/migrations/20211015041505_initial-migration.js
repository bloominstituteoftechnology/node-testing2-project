
exports.up = async function(knex) {
  
    await knex.schema

    .createTable('quotes', table => {

        table.increments('id')

        table.text('quote').notNullable()

        table.text('author')
    })
};

exports.down = async  function(knex) {
  
    await knex.schema

    .dropTableIfExists('quotes')
};
