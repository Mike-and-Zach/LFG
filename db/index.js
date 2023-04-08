const {client} = require('./client')
const user = require("./models/user")
const posts = require("./models/posts")
const inbox = require("./models/inbox")

module.exports = {
    client,
    user,
    posts,
    inbox
};