const jwt = require("jsonwebtoken");

const secrets = require("../config/secret");
// const bcrypt = require('bcryptjs');

// const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  // check that token is valid
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: "shall not pass" });
      } else {
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "user be logged in to do that!" });
  }
};