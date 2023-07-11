"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var client = require('../client.js')["default"].client;

var bcrypt = require("bcrypt");

function getAllUsers() {
  var _ref, rows;

  return regeneratorRuntime.async(function getAllUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.query("\n      SELECT * FROM users\n    "));

        case 3:
          _ref = _context.sent;
          rows = _ref.rows;
          return _context.abrupt("return", rows);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          throw _context.t0;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

;

function createUser(_ref2) {
  var username, email, password, hashedPassword, _ref3, _ref3$rows, user;

  return regeneratorRuntime.async(function createUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          username = _ref2.username, email = _ref2.email, password = _ref2.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 3:
          hashedPassword = _context2.sent;
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(client.query("\n      INSERT INTO users (username, email, password)\n      VALUES ($1, $2, $3)\n      RETURNING *;\n  ", [username, email, hashedPassword]));

        case 7:
          _ref3 = _context2.sent;
          _ref3$rows = _slicedToArray(_ref3.rows, 1);
          user = _ref3$rows[0];
          delete user.password;
          return _context2.abrupt("return", user);

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](4);
          throw _context2.t0;

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 14]]);
}

function getUserByEmail(email) {
  var _ref4, _ref4$rows, user;

  return regeneratorRuntime.async(function getUserByEmail$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(client.query("\n      SELECT * FROM users\n      WHERE email = $1\n    ", [email]));

        case 2:
          _ref4 = _context3.sent;
          _ref4$rows = _slicedToArray(_ref4.rows, 1);
          user = _ref4$rows[0];
          return _context3.abrupt("return", user);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function getUserById(id) {
  var _ref5, _ref5$rows, user;

  return regeneratorRuntime.async(function getUserById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(client.query("\n      SELECT * FROM users\n      WHERE id = $1\n    ", [id]));

        case 2:
          _ref5 = _context4.sent;
          _ref5$rows = _slicedToArray(_ref5.rows, 1);
          user = _ref5$rows[0];
          return _context4.abrupt("return", user);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function validateAndGetUser(email, password) {
  var user, hashedPassword, isValid;
  return regeneratorRuntime.async(function validateAndGetUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(getUserByEmail(email));

        case 2:
          user = _context5.sent;

          if (user) {
            _context5.next = 5;
            break;
          }

          throw new Error("Incorrect email or password");

        case 5:
          hashedPassword = user.password;
          _context5.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(password, hashedPassword));

        case 8:
          isValid = _context5.sent;

          if (!isValid) {
            _context5.next = 12;
            break;
          }

          delete user.password;
          return _context5.abrupt("return", user);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function getUserByUsername(username) {
  var _ref6, _ref6$rows, user;

  return regeneratorRuntime.async(function getUserByUsername$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(client.query("\n      SELECT * FROM users\n      WHERE username = $1\n    ", [username]));

        case 2:
          _ref6 = _context6.sent;
          _ref6$rows = _slicedToArray(_ref6.rows, 1);
          user = _ref6$rows[0];
          return _context6.abrupt("return", user);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
}

module.exports = {
  getAllUsers: getAllUsers,
  createUser: createUser,
  getUserByEmail: getUserByEmail,
  validateAndGetUser: validateAndGetUser,
  getUserById: getUserById,
  getUserByUsername: getUserByUsername
};