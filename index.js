const server = require('./api/server.js');

// const PORT = process.env.PORT || 9000;
const { PORT } = require('./api/secrets')

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

const db = require('./database/db-config')

async function findById(role_name) {
  /**
    You will need to join two tables.
    Resolves to the user with the given user_id.

    {
      "user_id": 2,
      "username": "sue",
      "role_name": "instructor"
    }
   */
    const query = await db('roles')
    .insert({ role_name: role_name })
      console.log(query)
}


// findById('tester')