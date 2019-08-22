const server = require("./server");

const port = process.env.PORT || 9111;

server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
