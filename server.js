const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const UsersRouter = require("./users/users-router.js");
const AuthRouter = require("./auth/auth-router.js");
const PositionsRouter = require("./positions/positions-router.js");
const DepartmentsRouter = require("./departments/departments-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", UsersRouter);
server.use("/api/auth", AuthRouter);
server.use("/api/positions", PositionsRouter);
server.use("/api/departments", DepartmentsRouter);

server.get("/", (req, res) => {
  res.send("Its aliiiiive!");
});

module.exports = server;