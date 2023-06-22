"use strict";

var _require = require('./client'),
    client = _require.client;

var _require2 = require("./models/user"),
    createUser = _require2.createUser,
    getAllUsers = _require2.getAllUsers;

var _require3 = require("./models/posts"),
    createPost = _require3.createPost,
    getAllPosts = _require3.getAllPosts;

function dropTables() {
  return regeneratorRuntime.async(function dropTables$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("Starting to drop tables...");
          _context.next = 4;
          return regeneratorRuntime.awrap(client.query("\n            DROP TABLE IF EXISTS game_activities;\n            DROP TABLE IF EXISTS comments;\n            DROP TABLE IF EXISTS posts;\n            DROP TABLE IF EXISTS direct_messages;\n            DROP TABLE IF EXISTS users;\n        "));

        case 4:
          console.log("Finished dropping tables!");
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Error dropping tables!");
          throw _context.t0;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function createTables() {
  return regeneratorRuntime.async(function createTables$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log("Starting to build tables...");
          _context2.next = 4;
          return regeneratorRuntime.awrap(client.query("\n            CREATE TABLE users(\n                id SERIAL PRIMARY KEY,\n                username varchar(255) UNIQUE NOT NULL,\n                email varchar(255) UNIQUE NOT NULL,\n                password varchar(255) NOT NULL\n            );\n\n            CREATE TABLE posts(\n                id SERIAL PRIMARY KEY,\n                \"userId\" INT REFERENCES users(id) NOT NULL,\n                username_of_post varchar(255) REFERENCES users(username),\n                \"gameTitle\" varchar(255) NOT NULL,\n                game_activity varchar(255) NOT NULL,\n                description text,\n                system varchar(255) NOT NULL,\n                sent_time TIMESTAMP DEFAULT NOW()\n            );\n\n            CREATE TABLE comments(\n              id SERIAL PRIMARY KEY,\n              \"postId\" INTEGER REFERENCES posts(id) NOT NULL,\n              username_comment varchar(255) REFERENCES users(username),\n              message text NOT NULL,\n              sent_time TIMESTAMP DEFAULT NOW()\n            );\n\n            CREATE TABLE direct_messages(\n              id SERIAL PRIMARY KEY,\n              sender_id INT REFERENCES users(id) NOT NULL,\n              sender_username varchar(255) REFERENCES users(username) NOT NULL,\n              recipient_username varchar(255) REFERENCES users(username) NOT NULL,\n              recipient_id INT REFERENCES users(id) NOT NULL,\n              message_text TEXT NOT NULL,\n              sent_time TIMESTAMP DEFAULT NOW()\n            );\n\n            \n        "));

        case 4:
          console.log("Finished building tables!");
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error("Error building tables!");
          throw _context2.t0;

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // CREATE TABLE game_activities(
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


function populateInitialData() {
  var users, posts, gameActivities, createdUsers, createPosts, allUsers, allPosts;
  return regeneratorRuntime.async(function populateInitialData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          users = [{
            username: "Johndoe",
            email: "johnsemail@email.com",
            password: "mrjohn"
          }, {
            username: "Maxy",
            email: "maxysemail@email.com",
            password: "maxyspassword"
          }, {
            username: "Duke",
            email: "duke@email.com",
            password: "password"
          }, {
            username: "Awesome Person",
            email: "testemail@gmail.com",
            password: "testpassword"
          }];
          posts = [{
            userId: 1,
            username_of_post: "Johndoe",
            gameTitle: "Counter-Strike 2",
            game_activity: "Face it",
            description: "I have mic and im plat 3",
            system: "Playstation"
          }, {
            userId: 2,
            username_of_post: "Maxy",
            gameTitle: "Destiny",
            game_activity: "Raids",
            description: "High level looking to Raid",
            system: "Xbox"
          }, {
            userId: 3,
            username_of_post: "Duke",
            gameTitle: "Call of Duty",
            game_activity: "Warzone",
            description: "50 K/D (not cheating)",
            system: "PC"
          }, {
            userId: 3,
            username_of_post: "Duke",
            gameTitle: "Valorant",
            game_activity: "Spike Rush",
            description: "No mic just want to chill",
            system: "PC"
          }, {
            userId: 2,
            username_of_post: "Maxy",
            gameTitle: "Rainbow Six Siege",
            game_activity: "Unranked",
            description: "Looking to play some causals",
            system: "Xbox"
          }, {
            userId: 1,
            username_of_post: "Johndoe",
            gameTitle: "DayZ",
            game_activity: "Role Play",
            description: "Anyone want to make a RP server?",
            system: "Playstation"
          }, {
            userId: 1,
            username_of_post: "Johndoe",
            gameTitle: "League of Legends",
            game_activity: "Ranked",
            description: "Im better than you (not toxic)",
            system: "Playstation"
          }, {
            userId: 3,
            username_of_post: "Duke",
            gameTitle: "Overwatch 2",
            game_activity: "Ranked",
            description: "Top 500 gamer.. who wants a carry?",
            system: "PC"
          }];
          gameActivities = [{
            game_title: "Call of Duty",
            activity_name: "Warzone"
          }, {
            game_title: "Call of Duty",
            activity_name: "DMZ"
          }, {
            game_title: "Call of Duty",
            activity_name: "Multiplayer"
          }, {
            game_title: "Call of Duty",
            activity_name: "Spec Ops"
          }, {
            game_title: "Call of Duty",
            activity_name: "Co op"
          }, {
            game_title: "Overwatch 2",
            activity_name: "Ranked"
          }, {
            game_title: "Overwatch 2",
            activity_name: "Casual"
          }, {
            game_title: "Overwatch 2",
            activity_name: "Arcade"
          }, {
            game_title: "Overwatch 2",
            activity_name: "Custom Games"
          }, {
            game_title: "DayZ",
            activity_name: "Role Playing"
          }, {
            game_title: "DayZ",
            activity_name: "PvP"
          }, {
            game_title: "DayZ",
            activity_name: "PvE"
          }, {
            game_title: "DayZ",
            activity_name: "Survival"
          }, {
            game_title: "DayZ",
            activity_name: "Vanilla"
          }, {
            game_title: "DayZ",
            activity_name: "Modded"
          }, {
            game_title: "Counter-Strike 2",
            activity_name: "Faceit"
          }, {
            game_title: "Counter-Strike 2",
            activity_name: "Ranked"
          }, {
            game_title: "Counter-Strike 2",
            activity_name: "Community Servers"
          }, {
            game_title: "Counter-Strike 2",
            activity_name: "Danger Zone"
          }, {
            game_title: "Valorant",
            activity_name: "Rated"
          }, {
            game_title: "Valorant",
            activity_name: "Unrated"
          }, {
            game_title: "Valorant",
            activity_name: "Spike Rush"
          }, {
            game_title: "Valorant",
            activity_name: "Swift Play"
          }, {
            game_title: "Destiny",
            activity_name: "Raids"
          }, {
            game_title: "Destiny",
            activity_name: "Crucibal"
          }, {
            game_title: "Rainbow Six Siege",
            activity_name: "Ranked"
          }, {
            game_title: "Rainbow Six Siege",
            activity_name: "Casual"
          }, {
            game_title: "League of Legends",
            activity_name: "Ranked"
          }, {
            game_title: "League of Legends",
            activity_name: "Casual"
          }, {
            game_title: "League of Legends",
            activity_name: "Aram"
          }];
          _context3.next = 6;
          return regeneratorRuntime.awrap(Promise.all(users.map(createUser)));

        case 6:
          createdUsers = _context3.sent;
          _context3.next = 9;
          return regeneratorRuntime.awrap(Promise.all(posts.map(createPost)));

        case 9:
          createPosts = _context3.sent;
          console.log('createdUsers :>> ', createdUsers);
          console.log('createPosts :>> ', createPosts);
          _context3.next = 14;
          return regeneratorRuntime.awrap(getAllUsers());

        case 14:
          allUsers = _context3.sent;
          _context3.next = 17;
          return regeneratorRuntime.awrap(getAllPosts());

        case 17:
          allPosts = _context3.sent;
          console.log('getAllUsers :>> ', allUsers);
          console.log('getAllPosts :>> ', allPosts);
          _context3.next = 25;
          break;

        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 22]]);
}

function buildTables() {
  return regeneratorRuntime.async(function buildTables$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          client.connect();
          _context4.next = 4;
          return regeneratorRuntime.awrap(dropTables());

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(createTables());

        case 6:
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

buildTables().then(populateInitialData)["catch"](console.error)["finally"](function () {
  return client.end();
});