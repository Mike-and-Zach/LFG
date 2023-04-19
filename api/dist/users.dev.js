"use strict";

var express = require('express');

var router = express.Router();

var jwt = require("jsonwebtoken");

var _require = require("../db/models/user"),
    createUser = _require.createUser,
    getAllUsers = _require.getAllUsers,
    getUserByEmail = _require.getUserByEmail,
    validateAndGetUser = _require.validateAndGetUser,
    getUserByUsername = _require.getUserByUsername;

router.post("/register", function _callee(req, res, next) {
  var userEmailExists, usernameExists, user, token, name, message;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(getUserByEmail(req.body.email));

        case 3:
          userEmailExists = _context.sent;

          if (userEmailExists) {
            next({
              name: "Error signing up",
              message: "that email is already in use"
            });
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(getUserByUsername(req.body.username));

        case 7:
          usernameExists = _context.sent;

          if (usernameExists) {
            next({
              name: "Error signing up",
              message: "That username is already in use"
            });
          }

          if (req.body.password.length < 8) {
            next({
              name: "Error signing up",
              message: "Password must be a least 7 characters"
            });
          }

          _context.next = 12;
          return regeneratorRuntime.awrap(createUser(req.body));

        case 12:
          user = _context.sent;

          if (user) {
            token = jwt.sign({
              id: user.id,
              email: req.body.email
            }, process.env.JWT_SECRET);
            res.send({
              user: user,
              message: "Thank you for signing up!",
              token: token
            });
          }

          _context.next = 21;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          name = _context.t0.name;
          message = _context.t0.message;
          next({
            name: name,
            message: message
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
router.get("/", function _callee2(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getAllUsers());

        case 2:
          users = _context2.sent;
          res.send(users);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post("/login", function _callee3(req, res, next) {
  var _req$body, email, password, user, token, name, message;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;

          if (!email || !password) {
            next({
              name: "Missing CredentialsError",
              message: "Please supply both a username and password"
            });
          }

          _context3.next = 5;
          return regeneratorRuntime.awrap(validateAndGetUser(email, password));

        case 5:
          user = _context3.sent;

          if (user) {
            token = jwt.sign({
              id: user.id,
              email: user.email
            }, process.env.JWT_SECRET);
            res.send({
              message: "You're logged in",
              token: token,
              user: user
            });
          }

          _context3.next = 14;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          name = _context3.t0.name;
          message = _context3.t0.message;
          next({
            name: name,
            message: message
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;