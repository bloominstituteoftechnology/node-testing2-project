exports.seed = function(knex) {
    return knex('seed').truncate()
        .then(function() {
            return knex('seed').insert([
                {stoic: 'Life thy life thy art, thy soul thy soul art, thy spirit thy spirit art.'},
                {stoic: 'The world is a book, and those who do not travel read only a page.'},
                {stoic: 'A wise man once lived'},
            ])
        })
}
