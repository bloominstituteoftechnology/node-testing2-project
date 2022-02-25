const users = require("../users/users-model");

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted(req, res, next) {
  if(!req.session.user) {
    next({ status: 401, message: "You shall not pass!" });
  }
  else {next()};
}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
function checkUsernameFree(req, res, next) {
  users.findBy({ username: req.user.username }).first() != null
    ? next({ status: 422, message: "Username taken" })
    : next();
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
async function checkUsernameExists(req, res, next) {
  const user = await users.findBy({ username: req.user.username }).first();
  user === null
    ? next({ status: 401, message: "Invalid credentials" })
    : (req.user = user);
  next();
}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {
  !req.body.password || req.body.password.length < 4
    ? next({ status: 422, message: "Password must be longer than 3 chars" })
    : next();
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
};
