/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('babyNames').insert([
    {
      name: 'Jake',
      gender: 'male'
    },
    {
      name: 'Ben',
      gender: 'male'
    },
    {
      name: 'Brad',
      gender: 'male'
    },
    {
      name: 'Craig',
      gender: 'male'
    },
    {
      name: 'Tyler',
      gender: 'male'
    },
    {
      name: 'Zach',
      gender: 'male'
    },
    {
      name: 'Andrew',
      gender: 'male'
    },
    {
      name: 'Heather',
      gender: 'female'
    },
    {
      name: 'Katie',
      gender: 'female'
    },
    {
      name: 'Cristy',
      gender: 'female'
    },
    {
      name: 'Cindy',
      gender: 'female'
    },
    {
      name: 'Cathy',
      gender: 'female'
    },
  ])
};
