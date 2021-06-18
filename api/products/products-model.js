const db = require("../../data/dbConfig")

const findAll=()=>{
    return db("products")
}

const findById=(id)=>{
return db("products").where("id",id)
}
const insert=async(product)=>{
   const[id]= await db("products").insert(product)
    return await findById(id)
}

const remove=(id)=>{
   return db("products").where("id",id).delete()
}
module.exports={
    findAll,
    findById,
    insert,
    remove
}