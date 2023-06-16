import { callApi } from "../api/utils";
import { useState, useEffect } from "react";
import Post from "./Post";
import allGames from "./GameInfo";
import Sidebar from "./Sidebar";
import defaultBackground from "./game-img/simple-background.webp"
import { useNavigate } from "react-router-dom";

const Posts = ({ token, selectedGame, setSelectedGame }) => {
  const [gameTitle, setGameTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [gameActivity, setGameActivity] = useState("");
  const [userSystem, setUserSystem] = useState("");
  const [createPostError, setCreatePostError] = useState("");
  const [showMakePost, setShowMakePost] = useState(false);
  const navigate = useNavigate();
  const userId =  localStorage.getItem("userId");
  const username = localStorage.getItem("username");
 console.log('token :>> ', token);
 console.log('gameActivity :>> ', gameActivity);
 console.log('description :>> ', description);
 console.log('userSystem :>> ', userSystem);
 console.log('username :>> ', username);
 console.log('userId :>> ', userId);



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
        path: `/posts/gameTitle/${gameTitle}`,
      });
      setFilteredPosts(data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCloseForm = () => {
    setCreatePostError("");
    setShowMakePost(false);
  }

  useEffect(() => {
    if (gameTitle) fetchFilteredPosts();
  }, [gameTitle]);

  const handleMakePost = async (e) => {
    e.preventDefault();
    try {
      if (gameTitle && gameActivity && description && userSystem) {
        const data = await callApi({
          method: "POST",
          path: `/posts/${userId}`,
          body: {
            username_of_post: username,
            gameTitle: gameTitle,
            game_activity: gameActivity,
            description: description,
            system: userSystem,
          },
        });
        navigate("/posts");
        location.reload();
      } else {
        setCreatePostError("Missing Credentials");
      }
    } catch (err) {
      setCreatePostError(err);
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
                if (game.title === gameTitle) {
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
              <p className="system-header">System</p>

                <input
                  type="radio"
                  id="xbox"
                  name="system"
                  value="Xbox"
                  className="game-activity-radio"
                  onChange={(e) => {
                    setUserSystem(e.target.value);
                  }}
                />
                <label htmlFor="xbox" className="system-label">
                  Xbox
                </label>


                <input
                  type="radio"
                  id="playstation"
                  name="system"
                  value="Playstation"
                  className="game-activity-radio"
                  onChange={(e) => {
                    setUserSystem(e.target.value);
                  }}
                />
                <label htmlFor="playstation" className="system-label">
                  Playstation
                </label>


                <input
                  type="radio"
                  id="pc"
                  name="system"
                  value="PC"
                  className="game-activity-radio"
                  onChange={(e) => {
                    setUserSystem(e.target.value);
                  }}
                />
                <label htmlFor="pc" className="system-label">
                  PC
                </label>
            </div>
          </div>
          <label
            htmlFor="description"
            className="create-post-description-lable"
          >
            Description{" "}
          </label>{" "}
          <textarea
            id="description"
            className="description-text"
            placeholder=""
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p className="create-post-error">{createPostError}</p>
          <div className="post-submit-and-close-btn-container">
            <button
              onClick={() => handleCloseForm()}
              className="close-btn"
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Submit"
              onClick={(e) => handleMakePost(e)}
              className="submit-post-btn"
            />
          </div>
        </form>
      </div>
    );
  };

  return (

    <div
      className="main-page"
    >
          <Sidebar setGameTitle={setGameTitle}/>

          <div className="posts-and-header">
      <div className="create-post-btn-and-header">
        {!gameTitle ? (
          <h1 className="posts-header">HOME</h1>
        ) : (
          <h1 className="posts-header">{gameTitle}</h1>
        )}
        {showMakePost && makePost()}
        {!showMakePost && gameTitle && token && (
          <button
            className="create-post-btn"
            onClick={() => setShowMakePost(!showMakePost)}
            title="Create Post"
          >
            Create Post
          </button>
        )}
      </div>
        
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
          </div>

      
      </div>

  );
};

export default Posts;
