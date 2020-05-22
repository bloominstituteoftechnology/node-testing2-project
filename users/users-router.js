const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

const { isValid } = require("./users-service");

router.use(restricted);

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ users, jwt: req.jwt });
    })
    .catch((err) => res.send(err));
});

router.post("/", checkRoles(["admin"]), (req, res) => {
  const user = req.body;

  if (isValid(user)) {
    Users.add(user)
      .then((saved) => {
        res.status(201).json({ data: saved });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({ message: "please provide all user information" });
  }
});

router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((users) => {
      res.status(200).json({ message: "delete sucessfully" });
    })
    .catch((err) => res.send(err));
});

function checkRoles(roles) {
  return function (req, res, next) {
    const role = req.jwt.role;

    if (req.jwt && req.jwt.role && roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ you: "have no power here" });
    }
  };
}

module.exports = router;
