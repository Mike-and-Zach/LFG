"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../db/models/comments"),
    getAllComments = _require.getAllComments,
    getCommentsByPostId = _require.getCommentsByPostId,
    addMessageToComment = _require.addMessageToComment;

router.get("/", function _callee(req, res, next) {
  var comments;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(getAllComments());

        case 3:
          comments = _context.sent;
          res.send(comments);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get("/:postId", function _callee2(req, res, next) {
  var postId, postComments, name, message;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          postId = req.params.postId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(getCommentsByPostId(postId));

        case 4:
          postComments = _context2.sent;
          res.send(postComments);
          _context2.next = 13;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          name = _context2.t0.name;
          message = _context2.t0.message;
          next({
            name: name,
            message: message
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post("/:postId", function _callee3(req, res, next) {
  var postId, _req$body, username_comment, message, userMessage, name, _message;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;

          if (!req.user) {
            _context3.next = 10;
            break;
          }

          postId = req.params.postId;
          _req$body = req.body, username_comment = _req$body.username_comment, message = _req$body.message;
          _context3.next = 6;
          return regeneratorRuntime.awrap(addMessageToComment(postId, username_comment, message));

        case 6:
          userMessage = _context3.sent;
          res.send(userMessage);
          _context3.next = 11;
          break;

        case 10:
          next({
            name: "Comment Error",
            message: "Please login to leave a comment"
          });

        case 11:
          _context3.next = 18;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          name = _context3.t0.name;
          _message = _context3.t0.message;
          next({
            name: "Error Commenting",
            message: "Please login to comment"
          });

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
module.exports = router;