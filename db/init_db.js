const {
    client,
  } = require('./client');
const { createUser, getAllUsers } = require("./models/user")
const { createPost, getAllPosts } = require("./models/posts")
async function dropTables() {
    try {
        console.log("Starting to drop tables...")
        await client.query(`
            DROP TABLE IF EXISTS comments;
            DROP TABLE IF EXISTS posts;
            DROP TABLE IF EXISTS direct_messages;
            DROP TABLE IF EXISTS users;
        `)
        console.log("Finished dropping tables!")
    } catch (err) {
        console.error("Error dropping tables!")
        throw err
    }
}

async function createTables() {
    try {
        console.log("Starting to build tables...")
        await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username varchar(255) UNIQUE NOT NULL,
                email varchar(255) UNIQUE NOT NULL,
                password varchar(255) NOT NULL
            );

            CREATE TABLE posts(
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id),
                username_of_post varchar(255) REFERENCES users(username),
                "gameTitle" varchar(255) NOT NULL,
                description text
            );

            CREATE TABLE comments(
              id SERIAL PRIMARY KEY,
              "postId" INTEGER REFERENCES posts(id),
              username_comment varchar(255) REFERENCES users(username),
              message text NOT NULL
            );

            CREATE TABLE direct_messages(
              id SERIAL PRIMARY KEY,
              sender_id INT NOT NULL,
              recipient_id INT NOT NULL,
              message_text TEXT NOT NULL,
              sent_time TIMESTAMP DEFAULT NOW()
            );

        `)
        console.log("Finished building tables!")
    } catch (err) {
        console.error("Error building tables!");
        throw err;
    }
}

// inside db/seed.js

// grab our client with destructuring from the export in index.js

// async function testDB() {
//   try {
//     // connect the client to the database, finally
//     console.log("Starting to test datatbase...");

//     // queries are promises, so we can await them
//     const users = await getAllUsers()

//     // for now, logging is a fine way to see what's up
//     console.log("getAllUsers", users);

//     console.log("Finished testing database!")
//   } catch (error) {
//     console.error("Error testing database!");
//     throw error
//   } 
// }

// async function createUser({username, email, password}) {
//   // const hashedPassword = await bcrypt.hash(password, 10);

//   const { rows: [user] } = await client.query(`
//       INSERT INTO users (username, email, password)
//       VALUES ($1, $2, $3)
//       RETURNING *;
//   `, [username, email, password])
//   delete user.password;
//   return user;
// }

async function populateInitialData() {
  try {
    const users = [
      {
        username: "johndoe",
        email: "johnsemail@email.com",
        password: "mrjohn"
      },
      {
        username: "maxy",
        email: "maxysemail@email.com",
        password: "maxyspassword"

      }
    ];

    const posts = [
      {
        user_id: 1,
        username_of_post: "johndoe",
        gameTitle: "Counter-Strike",
        description: "Ranked?"
      },
      {
        user_id: 2,
        username_of_post: "maxy",
        gameTitle: "Destiny",
        description: "Looking to Raid",
      }
    ]

    const createdUsers = await Promise.all(users.map(createUser))

    const createPosts = await Promise.all(posts.map(createPost))
    console.log('createdUsers :>> ', createdUsers);
    console.log('createPosts :>> ', createPosts);
    const allUsers = await getAllUsers()
    const allPosts = await getAllPosts()
    console.log('getAllUsers :>> ', allUsers);
    console.log('getAllPosts :>> ', allPosts);
  } catch (err) {
    console.log(err)
  }
}

async function buildTables() {
    try {
      client.connect();
      
      await dropTables();
      await createTables();
    } catch (error) {
      throw error;
    } 
  }

buildTables()
.then(populateInitialData)
.catch(console.error)
.finally(() => client.end())