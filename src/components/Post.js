
import { callApi } from "../api/utils";
import { handleTime } from "../helpers/handleTime";
import EditPost from "./EditPost";
import xboxLogo from "./game-img/Xbox_logo.png";
import psLogo from "./game-img/Playstation_icon.png";
import pcLogo from "./game-img/Pc_logo3.png";
import DeleteIcon from "@mui/icons-material/Delete";
import Comments from "./Comments";
import moment from "moment";
import MessageForm from "./MessageForm";

const Post = ({
  posts,
  setPosts,
  token,
  filteredPosts,
  setFilteredPosts,
  gameTitle,
  allComments,
  setAllComments
}) => {

  const userId = localStorage.getItem("userId");

  const handleDeletePost = async (postId) => {
    try {
      const data = callApi({
        method: "DELETE",
        path: `/posts/${postId}`,
      });

      setPosts((prev) => prev.filter((post) => postId !== post.id));
      setFilteredPosts((prev) => prev.filter((post) => postId !== post.id));
    } catch (err) {
      console.error(err);
    }
  };

  const postsAreFiltered = () => {
    if (filteredPosts.toString()) {
      return filteredPosts;
    } else {
      return posts;
    }
  };

  const chooseSystem = (system) => {
    if (system == "Playstation") {
      return <img src={psLogo} className="system-logo" />;
    } else if (system == "Xbox") {
      return <img src={xboxLogo} className="system-logo" />;
    } else {
      return <img src={pcLogo} className="system-logo" />;
    }
  };

  return (
    <>
      {postsAreFiltered()
        .slice(0)
        .reverse()
        .map((post) => {
          return (
            <div key={post.id} className="post">
              <div className="post-gametitle-and-activity">
                {!gameTitle && (
                  <p className="post-game-title">{post.gameTitle}</p>
                )}
                <p className="game-activity">{post["game_activity"]}</p>
              </div>
              <div className="post-inner">
                <div className="game-title-and-description">

                    <div className="post-user-and-img">
                      <h2 className="game-title">{post.username_of_post}</h2>
                      <p>{chooseSystem(post.system)}</p>
                    </div>
                    <MessageForm
                        postUserId={post.userId}
                        postUsername={post.username_of_post}
                        token={token}
                      />
                   
                    <p className="post-time-sent">
                      {handleTime(post.sent_time)}
                    </p>

                  <div className="description-container">
                    <p className="game-description">{post.description}</p>
                  </div>
                </div>
                <Comments postId={post.id} allComments={allComments} setAllComments={setAllComments} token={token}/>

                <EditPost postId={post.id} postUserId={post.userId} />
                <div className="delete-post-btn-container">
                  {post.userId == userId && (
                    <button
                      className="delete-post-btn"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <DeleteIcon />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Post;
