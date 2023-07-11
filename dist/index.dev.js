"use strict";

// This is the Web Server
require("dotenv").config();

var express = require('express');

var server = express(); // enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env

var cors = require('cors');

server.use(cors()); // create logs for everything

var morgan = require('morgan');

server.use(morgan('dev')); // handle application/json requests

server.use(express.json()); // here's our static files

var path = require('path');

server.use(express["static"](path.join(__dirname, 'build'))); // here's our API

server.use('/api', require('./api')); // by default serve up the react app if we don't recognize the route

server.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
}); // bring in the DB connection

var _require = require('./db'),
    client = _require.client; // connect to the server


var PORT = process.env.PORT || 4000;
server.use(function (error, req, res, next) {
  res.send({
    error: error.message,
    name: error.name,
    message: error.message
  });
}); // define a server handle to close open tcp connection after unit tests have run

var handle = server.listen(PORT, function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("Server is running on ".concat(PORT, "!"));
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(client.connect());

        case 4:
          console.log('Database is open for business!');
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.error('Database is closed for repairs!\n', _context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); // export server and handle for routes/*.test.js

module.exports = {
  server: server,
  handle: handle
};