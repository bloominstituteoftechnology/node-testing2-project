const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()

const db = require("../users/users-model")
const mw = require("./auth-middleware")


router.post("/api/auth/register", mw.checkUsernameFree(), mw.checkPasswordLength(), async (req, res, next) => {
try {
  const { username, password } = req.body
  const registerUser = await db.add({
    username,
    password: await bcrypt.hash(password, 14),
  })
    if (registerUser) {
      res.status(200).json(registerUser)
  
  } else {
      res.status(401).json({message: "Unable to register user"})
  }
  } catch(err) {
    next(err)
  }
})


router.post("/api/auth/login", mw.checkPasswordLength(), mw.checkUsernameExists(), async (req, res, next) => {
try {
  const { username, password } = req.body
  const user = await db.findBy({username}).first()
  const passwordValid = await bcrypt.compare(password, user.password)
    if (passwordValid) {
      req.session.user = user
      res.status(200).json({message: `Welcome ${user.username}`})
    
    } else {
      return res.status(401).json({message: "Invalid Credentials"})
    }

  } catch(err) {
    next(err)
  }
})


router.get("/api/auth/logout", async (req, res, next) => {
try {
  if (!req.session || !req.session.user) {
    return res.status(200).json({message: "no session"})
  } else {
      req.session.destroy(err => {
        if (err) {
          next(err)
        } else {
          res.status(200).json({message: "logged out!"})
        }}
      )}
      } catch(err) {
        next(err)
    }
})


router.delete("/api/delete/:id", (req, res) => {
  db.removeUser(req.params.id)
  .then(success => {
    if (success) {
      res.status(200).json({ message: "The user has been removed"})
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist"})
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "The user could not be removed"})
  })
})
  
 

module.exports = router