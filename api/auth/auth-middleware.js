const { JWT_SECRET } = require("../secrets"); // use this secret!
const jwt = require("jsonwebtoken")

const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.status(401).json({ message: "Token required" })
    }
    else {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                next({ status: 401, message: "token invalid" })
            }
            else {
                req.decodedToken = decodedToken
                next()
            }
        })
    }
}
module.exports={
    restricted
}