"use strict";

// inside db/index.js
var _require = require('pg'),
    Client = _require.Client; // imports the pg module
// supply the db name and location of the database
// const client = new Client('postgres://localhost:5432/lfg');


var client = new Client({
  connectionString: "postgresql://michael:GuI7rMgSGkrDYqXOmEMaiA@imlfgg-2873.g95.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full",
  ssl: true
});
module.exports = {
  client: client
};