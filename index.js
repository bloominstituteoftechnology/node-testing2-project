const app = require('./api/server'); // Adjust the path based on your file structure

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});