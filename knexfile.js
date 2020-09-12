// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/spells.db3'
    }, 
    useNullAsDefault: true
  }

};
