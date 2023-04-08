const express = require("express");
const router = express.Router();
// const {} = require("../db/models/user");

// router.use(async (req, res, next) => {
    
// })

const usersRouter = require("./users");
router.use("/users", usersRouter);
const postsRouter = require("./posts")
router.use("/posts", postsRouter)
const directMessage = require("./inbox")
router.use("/direct_message", directMessage)


module.exports = router