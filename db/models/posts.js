const { client } = require("../client");

async function getAllPosts() {
    const { rows } = await client.query(`
        SELECT * FROM posts  
    `)
    return rows;
}

module.exports = {

}