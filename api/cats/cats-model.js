// db import
const db = require('../../data/db-config.js')

// function to turn true and false into 1 and 0 for returns
function intToBool(catObj) {
  console.log(catObj);
    if( !catObj ) {
      return catObj;
  } else if(catObj.hairless) {
      catObj.hairless = true;
  } else {
      catObj.hairless = false;
  }
  return catObj;
}

// get all cats
async function getAll() {
  const cats = await db('cats');
  cats.forEach(cat => {
    intToBool(cat);
  })
  return cats;
}

// get cat by id
async function getById(id) {
  let result = await db('cats').where('cat_id', id).first();
  result = intToBool(result);
  console.log(result);
  return result;
}

// add cat to db
async function insert(cat) {
  const [id] = await db('cats').insert(cat);
  return getById(id);
}

// update cat
async function update(id, changes) {
  await db('cats').update(changes).where('cat_id', id);
  return getById(id);
}

// remove cat
async function remove(id) {
  const result = await getById(id);
  await db('cats').where('cat_id', id).del();
  return result;
}

// model exports
module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}