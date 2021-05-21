exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('plants').truncate()
  
  // Inserts seed entries
  await knex('plants').insert([
    {plant_name: 'rose'},
    {plant_name: 'daisy'},
    {plant_name: 'sunflower'}
  ]);
  
};
