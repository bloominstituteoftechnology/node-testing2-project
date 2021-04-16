const server = require("./server");

const PORT = process.env.PORT || 5800;

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
}) 