"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require("../client"),
    client = _require.client;

function getAllPosts() {
  var _ref, rows;

  return regeneratorRuntime.async(function getAllPosts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.query("\n        SELECT * FROM posts  \n    "));

        case 3:
          _ref = _context.sent;
          rows = _ref.rows;
          return _context.abrupt("return", rows);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function getPostById(postId) {
  var _ref2, _ref2$rows, post;

  return regeneratorRuntime.async(function getPostById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(client.query("\n      SELECT * FROM posts\n      WHERE id = $1\n    ", [postId]));

        case 3:
          _ref2 = _context2.sent;
          _ref2$rows = _slicedToArray(_ref2.rows, 1);
          post = _ref2$rows[0];
          return _context2.abrupt("return", post);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function getAllPostsAndUsers() {
  var _ref3, rows;

  return regeneratorRuntime.async(function getAllPostsAndUsers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(client.query("\n      SELECT posts.*, users.* FROM posts\n      JOIN users ON users.id = posts.\"userId\"\n    "));

        case 3:
          _ref3 = _context3.sent;
          rows = _ref3.rows;
          return _context3.abrupt("return", rows);

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function createPost(_ref4) {
  var userId, username_of_post, gameTitle, game_activity, description, system, _ref5, _ref5$rows, post;

  return regeneratorRuntime.async(function createPost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userId = _ref4.userId, username_of_post = _ref4.username_of_post, gameTitle = _ref4.gameTitle, game_activity = _ref4.game_activity, description = _ref4.description, system = _ref4.system;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(client.query("\n          INSERT INTO posts(\"userId\", username_of_post, \"gameTitle\", game_activity, description, system)\n          VALUES ($1, $2, $3, $4, $5, $6)\n          RETURNING *;\n      ", [userId, username_of_post, gameTitle, game_activity, description, system]));

        case 4:
          _ref5 = _context4.sent;
          _ref5$rows = _slicedToArray(_ref5.rows, 1);
          post = _ref5$rows[0];
          return _context4.abrupt("return", post);

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
}

function deletePost(id) {
  var _ref6, post;

  return regeneratorRuntime.async(function deletePost$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(client.query("\n      DELETE FROM posts\n      WHERE id= $1\n      RETURNING *;\n      ", [id]));

        case 3:
          _ref6 = _context5.sent;
          post = _ref6.rows;
          return _context5.abrupt("return", post);

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function editPost(_ref7) {
  var id, fields, setString, _ref8, _ref8$rows, post;

  return regeneratorRuntime.async(function editPost$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = _ref7.id, fields = _objectWithoutProperties(_ref7, ["id"]);
          _context6.prev = 1;
          setString = Object.keys(fields).map(function (key, index) {
            return "\"".concat(key, "\"=$").concat(index + 1);
          }).join(", ");

          if (!(setString === 0)) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return");

        case 5:
          _context6.next = 7;
          return regeneratorRuntime.awrap(client.query("\n  UPDATE posts\n  SET ".concat(setString, "\n  WHERE id=").concat(id, "\n  RETURNING *;\n  "), Object.values(fields)));

        case 7:
          _ref8 = _context6.sent;
          _ref8$rows = _slicedToArray(_ref8.rows, 1);
          post = _ref8$rows[0];
          return _context6.abrupt("return", post);

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](1);
          console.log(_context6.t0);

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 13]]);
}

function getPostsByGameTitle(title) {
  var _ref9, rows;

  return regeneratorRuntime.async(function getPostsByGameTitle$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(client.query("\n        SELECT * FROM posts\n        WHERE \"gameTitle\" = $1\n      ", [title]));

        case 3:
          _ref9 = _context7.sent;
          rows = _ref9.rows;
          console.log('rows :>> ', rows);
          return _context7.abrupt("return", rows);

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

module.exports = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  editPost: editPost,
  deletePost: deletePost,
  getAllPostsAndUsers: getAllPostsAndUsers,
  getPostById: getPostById,
  getPostsByGameTitle: getPostsByGameTitle
};