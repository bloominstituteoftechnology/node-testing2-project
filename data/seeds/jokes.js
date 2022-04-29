exports.seed = function(knex) {
    return knex('jokes').truncate()
        .then(() => {
            return knex('jokes').insert([
                {
                    joke: 'What do you call a fake noodle?',
                    punchline: 'An Impasta!',
                }
            ]);
        });
}