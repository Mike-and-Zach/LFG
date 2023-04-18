const {client} = require('../client.js');
const bcrypt = require("bcrypt");
async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM users
    `)
    console.log(rows);
    return rows
  } catch (err) {
    throw err
  }
    
  };

  async function createUser({username, email, password}) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const { rows: [user] } = await client.query(`
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
  `, [username, email, hashedPassword])
  delete user.password;
  return user;
    } catch (err) {
      throw err
    }
   
  }

  async function getUserByEmail( email ) {
    const { rows: [user] } = await client.query(`
      SELECT * FROM users
      WHERE email = $1
    `, [email])
    return user;
}

  async function getUserById(id) {
    const { rows: [user] } = await client.query(`
      SELECT * FROM users
      WHERE id = $1
    `, [id])
    return user
  }

  async function validateAndGetUser(email, password) {
    const user = await getUserByEmail(email);
    console.log('validateddduser :>> ', user);
    if(!user) {
      throw new Error("Incorrect email or password")
    }
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (isValid) {
      delete user.password;
      return user;
    }
  }

  async function getUserByUsername(username) {
    const { rows: [user] } = await client.query(`
      SELECT * FROM users
      WHERE username = $1
    `, [username]);
    return user;
  }



  module.exports = {
    getAllUsers,
    createUser,
    getUserByEmail,
    validateAndGetUser,
    getUserById,
    getUserByUsername
  }