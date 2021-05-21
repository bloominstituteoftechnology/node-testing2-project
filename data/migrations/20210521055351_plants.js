exports.up = function(knex) {
    return knex.schema.createTable('plants', table => {
        table.increments('plant_id')
        table.string('plant_name', 128).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('plants')

};
