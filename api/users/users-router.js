const router = require("express").Router()

const User = require("./users-model")

router.get("/",  (req, res, next) => {
    User.find()
      .then(users => {
        res.json(users)
      })
      .catch(next) // our custom err handling middleware in server.js will trap this
  })

router.post("/s", async (req, res) => {
   res.status(201).json(await User.add(req.body))
});  

module.exports = router