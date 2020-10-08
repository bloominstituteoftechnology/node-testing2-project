exports.up = async function(knex) {
    await knex.schema.createTable('spells', (table) => {
        table.increments('id');
        table.text('name', 128).notNull().unique();
        table.integer('level').notNull();
        table.integer('school').notNull();
        table.integer('class').notNull();
        table.text('castingTime', 128);
        table.boolean('ritual').defaultTo(false);
        table.boolean('concentration').defaultTo(false);
        table.text('wikiPage');
    });
  };
  
  exports.down = async function(knex) {
      await knex.schema.dropTableIfExists("spells");
  };