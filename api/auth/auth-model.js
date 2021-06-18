const db = require("../../data/dbConfig")
const register=async (users)=>{
    console.log(users)
const[id] =await db("users").insert(users)
console.log(id)

 return await db("users").where("id",id)
}
const getUserName=(username)=>{
return db("users").where("username",username)
}
module.exports={
    register,
    getUserName
}