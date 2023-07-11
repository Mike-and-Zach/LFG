"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var client = require("../client")["default"].client;

function getUserInboxById(userId) {
  var _ref, rows;

  return regeneratorRuntime.async(function getUserInboxById$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(client.query("\n        SELECT * FROM direct_messages\n        WHERE recipient_id = $1\n    ", [userId]));

        case 2:
          _ref = _context.sent;
          rows = _ref.rows;
          return _context.abrupt("return", rows);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function sendDirectMessage(senderId, senderUsername, recipientUsername, recipientId, messageText) {
  var _ref2, _ref2$rows, message;

  return regeneratorRuntime.async(function sendDirectMessage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(client.query("\n        INSERT INTO direct_messages(sender_id, sender_username, recipient_username, recipient_id, message_text)\n        VALUES($1, $2, $3, $4, $5)\n        RETURNING *;\n    ", [senderId, senderUsername, recipientUsername, recipientId, messageText]));

        case 2:
          _ref2 = _context2.sent;
          _ref2$rows = _slicedToArray(_ref2.rows, 1);
          message = _ref2$rows[0];
          return _context2.abrupt("return", message);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  getUserInboxById: getUserInboxById,
  sendDirectMessage: sendDirectMessage
};