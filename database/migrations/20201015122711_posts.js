
exports.up = function(knex) {
    return knex.schema
    .createTable('posts', tbl => {
        tbl.increments()
        tbl.text('post_title')
            .notNullable()
        tbl.text('post_category')
            .notNullable()
        tbl.text('post_author')
            .notNullable()
        tbl.integer('rating')
            .unsigned()
            .notNullable()
        tbl.text('post_text')
            .notNullable()
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("posts");
};
