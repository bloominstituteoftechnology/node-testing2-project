
exports.seed = function(knex) {

  return knex('billy_madison').del()
    .then(function () {
    
      return knex('billy_madison').insert([
        {id: 1, name: 'Billy Madison', quote: 'Goooo!', funny: 'true'},
        {id: 1, name: 'Billy Madison', quote: 'Stop looking at me swan!', funny: 'true'},
        {id: 1, name: 'Bradley Whitford', quote: 'WELL ‘SORRY’ DOESN’T PUT THE TRISCUIT CRACKERS IN MY STOMACH, NOW DOES IT, CARL?', funny: 'true'},
        {id: 1, name: 'Frank', quote: 'When I graduated from first grade, all my dad did was tell me to get a job.', funny: 'true'},
      ])
    })
}