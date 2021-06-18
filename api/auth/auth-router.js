const express = require("express")
const auth = express.Router()
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../secrets");
const Amodel=require("./auth-model")
const bcrypt = require("bcrypt")


auth.post("/register",async (req, res, next) => {
    const { username, password } = req.body
    const hash =await  bcrypt.hash(password, 8)
    Amodel.register({username,password:hash})
    .then((user)=>{
        const [resp] = user
        res.status(201).json(resp)
    })

.catch(next)
})

auth.post("/login",async (req, res, next) => {
    const { username, password } = req.body
    const [dbUser] = await Amodel.getUserName(username)
    const dbPassword= dbUser.password
    const compare = bcrypt.compareSync(password, dbPassword)
    if (compare === true) {
        const token = buildToken(req.body)
        res.json({
            message: `${username} is back`,
            token
        })
    }
    else {
        res.status(401).json({ message: "invalid credentials" })
    }

})


const buildToken = (user) => {
    const payload = {
        subject: user.username,
        username: user.username
    }
    const options = {
        expiresIn: "1d"
    }
    return jwt.sign(payload, JWT_SECRET, options)
}
module.exports = auth