const { client } = require("../client");

async function getAllPosts() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM posts  
    `);
  return rows;
  } catch (err) {
    console.error(err);
  }
  
}

async function getPostById(postId) {
  try {
    const { rows: [post] } = await client.query(`
      SELECT * FROM posts
      WHERE id = $1
    `, [postId])
    return post;
  } catch (err) {
    console.error(err);
  }
}

async function getAllPostsAndUsers() {
  try {
    const { rows } = await client.query(`
      SELECT posts.*, users.* FROM posts
      JOIN users ON users.id = posts."userId"
    `)
    return rows
  } catch (err) {
    console.error(err);
  }
}

async function createPost( {userId, username_of_post, gameTitle, game_activity, description, system} ) {
  try {
    const {
      rows: [post],
    } = await client.query(
      `
          INSERT INTO posts("userId", username_of_post, "gameTitle", game_activity, description, system)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *;
      `,
      [userId, username_of_post, gameTitle, game_activity, description, system]
    );
  
    return post;
  } catch (err) {
    console.error(err);
  }
}



async function deletePost(id) {
  try {
    const {
      rows: post, // you dont need to make these variabes if you arnt using them
    } = await client.query(`
      DELETE FROM posts
      WHERE id= $1
      RETURNING *;
      `, [id]);
      return post
  } catch (err) {
    console.error(err);
  }
  
}

async function editPost({ id, ...fields }) {
  try {
    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString === 0) {
    return;
  }

  const {
    rows: [post],
  } = await client.query(
    `
  UPDATE posts
  SET ${setString}
  WHERE id=${id}
  RETURNING *;
  `,
    Object.values(fields)
  );

  return post;
  } catch (err) {
    console.error(err);
  }
  
}

async function getPostsByGameTitle(title) {
  try {
      const { rows } = await client.query(`
        SELECT * FROM posts
        WHERE "gameTitle" = $1
      `,[title]);
      return rows;
  } catch (err) {
      console.error(err);
  }
}



module.exports = {
  getAllPosts,
  createPost,
  editPost,
  deletePost, 
  getAllPostsAndUsers,
  getPostById,
  getPostsByGameTitle
};
