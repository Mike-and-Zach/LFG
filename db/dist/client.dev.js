"use strict";

// inside db/index.js
var _require = require('pg'),
    Client = _require.Client; // imports the pg module
// supply the db name and location of the database
// const client = new Client('postgres://localhost:5432/lfg');


var client = new Client({
  connectionString: "postgres://imlfg_user:r4BXWMuvamTWL8izpzLC2qUfa8HajBnz@dpg-cimam2unqqldjqj3vdag-a.oregon-postgres.render.com/imlfg",
  ssl: true
});
module.exports = {
  client: client
};