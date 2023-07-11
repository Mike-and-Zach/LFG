"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var client = require("../client")["default"].client;

function getCommentsByPostId(postId) {
  var _ref, rows;

  return regeneratorRuntime.async(function getCommentsByPostId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.query("\n          SELECT * FROM comments\n          WHERE \"postId\" = $1\n        ", [postId]));

        case 3:
          _ref = _context.sent;
          rows = _ref.rows;
          return _context.abrupt("return", rows);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function addMessageToComment(postId, username_comment, message) {
  var _ref2, _ref2$rows, userComment;

  return regeneratorRuntime.async(function addMessageToComment$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(client.query("\n      INSERT INTO comments(\"postId\", username_comment, message)\n      VALUES($1, $2, $3)\n      RETURNING *;\n    ", [postId, username_comment, message]));

        case 3:
          _ref2 = _context2.sent;
          _ref2$rows = _slicedToArray(_ref2.rows, 1);
          userComment = _ref2$rows[0];
          return _context2.abrupt("return", userComment);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function getAllComments() {
  var _ref3, rows;

  return regeneratorRuntime.async(function getAllComments$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(client.query("\n      SELECT * FROM comments\n    "));

        case 2:
          _ref3 = _context3.sent;
          rows = _ref3.rows;
          return _context3.abrupt("return", rows);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function deleteComment(commentId) {
  var _ref4, _ref4$rows, comment;

  return regeneratorRuntime.async(function deleteComment$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(client.query("\n      DELETE FROM comments\n      WHERE id = $1\n      RETURNING *;\n    ", [commentId]));

        case 2:
          _ref4 = _context4.sent;
          _ref4$rows = _slicedToArray(_ref4.rows, 1);
          comment = _ref4$rows[0];
          return _context4.abrupt("return", comment);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = {
  getAllComments: getAllComments,
  addMessageToComment: addMessageToComment,
  getCommentsByPostId: getCommentsByPostId,
  deleteComment: deleteComment
};