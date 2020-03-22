
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Josh',password:"Kleeg", char_name:"Varian Halai", race:"High Elf", class:'Fighter', str_mod: 2 },
        {id: 2, username: 'Anthony',password:"Kleeg", char_name:"Borgis", race:"Human", class:'Rogue', str_mod: 2 }
       
      ]);
    });
};
