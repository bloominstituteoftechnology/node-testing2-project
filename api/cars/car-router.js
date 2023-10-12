const router = require("express").Router();
const Users = require("./users-model.js");



router.get("/", (req, res, next) => { 
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(next);
});


router.get("/:car_id", (req, res, next) => {
  Users.findById(req.params.user_id)
    .then(user => {
      res.json(user);
    })
    .catch(next);
});

module.exports = router;