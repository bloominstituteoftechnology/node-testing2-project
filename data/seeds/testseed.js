exports.seed = function(knex) {
    return knex('tests').truncate()
    .then(function () {
        return knex('tests').insert([
            {name: 'rihan', lastname: 'hailemichael'},
            {name: 'arsiema', lastname: 'hailemichael'}
        ])
    })
}

//this is not working // make sure to revise how seeds work 