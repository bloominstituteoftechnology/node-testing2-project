const express = require("express")
const router = express.Router()

const db = require("./users-model")
const mw = require("../auth/auth-middleware")


router.get("/api/users", mw.restricted(), async (req, res, next) => {
  try {
    res.json(await db.find())
  } catch(err) {
    next(err)
  }
})

router.get("/api/users/:id", async (req, res, next) => {
  try {
  const user = await db.findById(req.params.id)
    if (!user) {
      res.status(404).json({message: "hobbit not found"})
    }

    res.status(200).json(user)

  } catch(err) {
    next(err)
  }
})
  



module.exports = router