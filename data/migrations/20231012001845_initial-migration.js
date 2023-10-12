exports.up = function(knex) {
    return knex.schema
        .createTable('genere', genere => {
            genere.increments('genere_id')
            genere.string('genere_name', 50).notNullable().unique()
        })
        .createTable('videogames', videogames => {
            videogames.increments('vg_id')
            videogames.string('vg_name', 50).notNullable()
            videogames.integer('vg_year')
                .unsigned()
                .notNullable()
            videogames.integer('vg_rating')
                .unsigned()
            videogames.integer('genere_id')
                .unsigned()
                .notNullable()
                .references('genere_id')
                .inTable('genere')
                .onUpdate('RESTRICT')
                .onDelete('RESTRICT')
        })

};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('videogames')
        .dropTableIfExists('genere')

};
