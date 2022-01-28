/**
  Fix this module so other modules can require JWT_SECRET into them.
  Use the || operator to fall back to the string "shh" to handle the situation
  where the process.env does not have JWT_SECRET.

  If no fallback is provided, TESTS WON'T WORK and other
  developers cloning this repo won't be able to run the project as is.
 */
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || "shh"

function tokenMaker(user){
  const payload = {
    subject: user.user_id,
    username: user.username,
    role_name:user.role_name 
  }
  const options = {
    expiresIn: '1d'
  }
  const token = jwt.sign(payload,JWT_SECRET,options)
  
  return token
}

module.exports = {
  tokenMaker,
   JWT_SECRET
}
