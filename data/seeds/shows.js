exports.seed = function(knex) {
    return knex('shows').truncate()
        .then(function () {
            return knex('shows').insert([
                { show_name: 'Criminal Minds', streaming_service: 'Hulu' },
                { show_name: 'Handmades Tale', streaming_service: 'Hulu' },
                { show_name: 'Reacher', streaming_service: 'Prime' },
                { show_name: 'For All Mankind', streaming_service: 'Apple' },
                { show_name: 'The Last of Us', streaming_service: 'Max' },
            ])
        })
}