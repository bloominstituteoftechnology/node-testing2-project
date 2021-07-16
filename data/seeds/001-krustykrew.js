exports.seed = function(knex, Promise){
    return knex('krustykrew')
    .truncate()
    .then(function(){
        return knex('krustykrew').insert([
            {name:'Spongebob'},
            {name:'Squidward'},
            {name:'Mr.Krabs'},
            {name:'Patrick'}
        ])
    })
}