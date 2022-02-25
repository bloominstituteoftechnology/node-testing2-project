exports.seed = function(knex) {
    return knex('streamers')
        .truncate()
            .then(function () {
                return knex('streamers').insert([
                    {name: 'Yourragegaming', affiliation: 'YRG'},
                    {name: 'Brucedropemoff', affiliation: 'DEO'},
                    {name: 'Kai Cenat', affiliation: 'AMP'}
                ]);
            });
};