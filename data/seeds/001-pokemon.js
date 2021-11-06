exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries and resets ids
    return knex('pokemon')
        .truncate()
        .then(function () {
            return knex('pokemon').insert([
                { name: 'pikachu' },
                { name: 'squirtle' },
                { name: 'charmander' },
                { name: 'bolbasor' },
            ]);
        });
};
