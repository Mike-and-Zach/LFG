"use strict";

var _require = require('./client'),
    client = _require.client;

var user = require("./models/user");

var posts = require("./models/posts");

var inbox = require("./models/inbox");

var comments = require("./models/comments");

module.exports = {
  client: client,
  user: user,
  posts: posts,
  inbox: inbox,
  comments: comments
};