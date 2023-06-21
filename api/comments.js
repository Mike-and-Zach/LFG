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
      if (req.user) {
      const postId = req.params.postId;
      const { username_comment, message } = req.body;
      const userMessage = await addMessageToComment(postId, username_comment, message);
      res.send(userMessage)
      } else {
        next({
          name: "Comment Error",
          message: "Please login to leave a comment"
        })
      }
    } catch ({name, message}) {
      next({
        name: "Error Commenting", 
        message: "Please login to comment"
      })
    }
  })

  

module.exports = router;