import { callApi } from "../api/utils";
import { useState, useEffect } from "react";
import Post from "./Post";
import allGames from "./GameInfo";
import defaultBackground from "./game-img/default_background.png";
import { useNavigate } from "react-router-dom";

const Posts = ({ token, selectedGame, setSelectedGame }) => {
  const [showMakePost, setShowMakePost] = useState(false);
  const [gameTitle, setGameTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [gameActivity, setGameActivity] = useState("");
  const [userSystem, setUserSystem] = useState("");
  const [createPostError, setCreatePostError] = useState("");
  const navigate = useNavigate();
  console.log('createPostError :>> ', createPostError);
  console.log('gameActivity :>> ', gameActivity);
  console.log('description :>> ', description);
  console.log('userSystem :>> ', userSystem);
  console.log('gameTitle :>> ', selectedGame);

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

  const handleMakePost = async (e) => {
    e.preventDefault();
    try {
      const userId = window.localStorage.getItem("userId");
      const username = localStorage.getItem("username");
      if (selectedGame && gameActivity && description && userSystem) {
        const data = await callApi({
          method: "POST",
          path: `/posts/${userId}`,
          body: {
            username_of_post: username,
            gameTitle: selectedGame ? selectedGame : gameTitle,
            game_activity: gameActivity,
            description: description,
            system: userSystem,
          },
        });
        navigate("/posts");
        window.location.reload()
      } else {
        setCreatePostError("Missing Credentials")
      }
      
    } catch (err) {
      setCreatePostError(err)
      console.log(err);
    }
  };

  const getUrl = (gameTitle) => {
    let url = defaultBackground;
    allGames.map((game) => {
      if (game.title == gameTitle) {
        url = game.url;
      }
    });
    return url;
  };

  const makePost = () => {
    return (
      <div className="create-post">
        <form>
          <div className="allgames-select">
            <label htmlFor="gameTitle"></label>
            <select
              name="activities"
              id="activities"
              className="game-title-select"
              onChange={(e) => {
                setGameActivity(e.target.value);
              }}
            >
              <option>-- Select One --</option>
              {allGames.map((game) => {
                if (game.title === selectedGame) {
                  return game.activities.map((activity, index) => {
                    return (
                      <option key={index} value={activity}>
                        {activity}
                      </option>
                    );
                  });
                }
              })}
            </select>
            <div className="system-selection">
              <p className="system-header">System: </p>
              <div className="ind-system-selection">
                <input
                  type="radio"
                  id="xbox"
                  name="system"
                  value="Xbox"
                  onChange={(e) => {
                    setUserSystem(e.target.value);
                  }}
                />
                <label htmlFor="xbox" className="system-label">
                  Xbox
                </label>
              </div>
              <div className="ind-system-selection">
                <input
                  type="radio"
                  id="playstation"
                  name="system"
                  value="Playstation"
                  onChange={(e) => {
                    setUserSystem(e.target.value);
                  }}
                />
                <label htmlFor="xbox" className="system-label">
                  Playstation
                </label>
              </div>
              <div className="ind-system-selection">
                <input
                  type="radio"
                  id="pc"
                  name="system"
                  value="PC"
                  onChange={(e) => {
                    setUserSystem(e.target.value);
                  }}
                />
                <label htmlFor="xbox" className="system-label">
                  PC
                </label>
              </div>
            </div>
          </div>
          <label
            htmlFor="description"
            className="create-post-description-lable"
          >
            Description:{" "}
          </label>{" "}
          <textarea
            id="description"
            className="description-text"
            placeholder="Description..."
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>{createPostError}</p>
          <button onClick={() => setShowMakePost(false)} className="close-btn">
            Close
          </button>
          <input
            type="submit"
            value="Submit"
            onClick={(e) => handleMakePost(e)}
            className="submit-post-btn"
          />
        </form>
      </div>
    );
  };

  return (
    <div
      className="posts"
      style={{ backgroundImage: `url(${getUrl(selectedGame)})` }}
    >
      <div className="create-post-btn-and-header">
        {!selectedGame ? (
          <h1 className="posts-header">HOME</h1>
        ) : (
          <h1 className="posts-header">{selectedGame}</h1>
        )}
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
          setFilteredPosts={setFilteredPosts}
          selectedGame={selectedGame}
          gameActivity={gameActivity}
          userSystem={userSystem}
          setSelectedGame={setSelectedGame}
        />
      }
    </div>
  );
};

export default Posts;
