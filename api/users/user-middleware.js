const Users = require("./users-model.js")

const checkValidUser = async (req,res,next) => {
    const user = req.body
    if (!user.username || user.username.length === 0){
        return res.status(401).json({message:"Invalid username"})
    } else if (!user.password || user.password.length === 0){
        return res.status(401).json({message:"Invalid password"})
    } else {
        if (!user.role || user.role.length === 0){
            req.body.role = "student"
            next()
        } else {
            const role = await Users.findRole(user.role)
            if (!role || role.length === 0){
                return res.status(401).json({message:"Invalid role"})
            } else {
                next()
            }
        }
    }
}

module.exports = {checkValidUser}