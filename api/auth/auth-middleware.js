const db = require("../users/users-model")


function restricted() {
  return async (req, res, next) => {
    try {
      if (!req.session || !req.session.user) {
        return res.status(401).json({message: "You shall not pass!"})
      }
      next()
    } catch (err) {
        next(err)
    }
  }
}


function checkUsernameFree() {
  return async (req, res, next) => {
    const { username } = req.body
    const usernameTaken = await db.findBy({username}).first()
      if (usernameTaken) {
        return res.status(402).json({message: "Username taken"})
        
      } else {
        next()
      }
    }
}


function checkUsernameExists() {
  return async (req, res, next) => {
    const { username } = req.body
    const usernameExists = await db.findBy({username})
      if (usernameExists) {
        req.usernameExists = usernameExists
        next()
      } else {
        return res.status(401).json({message: "Invalid credentials"})
      }
    }
}


function checkPasswordLength() {
  return (req, res, next) => {
    
      if (req.body.password.length < 4 || !req.body.password) {
        return res.status(422).json({message: "Password must be longer than 3 chars and must be included"})
      } else {
        next()
      }
    }
}


module.exports = {restricted, checkUsernameFree, checkUsernameExists, checkPasswordLength}