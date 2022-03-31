const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets"); // use this secret!
const User = require("../users/users-model");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedJwt) => {
      if (err) {
        next({ status: 401, message: "Token invalid" });
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    });
  } else {
    next({ status: 401, message: "Token required" });
  }
};

const only = (role_name) => (req, res, next) => {
  if (req.decodedJwt && req.decodedJwt.role_name === role_name) {
    next();
  } else {
    next({ status: 403, message: "This is not for you" });
  }
};

const checkIfUsernameExists = async (req, res, next) => {
  try {
    let user = await User.findBy({ username: req.body.username });

    if (!user) {
      next({ status: 401, message: "Invalid Login Info" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

async function checkIfUsernameFree(req, res, next) {
  let [user] = await User.findBy({ username: req.body.username });
  if (user != null) {
    next({ status: 422, message: "Username taken" });
  } else {
    next();
  }
}

const validateRoleName = (req, res, next) => {
  let user = req.body;

  if (!user.role_name || user.role_name.trim() == "") {
    user.role_name = "student";
  }
  if (user.role_name.trim() === "teacher") {
    res.status(422).json({ message: "Role name can not be teacher" });
  } else if (user.role_name.trim().length > 32) {
    res.status(422).json({
      message: "Role name can not be longer than 32 chars",
    });
  } else {
    req.role_name = user.role_name.trim();
    next();
  }
};

module.exports = {
  restricted,
  checkIfUsernameFree,
  checkIfUsernameExists,
  validateRoleName,
  only,
};
