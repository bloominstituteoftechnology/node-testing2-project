const db = require("../data/db-config.js");

module.exports = {
    insert,
    getAll
}


 async function insert(character) {
     try{
         const [id] = await db("characters").insert(character)
         return db("characters").where({ id }).first()
     }
     catch(error){
         console.log('insert failed')
     }
  }

function getAll(){
    return db("characters");
}