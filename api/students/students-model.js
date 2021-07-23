const db = require("../../data/dbConfig")


const createStudent = async (student)=>{
    const [id] = await db("students").insert(student)
    return db("students").where("id", id).first()
}

 async function deleteStudent(id){
    const dStudent = await db("students").where("id",id).first()
    await  db("students").where("id",id).del()
    return dStudent
}

module.exports = {
    createStudent,
    deleteStudent
}