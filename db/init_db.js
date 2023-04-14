const {
    client,
  } = require('./client');
const { createUser, getAllUsers } = require("./models/user")
const { createPost, getAllPosts } = require("./models/posts")
async function dropTables() {
    try {
        console.log("Starting to drop tables...")
        await client.query(`
            DROP TABLE IF EXISTS game_activities;
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
                "userId" INT REFERENCES users(id) NOT NULL,
                username_of_post varchar(255) REFERENCES users(username),
                "gameTitle" varchar(255) NOT NULL,
                game_activity varchar(255) NOT NULL,
                description text,
                system varchar(255) NOT NULL,
                sent_time TIMESTAMP DEFAULT NOW()
            );

            CREATE TABLE comments(
              id SERIAL PRIMARY KEY,
              "postId" INTEGER REFERENCES posts(id) NOT NULL,
              username_comment varchar(255) REFERENCES users(username),
              message text NOT NULL,
              sent_time TIMESTAMP DEFAULT NOW()
            );

            CREATE TABLE direct_messages(
              id SERIAL PRIMARY KEY,
              sender_id INT REFERENCES users(id) NOT NULL,
              sender_username varchar(255) REFERENCES users(username) NOT NULL,
              recipient_username varchar(255) REFERENCES users(username) NOT NULL,
              recipient_id INT REFERENCES users(id) NOT NULL,
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

// CREATE TABLE game_activities(
//   id SERIAL PRIMARY KEY,
//   game_title varchar(255) REFERENCES posts("gameTitle") NOT NULL,
//   activity_name text NOT NULL
// );

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

async function populateInitialData() {
  try {
    const users = [
      {
        username: "Johndoe",
        email: "johnsemail@email.com",
        password: "mrjohn"
      },
      {
        username: "Maxy",
        email: "maxysemail@email.com",
        password: "maxyspassword"

      },
      {
        username: "Duke",
        email: "duke@email.com",
        password: "password"
      }
    ];

    const posts = [
      {
        userId: 1,
        username_of_post: "Johndoe",
        gameTitle: "Counter-Strike 2",
        game_activity: "Face it",
        description: "I have mic and im plat 3",
        system: "Playstation"
      },
      {
        userId: 2,
        username_of_post: "Maxy",
        gameTitle: "Destiny",
        game_activity: "Raids",
        description: "High level looking to Raid",
        system: "Xbox"
      },
      {
        userId: 3,
        username_of_post: "Duke",
        gameTitle: "Call of Duty",
        game_activity: "Warzone",
        description: "50 K/D (not cheating)",
        system: "PC"
      },
      {
        userId: 3,
        username_of_post: "Duke",
        gameTitle: "Valorant",
        game_activity: "Spike Rush",
        description: "No mic just want to chill",
        system: "PC"
      },
      {
        userId: 2,
        username_of_post: "Maxy",
        gameTitle: "Rainbow Six Siege",
        game_activity: "Unranked",
        description: "Looking to play some causals",
        system: "Xbox"
      },
      {
        userId: 1,
        username_of_post: "Johndoe",
        gameTitle: "DayZ",
        game_activity: "Role Play",
        description: "Anyone want to make a RP server?",
        system: "Playstation"
      },
      {
        userId: 1,
        username_of_post: "Johndoe",
        gameTitle: "League of Legends",
        game_activity: "Ranked",
        description: "Im better than you (not toxic)",
        system: "Playstation"
      },
      {
        userId: 3,
        username_of_post: "Duke",
        gameTitle: "Overwatch 2",
        game_activity: "Ranked",
        description: "Top 500 gamer.. who wants a carry?",
        system: "PC"
      },
    ]

    const gameActivities = [
      {
        game_title: "Call of Duty",
        activity_name: "Warzone"
      },
      {
        game_title: "Call of Duty",
        activity_name: "DMZ"
      },
      {
        game_title: "Call of Duty",
        activity_name: "Multiplayer"
      },
      {
        game_title: "Call of Duty",
        activity_name: "Spec Ops"
      },
      {
        game_title: "Call of Duty",
        activity_name: "Co op"
      },
      {
        game_title: "Overwatch 2",
        activity_name: "Ranked"
      },
      {
        game_title: "Overwatch 2",
        activity_name: "Casual"
      },
      {
        game_title: "Overwatch 2",
        activity_name: "Arcade"
      },
      {
        game_title: "Overwatch 2",
        activity_name: "Custom Games"
      },
      {
        game_title: "DayZ",
        activity_name: "Role Playing"
      },
      {
        game_title: "DayZ",
        activity_name: "PvP"
      },
      {
        game_title: "DayZ",
        activity_name: "PvE"
      },
      {
        game_title: "DayZ",
        activity_name: "Survival"
      },
      {
        game_title: "DayZ",
        activity_name: "Vanilla"
      },
      {
        game_title: "DayZ",
        activity_name: "Modded"
      },
      {
        game_title: "Counter-Strike 2",
        activity_name: "Faceit"
      },
      {
        game_title: "Counter-Strike 2",
        activity_name: "Ranked"
      },
      {
        game_title: "Counter-Strike 2",
        activity_name: "Community Servers"
      },
      {
        game_title: "Counter-Strike 2",
        activity_name: "Danger Zone"
      },
      {
        game_title: "Valorant",
        activity_name: "Rated"
      },
      {
        game_title: "Valorant",
        activity_name: "Unrated"
      },
      {
        game_title: "Valorant",
        activity_name: "Spike Rush"
      },
      {
        game_title: "Valorant",
        activity_name: "Swift Play"
      },
      {
        game_title: "Destiny",
        activity_name: "Raids"
      },
      {
        game_title: "Destiny",
        activity_name: "Crucibal"
      },
      {
        game_title: "Rainbow Six Siege",
        activity_name: "Ranked"
      },
      {
        game_title: "Rainbow Six Siege",
        activity_name: "Casual"
      },
      {
        game_title: "League of Legends",
        activity_name: "Ranked"
      },
      {
        game_title: "League of Legends",
        activity_name: "Casual"
      },
      {
        game_title: "League of Legends",
        activity_name: "Aram"
      },
      
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