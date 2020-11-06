const db = require('./dbConfig.js');

  module.exports = {
   insert,
   update,
   remove,
   getAll,
   findById,
 };

  async function insert(data) {
   return db("legitdata")
   .insert(data, "id")
   .then(ids=>{
       return findById(ids[0])
   })
 }

  async function update(id, changes) {
   return null;
 }

  function remove(id) {
   return db("legitdata").where({id}).del()
   .then(res=>{
       return getAll();
   })
 }

  function getAll() {
   return db('legitdata');
 }

  function findById(id) {
   return db('legitdata').where({id: id}).first();
 }