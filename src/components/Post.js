import { useEffect, useState } from "react";
import { callApi } from "../api/utils";
import moment from "moment";
import EditPost from "./EditPost";
import xboxLogo from "./game-img/Xbox_logo.png";
import psLogo from "./game-img/Playstation_icon.png";
import pcLogo from "./game-img/Pc_logo3.png";
import SendIcon from '@mui/icons-material/Send';

const Post = ({
  posts,
  setPosts,
  token,
  filteredPosts,
  selectedGame,
  setSelectedGame,
}) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [directMessage, setDirectMessage] = useState("");
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const timeNow = moment();

  const fetchAllComments = async () => {
    try {
      const data = await callApi({
        path: "/comments",
      });
      setAllComments(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllComments();
  }, []);

  const handleCommentSubmit = async (postId) => {
    try {
      await callApi({
        method: "POST",
        path: `/comments/${postId}`,
        body: { username_comment: username, message: comment },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const data = callApi({
        method: "DELETE",
        path: `/posts/${postId}`,
      });

      setPosts((prev) => prev.filter((post) => postId !== post.id));
    } catch (err) {
      console.log(err);
    }
  };

  const sendDirectMessage = async (recipientId, recipientUsername) => {
    try {
      const data = callApi({
        method: "POST",
        path: `/direct_message/${recipientId}`,
        body: {
          message_text: directMessage,
          recipient_username: recipientUsername,
        },
        token,
      });
    } catch (err) {
      console.log(err);
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
    <div>
      {postsAreFiltered()
        .slice(0)
        .reverse()
        .map((post) => {
          return (
            <div key={post.id} className="post">
              {!selectedGame && (
                <p className="post-game-title">{post.gameTitle}</p>
              )}
              <div className="game-title-and-description">
                <div className="game-title-container">
                  <div className="post-user-and-img">
                    <h2 className="game-title">{post.username_of_post}</h2>
                    <p>{chooseSystem(post.system)}</p>
                  </div>

                  <p className="post-time-sent">
                    Posted {timeNow.diff(post.sent_time, "minutes")} mins ago
                  </p>
                </div>
                <p className="game-activity">{post["game_activity"]}</p>
                <div className="description-container">
                  <p className="game-description">
                    Description: {post.description}
                  </p>
                </div>
              </div>
              <div className="comments-container">
                <h4 className="comments-header">Comments</h4>
                {allComments
                  .filter((comment) => comment.postId === post.id)
                  .reverse()
                  .map((comment) => {
                    return (
                      <div key={comment.id} className="ind-comment-container">
                        <div className="comment-username-and-time">
                          <p className="comment-user">
                            {comment.username_comment}
                          </p>
                          <span className="comment-time">
                            {timeNow.diff(comment.sent_time, "minutes")} mins
                            ago
                          </span>
                        </div>
                        <p className="comment-message">{comment.message}</p>
                      </div>
                    );
                  })}
              </div>
              <div className="comment-text-and-btn">
                <form>
                  <textarea
                    type="text"
                    className="comment-textfield"
                    placeholder="Comment..."
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>

                    <div className="comment-submit-btn-container">
                    <button
                      type="submit"
                      onClick={() => handleCommentSubmit(post.id)}
                      className="add-comment-btn"
                    ><SendIcon sx={{ fontSize: 20 }}/></button>
                    </div>
                </form>
              </div>
              <div>
                {showMessageForm && (
                  <form>
                    <input
                      type="text"
                      placeholder="Message"
                      onChange={(e) => setDirectMessage(e.target.value)}
                    />
                    <div className="send-message-btn-container">
                      <input
                        type="submit"
                        value="send"
                        className="send-message-btn"
                        onClick={() => {
                          sendDirectMessage(
                            post.userId,
                            post["username_of_post"]
                          );
                        }}
                      />
                    </div>
                  </form>
                )}
              </div>
              {post.userId != userId && (
                <button
                  className="message-user-btn"
                  onClick={() => setShowMessageForm(!showMessageForm)}
                >
                  Message User
                </button>
              )}
              <div className="delete-post-btn-container">
                {<EditPost postId={post.id} postUserId={post.userId} />}

                {post.userId == userId && (
                  <button
                    className="delete-post-btn"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    DELETE POST
                  </button>
                )}
              </div>
              <hr />
            </div>
          );
        })}
    </div>
  );
};

export default Post;
