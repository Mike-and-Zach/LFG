import { callApi } from "../api/utils";
import { useState, useEffect } from "react";
import Post from "./Post";
import allGames from "./GameInfo";
const Posts = ({ token, selectedGame }) => {
  const [showMakePost, setShowMakePost] = useState(false);
  const [gameTitle, setGameTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [gameActivity, setGameActivity] = useState("");

  const fetchPosts = async () => {
    try {
      const data = await callApi({
        path: "/posts",
      });
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchFilteredPosts = async () => {
    try {
      const data = await callApi({
        path: `/posts/gameTitle/${selectedGame}`,
      });
      setFilteredPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFilteredPosts();
  }, [selectedGame]);

  const handleMakePost = async () => {
    try {
      const userId = window.localStorage.getItem("userId");
      const username = localStorage.getItem("username");
      const data = await callApi({
        method: "POST",
        path: `/posts/${userId}`,
        body: {
          username_of_post: username,
          gameTitle,
          game_activity: gameActivity,
          description: description,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const makePost = () => {
    return (
      <div className="create-post">
        <form>
          <div className="allgames-select">
            <label htmlFor="gameTitle"></label>
            <select
              name="games"
              id="gameTitle"
              className="game-title-select"
              onChange={(e) => {
                setGameTitle(e.target.value);
              }}
            >
              {selectedGame && <option>{selectedGame}</option>}
              {!selectedGame && <option>-- Choose a Game --</option>}
              {selectedGame !== "Call of Duty" && (
                <option value="Call of Duty">Call of Duty</option>
              )}
              {selectedGame !== "Overwatch 2" && (
                <option value="Overwatch 2">Overwatch 2</option>
              )}
              {selectedGame !== "DayZ" && <option value="DayZ">DayZ</option>}
              {selectedGame !== "Counter-Strike 2" && (
                <option value="Counter-Strike 2">Counter-Strike 2</option>
              )}
              {selectedGame !== "Destiny" && (
                <option value="Destiny">Destiny</option>
              )}
              {selectedGame !== "Valorant" && (
                <option value="Valorant">Valorant</option>
              )}
              {selectedGame !== "Rainbow Six Siege" && (
                <option value="Rainbow Six Siege">Rainbow Six Siege</option>
              )}
              {selectedGame !== "GTA6" && <option value="GTA6">GTA6</option>}
              {selectedGame !== "League of Lengends" && (
                <option value="League of Legends">League of Legends</option>
              )}
            </select>
            <br />
            <select
              name="activities"
              id="activities"
              className="game-title-select"
              onChange={(e) => {
                setGameActivity(e.target.value);
              }}
            >
              {allGames.map((game, i) => {
                if (game.title === selectedGame) {
                  return game.activities.map((activity, index) => {
                    return <option key={index} value={activity}>{activity}</option>;
                  });
                }
              })}
            </select>
          </div>
          <label
            htmlFor="description"
            className="create-post-description-lable"
          >
            Description:{" "}
          </label>{" "}
          <br />
          <textarea
            id="description"
            className="description-text"
            onChange={(e) => setDescription(e.target.value)}
          >
            {" "}
          </textarea>{" "}
          <br /> <br />
          <button onClick={() => setShowMakePost(false)} className="close-btn">
            Close
          </button>
          <input
            type="submit"
            value="Submit"
            onClick={() => handleMakePost()}
            className="submit-post-btn"
          />
        </form>
      </div>
    );
  };

  return (
    <div className="posts">
      <div className="create-post-btn-and-header">
        {selectedGame ? (
          <p className="posts-header">{selectedGame}</p>
        ) : (
          <p className="posts-header">Home</p>
        )}{" "}
        <br />
        {showMakePost && makePost()}
        {!showMakePost && (
          <button
            className="create-post-btn"
            onClick={() => setShowMakePost(!showMakePost)}
          >
            Create Post
          </button>
        )}
      </div>
      <hr />
      <div>
        {
          <Post
            posts={posts}
            setPosts={setPosts}
            token={token}
            filteredPosts={filteredPosts}
            gameActivity={gameActivity}
          />
        }
      </div>
    </div>
  );
};

export default Posts;
