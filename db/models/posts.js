const { client } = require("../client");

async function getAllPosts() {
  const { rows } = await client.query(`
        SELECT * FROM posts  
    `);
  return rows;
}

async function createPost({ gameTitle, description }) {
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
}

async function deletePost(id) {
  const {
    rows: [post], // you dont need to make these variabes if you arnt using them
  } = await client.query(`
    DELETE FROM posts
    WHERE id=${id};
    `);
}

async function editPost({ id, ...fields }) {
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
}

module.exports = {
  getAllPosts,
  createPost,
  editPost,
  deletePost
};
