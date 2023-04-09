const express = require("express");
const router = express.Router();
const {getAllComments, getCommentsByPostId, addMessageToComment} = require("../db/models/comments")


router.get("/", async (req, res, next) => {
    try {
        const comments = await getAllComments();
        res.send(comments)
    } catch (err) {
      console.log(err);
    }
  })

  router.get("/:postId", async (req, res, next) => {
    try {
      const postId = req.params.postId
      const postComments = await getCommentsByPostId(postId)
      res.send(postComments)
    } catch ({name, message}) {
        next({name, message})
    }
  })

  router.post("/:postId", async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const { username_comment, message } = req.body;
      const userMessage = await addMessageToComment(postId, username_comment, message);
      console.log('userMessage :>> ', userMessage);
      res.send(userMessage)
    } catch ({name, message}) {
      next({name, message})
    }
  })

module.exports = router;