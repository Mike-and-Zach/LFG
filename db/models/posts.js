const { client } = require("../client");

async function getAllPosts() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM posts  
    `);
  return rows;
  } catch (err) {
    console.log(err);
  }
  
}

async function getAllPostsAndUsers() {
  try {
    const { rows } = await client.query(`
      SELECT posts.*, users.* FROM posts
      JOIN users ON users.id = posts.user_id
    `)
    return rows
  } catch (err) {
    console.log(err);
  }
}

async function createPost( {user_id, username_of_post, gameTitle, description} ) {
  try {
    const {
      rows: [post],
    } = await client.query(
      `
          INSERT INTO posts(user_id, username_of_post, "gameTitle", description)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
      `,
      [user_id, username_of_post, gameTitle, description]
    );
  
    return post;
  } catch (err) {
    console.log(err);
  }
  
}

async function deletePost(id) {
  try {
    const {
      rows: [post], // you dont need to make these variabes if you arnt using them
    } = await client.query(`
      DELETE FROM posts
      WHERE id=${id};
      `);
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
  
}

async function getCommentsByPostId(postId) {
  try {
      const { rows } = await client.query(`
        SELECT * FROM comments
        WHERE "postId" = $1
      `, [postId])
      return rows;
  } catch (err) {
    console.log(err);
  }
}

async function addMessageToComment(postId, username_comment, message) {
  try {
    const { rows: [userComment] } = await client.query(`
    INSERT INTO comments("postId", username_comment, message)
    VALUES($1, $2, $3)
    RETURNING *;
  `, [postId, username_comment, message])
    console.log('userComment :>> ', userComment);
  return userComment
  } catch (err) {
    console.log(err);
  }
  
}

async function getAllComments() {
  const { rows } = await client.query(`
    SELECT * FROM comments
  `)
  return rows;
}

module.exports = {
  getAllPosts,
  createPost,
  editPost,
  deletePost,
  getCommentsByPostId,
  addMessageToComment,
  getAllComments, 
  getAllPostsAndUsers
};
