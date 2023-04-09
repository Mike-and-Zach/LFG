const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  createPost,
  editPost,
  deletePost,
  getCommentsByPostId,
  addMessageToComment,
  getAllComments,
  getAllPostsAndUsers
} = require("../db/models/posts");

router.get("/", async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    console.log('posts :>> ', posts);
    res.send(posts);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId", async (req, res, next) => {
  try {
    const { username_of_post, gameTitle, description } = req.body;
    const userId = req.params.userId
    const createdPost = await createPost( {user_id: userId, username_of_post, gameTitle, description });
    res.send(createdPost);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.delete("/:postId", async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const deletedPost = await deletePost(postId);
      res.send(deletedPost);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
  
  router.patch("/:postId", async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const updatedPost = await editPost({ id: postId, ...req.body });
      res.send(updatedPost);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  router.get("/comments", async (req, res, next) => {
    try {
        const comments = await getAllComments();
        res.send(comments)
    } catch (err) {
      console.log(err);
    }
  })

  router.get("/comments/:postId", async (req, res, next) => {
    try {
      const postId = req.params.postId
      const postComments = await getCommentsByPostId(postId)
      res.send(postComments)
    } catch ({name, message}) {
        next({name, message})
    }
  })

  router.post("/comments/:postId", async (req, res, next) => {
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