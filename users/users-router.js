const router = require("express").Router();

// Import data model
const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

// Write CRUD operations
router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      console.log(users);
      res.json(users);
    })
    .catch(err => res.send(err));
});

// Export router
module.exports = router;