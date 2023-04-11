const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  createPost,
  editPost,
  deletePost,
  getPostById
} = require("../db/models/posts");
const { getAllComments, deleteComment } = require("../db/models/comments");

router.get("/", async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    console.log('posts :>> ', posts);
    res.send(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/:postId", async (req, res, next) => {
  try {
      const postId = req.params.postId
      const post = await getPostById(postId);
      res.send(post)
  } catch ({name, message}) {
    next({name, message})
  }
});


router.post("/:userId", async (req, res, next) => {
  try {
    const { username_of_post, gameTitle, description } = req.body;
    const userId = req.params.userId
    const createdPost = await createPost( {userId: userId, username_of_post, gameTitle, description });
    res.send(createdPost);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.delete("/:postId", async (req, res, next) => {
    try {
      const postId = req.params.postId;
      // const deletedPost = await deletePost(postId);
      const allComments = await getAllComments();
      
      const postComments = allComments.filter(comment => comment.postId == postId);
      Promise.all(postComments.map(async comment => {
        return await deleteComment(comment.id)
      }))
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