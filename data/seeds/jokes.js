exports.seed = function(knex) {
    return knex('jokes').truncate()
        .then(function () {
            return knex('jokes').insert([
                {joke: 'Not funny1', punchline: 'lolnevermind it is funny1'},
                {joke: 'Not funny2', punchline: 'lolnevermind it is funny2'},
                {joke: 'Not funny3', punchline: 'lolnevermind it is funny3'},
                {joke: 'Not funny4', punchline: 'lolnevermind it is funny4'},
                {joke: 'Not funny5', punchline: 'lolnevermind it is funny5'},
                {joke: 'Not funny6', punchline: 'lolnevermind it is funny6'},
                {joke: 'Not funny7', punchline: 'lolnevermind it is funny7'},
                {joke: 'Not funny8', punchline: 'lolnevermind it is funny8'},
            ])
        })
}
        


            