
exports.up = async function(knex) {
    return await knex.schema.createTable('users', tbl=>{
        tbl.increments('id');
        tbl.text('username')
        .unique();
        tbl.text('password');
        tbl.text('department')
            .defaultTo('Hosting');
    })
};

exports.down = async function(knex) {
  return await knex.schema.dropTableIfExists('users');
};
