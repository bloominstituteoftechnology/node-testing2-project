const router = require("express").Router();

// Import data model
const Departments = require("./departments-model.js");
const restricted = require("../auth/restricted-middleware.js");

// Write CRUD operations
router.get("/", restricted, (req, res) => {
  Departments.find()
    .then(departments => {
      res.json(departments);
    })
    .catch(err => res.send(err));
});

router.post("/", restricted, (req, res) => {
  let department = req.body;
  Departments.add(department)
    .then(department => {
      res.status(201).json(department);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not add department" });
    });
});

// Export router
module.exports = router;