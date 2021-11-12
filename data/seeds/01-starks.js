const starks = [
  { name: 'Jon Snow'},
  { name: 'Rob Stark'},
  { name: 'Sansa Stark'},
  { name: 'Aria Stark'},
  { name: 'Bran Stark'},
  { name: 'Rickon Stark'}
]

exports.seed = function(knex, Promise) {
  return knex('starks')
    .truncate()
    .then(function() {
      return knex('starks').insert(starks)
    })
}

exports.starks = starks
