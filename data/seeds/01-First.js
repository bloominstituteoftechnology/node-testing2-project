/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(()=>{
      return knex('users').insert([
        {
          username:'Eric'
        },
        {
          username:'Kursed'
        }
      ])
    })
};
