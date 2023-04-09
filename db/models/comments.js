const { client } = require("../client")


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
    getAllComments,
    addMessageToComment,
    getCommentsByPostId
  }