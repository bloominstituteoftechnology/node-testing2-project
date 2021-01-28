require("dotenv").config();

const server = require("./api/server");

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`doing that one thang on ${port}`);
});
