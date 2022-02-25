/* Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength` 
middleware functions from `auth-middleware.js`. You will need them here! */
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
} = require("./auth-middleware");
const users = require("../users/users-model");

/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */
router.post(
  "/register",
  // checkUsernameFree,
  checkPasswordLength,
  async (req, res, next) => {
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 13);
    newUser.password = hash;
    await users
      .add(newUser)
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => {
        next(err);
      });
  }
);

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */
router.post("/login", checkUsernameExists, (req, res, next) => {
  bcrypt.compareSync(req.body.password, req.user.password)
    ? (req.session.user = req.user)
    : next({ status: 401, message: "Invalid credentials" });
  res.json(`Welcome ${req.user.username}!`);
});

/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */
router.get("/logout", (req, res, next) => {
  req.session
    ? req.session.destroy((err) => {
        err != null
          ? next({ status: 200, message: "no session" })
          : next({ status: 200, message: "logged out" });
      })
    : req.end();
});

// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;
