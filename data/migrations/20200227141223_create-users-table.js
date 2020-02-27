
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
    users.increments();
    
    users
        .string('name')
        .notNullable()
        .unique()
        .index();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
