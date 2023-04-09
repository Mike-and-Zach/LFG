const {client} = require('./client')
const user = require("./models/user")
const posts = require("./models/posts")
const inbox = require("./models/inbox")
const comments = require("./models/comments")

module.exports = {
    client,
    user,
    posts,
    inbox,
    comments
};