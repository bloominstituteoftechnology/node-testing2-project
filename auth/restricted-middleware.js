const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("./secrets.js");

module.exports = (req, res, next) => {
  try {
    let token = "";
    if (req.headers.authorization) {
      const bearer = req.headers.authorization.split(" ")[0];
      if (bearer === "bearer") {
        token = req.headers.authorization.split(" ")[1];
      } else {
        token = req.headers.authorization;
      }
    }

    if (token) {
      jwt.verify(token, secrets.jwt_secret, (err, decodedToken) => {
        if (err) {
          throw new Error("err");
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      throw new Error("You shall not pass!");
    }
  } catch (err) {
    res.status(401).json(err.message);
  }
};
