"use strict";

// inside db/index.js
var _require = require('pg'),
    Client = _require.Client; // imports the pg module
// supply the db name and location of the database


var client = new Client('postgres://localhost:5432/lfg'); // const client =  new Client({connectionString: "postgresql://MichaelMcEwing:v2_437m2_ZNLV5NpSCyQxAD8ri6Qw2Xp@db.bit.io:5432/MichaelMcEwing/lfgv2", ssl: true})

module.exports = {
  client: client
};