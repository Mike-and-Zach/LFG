const express = require("express");
const router = express.Router();


const { getAllPosts, createPost, editPost, deletePost} = require("../db/models/posts");

router.get("/", async (req, res, next) => {
    try {
        const posts = await getAllPosts();
        res.send(posts)
    } catch (err) {
        next(err)
    }

})

router.post("/", async (req, res, next) => {
    try {
        const { gameTitle,description } = req.body;
        const createdPost = await createPost({gameTitle, description});
        res.send(createdPost)
    } catch ({name, message}) {
        next({name, message})
    }
})


module.exports = router