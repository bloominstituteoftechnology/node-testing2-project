
exports.up = function (knex) {
    return knex.schema
        .createTable("jokes", (jokes) => {
            jokes.increments("id");
            jokes.string("joke_question", 2048).notNullable().unique()
            jokes.string("joke_answer", 2048).notNullable()
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("jokes")
};
