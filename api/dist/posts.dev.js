"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var router = express.Router();

var _require = require("../db/models/posts"),
    getAllPosts = _require.getAllPosts,
    createPost = _require.createPost,
    editPost = _require.editPost,
    deletePost = _require.deletePost,
    getPostById = _require.getPostById,
    getPostsByGameTitle = _require.getPostsByGameTitle;

var _require2 = require("../db/models/comments"),
    getAllComments = _require2.getAllComments,
    deleteComment = _require2.deleteComment;

router.get("/", function _callee(req, res, next) {
  var posts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(getAllPosts());

        case 3:
          posts = _context.sent;
          res.send(posts);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get("/:postId", function _callee2(req, res, next) {
  var postId, post, name, message;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          postId = req.params.postId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(getPostById(postId));

        case 4:
          post = _context2.sent;
          res.send(post);
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
router.post("/:userId", function _callee3(req, res, next) {
  var _req$body, username_of_post, gameTitle, game_activity, description, system, userId, createdPost, name, message;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, username_of_post = _req$body.username_of_post, gameTitle = _req$body.gameTitle, game_activity = _req$body.game_activity, description = _req$body.description, system = _req$body.system;

          if (!gameTitle || !game_activity || !description || !system) {
            next({
              name: "Error making post",
              message: "Please finish making your post"
            });
          }

          userId = req.params.userId;
          _context3.next = 6;
          return regeneratorRuntime.awrap(createPost({
            userId: userId,
            username_of_post: username_of_post,
            gameTitle: gameTitle,
            game_activity: game_activity,
            description: description,
            system: system
          }));

        case 6:
          createdPost = _context3.sent;
          res.send(createdPost);
          _context3.next = 15;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          name = _context3.t0.name;
          message = _context3.t0.message;
          next({
            name: name,
            message: message
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router["delete"]("/:postId", function _callee5(req, res, next) {
  var postId, allComments, postComments, deletedPost, name, message;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          postId = req.params.postId;
          _context5.next = 4;
          return regeneratorRuntime.awrap(getAllComments());

        case 4:
          allComments = _context5.sent;
          postComments = allComments.filter(function (comment) {
            return comment.postId == postId;
          });
          Promise.all(postComments.map(function _callee4(comment) {
            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(deleteComment(comment.id));

                  case 2:
                    return _context4.abrupt("return", _context4.sent);

                  case 3:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          }));
          _context5.next = 9;
          return regeneratorRuntime.awrap(deletePost(postId));

        case 9:
          deletedPost = _context5.sent;
          res.send(deletedPost);
          _context5.next = 18;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](0);
          name = _context5.t0.name;
          message = _context5.t0.message;
          next({
            name: name,
            message: message
          });

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.patch("/:postId", function _callee6(req, res, next) {
  var postId, updatedPost, name, message;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          postId = req.params.postId;
          _context6.next = 4;
          return regeneratorRuntime.awrap(editPost(_objectSpread({
            id: postId
          }, req.body)));

        case 4:
          updatedPost = _context6.sent;
          res.send(updatedPost);
          _context6.next = 13;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          name = _context6.t0.name;
          message = _context6.t0.message;
          next({
            name: name,
            message: message
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.get("/gameTitle/:gameTitle", function _callee7(req, res, next) {
  var title, posts, name, message;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          title = req.params.gameTitle;
          _context7.next = 4;
          return regeneratorRuntime.awrap(getPostsByGameTitle(title));

        case 4:
          posts = _context7.sent;
          console.log('posts :>> ', posts);
          res.send(posts);
          _context7.next = 14;
          break;

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          name = _context7.t0.name;
          message = _context7.t0.message;
          next({
            name: name,
            message: message
          });

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;