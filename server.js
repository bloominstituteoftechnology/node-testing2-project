const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//const authRouter = require("./auth/auth-router.js");

const server = express();

const Users = require("./users/users-model.js");

// middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// routes


server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.get("/users", (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

server.post("/register", (req, res) => {

  let user = req.body;

  Users.add(user)
  .then(saved => {
    res.status(201).json(saved);
  })
  .catch(({message, stack}) => {
    res.status(500).json({message});
  })
})

server.delete("/users/:id", validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then(user => {
      res.status(200).json({message: "user deleted"})
    })
    .catch(err => {
      res.status(500).json({error: "message"})
    })
});

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      if(!user){
        res.status(400).json({ message: "invalid user id" })
      } else {
        req.user = user;
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "internal server error" })
    })
}



module.exports = server;