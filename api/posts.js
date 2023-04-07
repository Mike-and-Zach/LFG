const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  createPost,
} = require("../db/models/posts");

router.get("/", async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.send(posts);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { gameTitle, description } = req.body;
    const createdPost = await createPost({ gameTitle, description });
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

module.exports = router;