"use strict";

var express = require("express");

var _require = require("../db/models/inbox"),
    sendDirectMessage = _require.sendDirectMessage,
    getUserInboxById = _require.getUserInboxById;

var router = express.Router();
router.get("/user_inbox", function _callee(req, res, next) {
  var userId, inbox, name, message;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          _context.next = 4;
          return regeneratorRuntime.awrap(getUserInboxById(userId));

        case 4:
          inbox = _context.sent;
          res.send(inbox);
          _context.next = 13;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          name = _context.t0.name;
          message = _context.t0.message;
          next({
            name: name,
            message: message
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post("/:recipientId", function _callee2(req, res, next) {
  var recipientId, senderId, sender_username, _req$body, message_text, recipient_username, directMessage, name, message;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          recipientId = req.params.recipientId;
          senderId = req.user.id;
          sender_username = req.user.username;
          _req$body = req.body, message_text = _req$body.message_text, recipient_username = _req$body.recipient_username;
          _context2.next = 7;
          return regeneratorRuntime.awrap(sendDirectMessage(senderId, sender_username, recipient_username, recipientId, message_text));

        case 7:
          directMessage = _context2.sent;
          res.send(directMessage);
          _context2.next = 16;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          name = _context2.t0.name;
          message = _context2.t0.message;
          next({
            name: name,
            message: message
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
module.exports = router;