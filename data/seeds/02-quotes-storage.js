exports.seed = function(knex) {
    return knex('quotes').truncate()
    .then(function () {
        return knex('quotes').insert([
           {quote: "When you reach the end of your rope, tie a knot in it and hang on", author: "Franklin D. Roosevelt"},
           {quote: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin"},
           {quote: "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid.", author: "Albert Einstein"},
           {quote: "A life spent making mistakes is not only more honorable, but more useful than a life spent doing nothing.", author: "George Bernhard Shaw" }
        ])
    })
}