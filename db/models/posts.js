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

async function createPost({ gameTitle, description }) {
  try {
    const {
      rows: [post],
    } = await client.query(
      `
          INSERT INTO posts ("gameTitle", description)
          VALUES ($1, $2)
          RETURNING *;
      `,
      [gameTitle, description]
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

async function addMessageToComment(postId, message) {
  try {
    const { rows: [userComment] } = await client.query(`
    INSERT INTO comments("postId", message)
    VALUES($1, $2)
    RETURNING *;
  `, [postId, message])
    console.log('userComment :>> ', userComment);
  return userComment
  } catch (err) {
    console.log(err);
  }
  
}

// async function getCommentsByPostId(postId) {
//   try {
//     const { rows } = await client.query(`
//     SELECT posts.*, comments.* FROM posts
//     JOIN comments 
//     ON posts.id = comments."postId"
//     WHERE comments."postId" = $1
//     RETURNING *;
//   `, [postId])
//     console.log(rows);
//   return rows;
//   } catch (err) {
//     console.log(err);
//   }
  
// }



module.exports = {
  getAllPosts,
  createPost,
  editPost,
  deletePost,
  getCommentsByPostId,
  addMessageToComment
};
