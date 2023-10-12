const db = require('../../data/db-config.js');

function get() {

  return db('cars')
  
}



function findById(car_id) { 
  return db('cars')
  .where('car_id', car_id)
  .first();

}


async function add(car) {
  const [car_id] = await db('cars').insert(car);
  return findById(car_id);
}

module.exports = {
  add,
  get,
  findById,
};