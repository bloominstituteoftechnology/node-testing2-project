require("dotenv").config();

const server = require("./server/server.js");
const port = process.env.PORT || 5000;

server.listen(port, () =>
  console.log(
    `\n server listening at port ${port} using environment: ${process.env.DB_ENV} \n`
  )
);
