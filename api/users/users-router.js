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
  



module.exports = router