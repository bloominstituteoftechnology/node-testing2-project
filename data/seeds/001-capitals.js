exports.seed = function(knex, Promise) {
    return knex('capitals')
        .truncate()
        .then(function() {
            return knex('capitals').insert([
                {city: 'Paris', country: 'France'},
                {city: 'Madrid', country: 'Spain'},
                {city: 'Ottawa', country: 'Canada'},
                {city: 'Washington DC', country: 'USA'},
                {city: 'Dublin', country: 'Ireland'}
            ])
        })
}