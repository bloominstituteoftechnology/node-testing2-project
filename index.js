const server = require("./api/server");

const PORT = process.env.PORT || 6000;

server.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
