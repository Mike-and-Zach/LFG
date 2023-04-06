const { client } = require("../client");

async function getAllPosts() {
    const { rows } = await client.query(`
        SELECT * FROM posts  
    `)
    return rows;
}

async function createPost({gameTitle, description}) {
    const { rows: [post] } = await client.query(`
        INSERT INTO posts ("gameTitle", description)
        VALUES ($1, $2)
        RETURNING *;
    `, [gameTitle, description])

    return post;
}

module.exports = {
    getAllPosts,
    createPost
}