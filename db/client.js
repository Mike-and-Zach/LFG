// inside db/index.js
const { Client } = require('pg'); // imports the pg module

// supply the db name and location of the database
// const client = new Client('postgres://localhost:5432/lfg');

const client =  new Client({connectionString: "postgresql://MichaelMcEwing:v2_437m2_ZNLV5NpSCyQxAD8ri6Qw2Xp@db.bit.io:5432/MichaelMcEwing/lfgv2", ssl: true})


module.exports = {
  client
}
