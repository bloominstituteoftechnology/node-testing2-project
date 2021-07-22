
exports.up = function(knex) {
    return knex.schema.createTable('ipsource', table => {
        table.increments('sourceID');
        table.text('sourcename', 128).notNullable();
        table.unique('sourcename');
    })    
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('ipsource');  
};
