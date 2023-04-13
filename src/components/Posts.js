import { callApi } from "../api/utils";
import { useState, useEffect } from "react";
import Post from "./Post";
import allGames from "./GameInfo";

const Posts = ({ token, setSelectedGame, selectedGame }) => {
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
          gameTitle: selectedGame ? selectedGame : gameTitle,
          game_activity: gameActivity,
          description: description,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getUrl = (gameTitle) => {
      let url = "";
      allGames.map(game => {
        if (game.title === gameTitle) {
          url = game.url
        }
      })
      return url
  }

  const makePost = () => {
    return (
      <div className="create-post">
        <form>
          <div className="allgames-select">
            <label htmlFor="gameTitle"></label>
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
      <div className="create-post-btn-and-header" style={{backgroundImage: `url(${getUrl(selectedGame)})`}}>
        {(selectedGame) ? (
          <p className="posts-header">{selectedGame}</p>
        ) : (
          <p className="posts-header">Home</p>
        )}{" "}
        <br />
        {showMakePost && makePost()}
        {!showMakePost && selectedGame && (
          <button
            className="create-post-btn"
            onClick={() => setShowMakePost(!showMakePost)}
          >
            Create Post
          </button>
        )}
      </div>
      <hr />

        {
          <Post
            posts={posts}
            setPosts={setPosts}
            token={token}
            filteredPosts={filteredPosts}
            selectedGame={selectedGame}
            gameActivity={gameActivity}
          />
        }

    </div>
  );
};

export default Posts;
