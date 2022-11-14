exports.seed = function(knex) {
    return knex('users')
        .truncate()
        .then(function() {
            return knex('users').insert([
                { name: 'sara' },
                { name: 'john' },
                { name: 'andy' }
            ])
        })
}