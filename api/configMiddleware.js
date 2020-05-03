const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const MiddleWares = [express.json(), helmet(), cors()];

module.exports = (server) => {
  server.use(MiddleWares);
};
