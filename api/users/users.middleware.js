const db = require("../../database/db-config");


const validateId = async (req,res,next) => {
    try {
        const result = await db("users").where("id",req.params.id).first();
        if (!result) next({status : 404, message : "id does not exist"})
        next();  
    } catch (err) {next(err)}
}

const validatePost = async(req,res,next) => {
    try {
        const {name,married} = req.body;
        if (!name || !married) next({status : 422, message : "need name and married status"});
        next(); 
    } catch (err) {next(err)}
}
const validatePut = async(req,res,next) => {
    try {
        const {name,married} = req.body;
        const {id} = req.params;
        if (!name || !married || !id) next({status : 422, message : "need name, id, and married status"});
        next(); 
    } catch (err) {next(err)}
}

module.exports = {
    validateId,
    validatePost,
    validatePut,
}